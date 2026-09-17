import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, CalendarCheck, Star, Clock, ShieldCheck, Snowflake } from "lucide-react";
import { PHONE, PHONE_TEL, scrollToSection } from "../../data";

const HEADLINE = [
  { text: "UNCOMPROMISING", gradient: false },
  { text: "COOLING.", gradient: false },
  { text: "INSTANT 24/7 RELIEF.", gradient: true },
];

const STATS = [
  { value: "15,000+", label: "Units Serviced" },
  { value: "< 45 min", label: "Emergency Response" },
  { value: "4.9", label: "Google Rating", star: true },
  { value: "12+ yrs", label: "In South Florida" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 900], [0, 200]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.25]);

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y: videoY }} className="absolute inset-0 -z-10">
        <video
          className="w-full h-[115%] object-cover opacity-30"
          src="/media/hero-tech.mp4"
          poster="https://images.pexels.com/photos/5463576/pexels-photo-5463576.jpeg?auto=compress&cs=tinysrgb&w=1600"
          autoPlay
          muted
          loop
          playsInline
          data-testid="hero-video"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/80 via-[#070B12]/70 to-[#070B12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B12]/90 via-transparent to-[#070B12]/60" />
      </motion.div>

      <div className="absolute -z-10 top-1/3 -left-32 w-[480px] h-[480px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute -z-10 bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      <motion.div style={{ opacity: fade }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 mb-10"
          data-testid="hero-dispatch-badge"
        >
          <span className="dispatch-dot w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-emerald-300 font-semibold">
            24/7 Live Dispatch — Miami-Dade · Broward · Palm Beach
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold tracking-tight leading-[1.02] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] max-w-5xl">
          {HEADLINE.map((line, i) => (
            <span key={line.text} className="hero-line-mask pb-1">
              <motion.span
                className={`block ${line.gradient ? "text-gradient-cyan" : "text-gradient-frost"}`}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          South Florida's precision HVAC crew. When your AC quits in 94° heat, our certified
          technicians are rolling in under 45 minutes — day, night, weekends, holidays.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            data-testid="hero-book-button"
            onClick={() => scrollToSection("booking")}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-base font-bold text-[#04121c] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,229,255,0.4)]"
          >
            <CalendarCheck size={19} className="transition-transform duration-300 group-hover:rotate-6" />
            Book Online Service
          </button>
          <a
            data-testid="hero-call-button"
            href={PHONE_TEL}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-bold text-white transition-[background-color,border-color,transform] duration-300 hover:bg-white/10 hover:border-cyan-400/40 hover:-translate-y-1"
          >
            <Phone size={19} className="text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
            Emergency: {PHONE}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10 max-w-4xl"
          data-testid="hero-stats"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0B1220]/90 backdrop-blur-sm px-6 py-6">
              <div className="flex items-center gap-1.5 font-display text-2xl sm:text-3xl font-extrabold text-white">
                {s.value}
                {s.star && <Star size={18} className="fill-cyan-400 text-cyan-400" />}
              </div>
              <div className="mt-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-cyan-400" /> FL Licensed & Insured #CAC1819283
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-cyan-400" /> Technicians on the road right now
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Snowflake size={14} className="text-cyan-400" /> All major brands serviced
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
