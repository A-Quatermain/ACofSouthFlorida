import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import { PHONE, PHONE_TEL, SERVICE_TYPES, TIME_SLOTS, CITIES } from "../../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-xl border border-white/10 bg-[#0B1425] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-[border-color,box-shadow] duration-300 focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(0,229,255,0.12)]";

const labelCls = "block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2";

export default function Booking({ preselectedService }) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: SERVICE_TYPES[0],
    date: today,
    time_slot: TIME_SLOTS[0],
    city: CITIES[0].name,
    address: "",
    notes: "",
    emergency: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((f) => ({ ...f, service_type: preselectedService }));
    }
  }, [preselectedService]);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post(`${API}/bookings`, form);
      setConfirmation(res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong sending your request. Please call us at " + PHONE + "."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" data-testid="booking-section" className="relative py-24 md:py-32">
      <div className="absolute top-1/3 left-0 w-[380px] h-[380px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-5">
            Ch. 05 / Book Online
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Lock in your technician
            <span className="text-gradient-cyan"> in 60 seconds.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[420px] flex flex-col justify-end"
          >
            <img
              src="https://images.pexels.com/photos/6471912/pexels-photo-6471912.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="AC of South Florida technician checking refrigerant gauges"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/55 to-[#070B12]/20" />
            <div className="relative p-8 md:p-10">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-[#070B12]/70 backdrop-blur-md px-4 py-2 mb-6">
                <span className="dispatch-dot w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300 font-semibold">
                  Dispatchers online now
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                Prefer a human? We answer on the first ring.
              </h3>
              <a
                data-testid="booking-call-link"
                href={PHONE_TEL}
                className="mt-5 inline-flex items-center gap-2.5 font-display text-2xl md:text-3xl font-extrabold text-gradient-cyan"
              >
                <Phone size={24} className="text-cyan-300" />
                {PHONE}
              </a>
              <div className="mt-8 space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2.5">
                  <Clock size={15} className="text-cyan-400 shrink-0" />
                  24/7 emergency line · Standard dispatch 7 AM – 9 PM daily
                </p>
                <p className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-cyan-400 shrink-0" />
                  Licensed & insured · #CAC1819283 · Background-checked techs
                </p>
                <p className="flex items-center gap-2.5">
                  <CalendarCheck size={15} className="text-cyan-400 shrink-0" />
                  Confirmation call within 15 minutes of booking
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            data-testid="booking-form"
            onSubmit={submit}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface rounded-3xl border border-cyan-500/15 p-7 md:p-9"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="booking-name" className={labelCls}>Full Name</label>
                <input id="booking-name" data-testid="booking-name-input" required className={inputCls} placeholder="Jane Alvarez" value={form.name} onChange={set("name")} />
              </div>
              <div>
                <label htmlFor="booking-phone" className={labelCls}>Phone</label>
                <input id="booking-phone" data-testid="booking-phone-input" required type="tel" className={inputCls} placeholder="(954) 555-0100" value={form.phone} onChange={set("phone")} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-email" className={labelCls}>Email</label>
                <input id="booking-email" data-testid="booking-email-input" required type="email" className={inputCls} placeholder="you@email.com" value={form.email} onChange={set("email")} />
              </div>
              <div>
                <label htmlFor="booking-service" className={labelCls}>Service Type</label>
                <select id="booking-service" data-testid="booking-service-select" className={inputCls} value={form.service_type} onChange={set("service_type")}>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-city" className={labelCls}>City</label>
                <select id="booking-city" data-testid="booking-city-select" className={inputCls} value={form.city} onChange={set("city")}>
                  {CITIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-date" className={labelCls}>Preferred Date</label>
                <input id="booking-date" data-testid="booking-date-input" required type="date" min={today} className={inputCls} value={form.date} onChange={set("date")} />
              </div>
              <div>
                <label htmlFor="booking-time" className={labelCls}>Time Window</label>
                <select id="booking-time" data-testid="booking-time-select" className={inputCls} value={form.time_slot} onChange={set("time_slot")}>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-address" className={labelCls}>Street Address (optional)</label>
                <input id="booking-address" data-testid="booking-address-input" className={inputCls} placeholder="123 Palmetto Park Rd" value={form.address} onChange={set("address")} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-notes" className={labelCls}>Notes for the tech (optional)</label>
                <textarea id="booking-notes" data-testid="booking-notes-input" rows={3} className={`${inputCls} resize-none`} placeholder="Unit brand, symptoms, gate code…" value={form.notes} onChange={set("notes")} />
              </div>
            </div>

            <label
              data-testid="booking-emergency-toggle"
              className={`mt-6 flex items-center gap-3.5 rounded-2xl border px-5 py-4 cursor-pointer transition-[border-color,background-color] duration-300 ${
                form.emergency ? "border-red-400/50 bg-red-400/10" : "border-white/10 bg-white/[0.03] hover:border-red-400/30"
              }`}
            >
              <input type="checkbox" className="sr-only" checked={form.emergency} onChange={set("emergency")} />
              <span className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${form.emergency ? "bg-red-400" : "bg-white/10"}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-[left] duration-300 ${form.emergency ? "left-6" : "left-1"}`} />
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <AlertTriangle size={16} className={form.emergency ? "text-red-400" : "text-slate-500"} />
                My AC is currently NOT cooling — emergency priority
              </span>
            </label>

            {error && (
              <p data-testid="booking-error" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              data-testid="booking-submit-button"
              type="submit"
              disabled={submitting}
              className="mt-7 w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-4 text-base font-bold text-[#04121c] transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,229,255,0.35)] disabled:opacity-60 disabled:translate-y-0"
            >
              {submitting ? <Loader2 size={19} className="animate-spin" /> : <CalendarCheck size={19} />}
              {submitting ? "Dispatching your request…" : "Request My Appointment"}
            </button>
            <p className="mt-4 text-center text-xs text-slate-600">
              No payment due now. A dispatcher confirms every request by phone.
            </p>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {confirmation && (
          <motion.div
            data-testid="confirmation-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#04070d]/80 backdrop-blur-md"
            onClick={() => setConfirmation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 32, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg rounded-3xl border border-cyan-400/25 bg-[#0B1425] p-8 md:p-10 shadow-[0_0_80px_rgba(0,229,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="confirmation-close-button"
                onClick={() => setConfirmation(null)}
                className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-slate-400 transition-colors duration-300 hover:text-white hover:border-white/30"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-400/10 text-emerald-400 mb-6">
                <CheckCircle2 size={28} />
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Request received.</h3>
              <p className="mt-2 font-mono text-sm tracking-[0.2em] text-cyan-300" data-testid="confirmation-reference">
                {confirmation.reference}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
                <div>
                  <p className={labelCls}>Service</p>
                  <p className="text-white font-semibold">{confirmation.booking.service_type}</p>
                </div>
                <div>
                  <p className={labelCls}>City</p>
                  <p className="text-white font-semibold">{confirmation.booking.city}</p>
                </div>
                <div>
                  <p className={labelCls}>Date</p>
                  <p className="text-white font-semibold">{confirmation.booking.date}</p>
                </div>
                <div>
                  <p className={labelCls}>Window</p>
                  <p className="text-white font-semibold">{confirmation.booking.time_slot}</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-400 leading-relaxed">
                {confirmation.confirmation_email_sent
                  ? `A confirmation email is on its way to ${confirmation.booking.email}. `
                  : ""}
                Our dispatcher will call <span className="text-white font-semibold">{confirmation.booking.phone}</span> within
                15 minutes to lock in your exact arrival window.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  data-testid="confirmation-call-button"
                  href={PHONE_TEL}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-sm font-bold text-[#04121c] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
                >
                  <Phone size={16} />
                  Call {PHONE}
                </a>
                <button
                  data-testid="confirmation-done-button"
                  onClick={() => setConfirmation(null)}
                  className="flex-1 rounded-full border border-white/15 py-3.5 text-sm font-semibold text-slate-200 transition-[background-color,border-color] duration-300 hover:bg-white/5"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
