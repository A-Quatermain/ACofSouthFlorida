# PRD — AC of South Florida Landing Page

## Original Problem Statement
Landing page for AC of South Florida (HVAC): kinetic hero with stats, 24/7 badge, dual CTAs (book online + call 954-554-3040) and technician video; 6 service cards; 3 pricing tiers ($89 tune-up / $199 care plan / $3,999+ install); 6 testimonials with 4.9★ summary; SVG tri-county map with 16 cities; booking form with confirmation modal; footer with hours, licensing, technician video. Responsive, scroll animations, active nav highlighting, glass sticky nav, clickable phone everywhere. Bookings stored in backend + emailed to alan@acofsouthflorida.com. Award-level design (framer-motion reveals, lenis smooth scroll, parallax hero).

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + lucide-react. Single-page sections in `src/components/landing/`. Shared data in `src/data.js`.
- Backend: FastAPI (`/api` prefix) + MongoDB (motor). `POST /api/bookings` stores booking + sends owner notification (alan@acofsouthflorida.com) and customer confirmation via Emergent managed Resend proxy. `GET /api/bookings` admin list (X-Admin-Key header).
- Media: technician videos served locally from `frontend/public/media/` (hero-tech.mp4, footer-tech.mp4) — Pexels/Mixkit CDNs block this environment, so videos were downloaded.
- Env: backend/.env has EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, EMAIL_REPLY_TO, OWNER_EMAIL, ADMIN_KEY.

## User Personas
- Homeowner with a broken AC needing 24/7 emergency repair
- Homeowner shopping maintenance plans / new high-efficiency installs
- Commercial property manager needing HVAC contracts

## Core Requirements (static)
All sections/features from the problem statement above.

## Implemented (2026-07-17)
- Full landing page: hero (masked line reveal, parallax video bg, stats, 24/7 badge, dual CTAs), marquee ticker, 6 numbered service cards, 3 pricing tiers (middle highlighted), reviews with 4.9 summary + animated bars, interactive SVG tri-county map with 16 pulsing city dots, booking form with emergency toggle + confirmation modal (reference number), footer with technician video panel, hours, license #CAC1819283.
- Sticky glass navbar with scrollspy underline, mobile hamburger drawer, click-to-call throughout.
- Lenis momentum scrolling + framer-motion scroll reveals on all sections.
- Backend booking API with MongoDB persistence + dual email notifications (verified sending).

## Verified
- POST /api/bookings returns reference, owner_email_sent + confirmation_email_sent = true
- GET /api/bookings requires admin key (401 without)
- UI flows screenshotted: hero, services, pricing, reviews, map, booking submit → modal, mobile menu

## Backlog
- P0: none
- P1: Admin bookings dashboard page (view list in browser), SMS notifications (Twilio), real review feed (Google Places API)
- P2: Online payment/deposit for tune-up (Stripe), live chat widget, bilingual EN/ES toggle, financing calculator
