from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import logging
import ipaddress
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "AC of South Florida")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")
ADMIN_KEY = os.environ.get("ADMIN_KEY")
BUSINESS_PHONE = "954-554-3040"

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client_http:
        resp = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=30)
    email: EmailStr
    service_type: str = Field(min_length=2, max_length=80)
    date: str = Field(min_length=4, max_length=20)
    time_slot: str = Field(min_length=2, max_length=60)
    city: str = Field(min_length=2, max_length=60)
    address: Optional[str] = ""
    notes: Optional[str] = ""
    emergency: bool = False


def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:8px 16px 8px 0;color:#64748B;font-size:13px;'
            f'text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;vertical-align:top">{label}</td>'
            f'<td style="padding:8px 0;color:#0F172A;font-size:14px;font-weight:600">{value}</td></tr>')


def _booking_rows(b: dict) -> str:
    rows = _row("Reference", escape(b["reference"]))
    rows += _row("Name", escape(b["name"]))
    rows += _row("Phone", f'<a href="tel:+1{re.sub(chr(92) + "D", "", b["phone"])}" style="color:#0369A1">{escape(b["phone"])}</a>')
    rows += _row("Email", escape(b["email"]))
    rows += _row("Service", escape(b["service_type"]))
    rows += _row("Date", escape(b["date"]))
    rows += _row("Time", escape(b["time_slot"]))
    rows += _row("City", escape(b["city"]))
    if b.get("address"):
        rows += _row("Address", escape(b["address"]))
    if b.get("notes"):
        rows += _row("Notes", escape(b["notes"]))
    rows += _row("Priority", "EMERGENCY — AC NOT COOLING" if b.get("emergency") else "Standard")
    return rows


@api_router.get("/")
async def root():
    return {"message": "AC of South Florida API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/bookings")
async def create_booking(input: BookingCreate):
    reference = f"ACSF-{uuid.uuid4().hex[:6].upper()}"
    doc = input.model_dump()
    doc.update({
        "id": str(uuid.uuid4()),
        "reference": reference,
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    await db.bookings.insert_one(doc)
    booking = {k: v for k, v in doc.items() if k != "_id"}

    owner_sent = False
    customer_sent = False

    if OWNER_EMAIL and EMAIL_KEY:
        try:
            subject = f"{'[EMERGENCY] ' if doc['emergency'] else ''}New Booking {reference} — {doc['service_type']}"
            html = ('<table role="presentation" width="100%" style="background:#F1F5F9;padding:24px 0">'
                    '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
                    'border-radius:12px;padding:32px;font-family:Arial,sans-serif">'
                    f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:0.2em;color:#0284C7;'
                    f'text-transform:uppercase;font-weight:700">New appointment request</p>'
                    f'<h1 style="margin:0 0 20px;font-size:22px;color:#0F172A">{escape(reference)}'
                    f'{" — EMERGENCY" if doc["emergency"] else ""}</h1>'
                    f'<table role="presentation">{_booking_rows(doc)}</table>'
                    f'<p style="margin:24px 0 0;font-size:12px;color:#94A3B8">Received via the AC of South '
                    f'Florida website booking form. Call the customer to confirm the arrival window.</p>'
                    '</td></tr></table></td></tr></table>')
            await send_email(to=OWNER_EMAIL, subject=subject, html=html)
            owner_sent = True
        except Exception as e:
            logger.error(f"Owner notification email failed for {reference}: {e}")

    if EMAIL_KEY:
        try:
            subject = f"Your appointment request {reference} — AC of South Florida"
            html = ('<table role="presentation" width="100%" style="background:#F1F5F9;padding:24px 0">'
                    '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
                    'border-radius:12px;padding:32px;font-family:Arial,sans-serif">'
                    f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:0.2em;color:#0284C7;'
                    f'text-transform:uppercase;font-weight:700">AC of South Florida</p>'
                    f'<h1 style="margin:0 0 16px;font-size:22px;color:#0F172A">Request received, '
                    f'{escape(doc["name"].split()[0])}.</h1>'
                    f'<p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6">Your booking '
                    f'reference is <strong>{escape(reference)}</strong>. Our dispatcher will call '
                    f'<strong>{escape(doc["phone"])}</strong> shortly to confirm your arrival window. '
                    f'For immediate help, call us any time at '
                    f'<a href="tel:+19545543040" style="color:#0369A1">{BUSINESS_PHONE}</a> — we answer 24/7.</p>'
                    f'<table role="presentation">'
                    f'{_row("Service", escape(doc["service_type"]))}'
                    f'{_row("Date", escape(doc["date"]))}'
                    f'{_row("Time", escape(doc["time_slot"]))}'
                    f'{_row("City", escape(doc["city"]))}'
                    f'</table>'
                    f'<p style="margin:24px 0 0;font-size:12px;color:#94A3B8">Sent by AC of South Florida. '
                    f'FL Licensed &amp; Insured HVAC Contractor #CAC1819283.</p>'
                    '</td></tr></table></td></tr></table>')
            await send_email(to=doc["email"], subject=subject, html=html)
            customer_sent = True
        except Exception as e:
            logger.error(f"Customer confirmation email failed for {reference}: {e}")

    return {
        "status": "success",
        "reference": reference,
        "booking": booking,
        "owner_email_sent": owner_sent,
        "confirmation_email_sent": customer_sent,
    }


@api_router.get("/bookings")
async def list_bookings(x_admin_key: Optional[str] = Header(None)):
    if not ADMIN_KEY or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"count": len(bookings), "bookings": bookings}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
