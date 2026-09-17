import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Snowflake,
  Building2,
  Wind,
  ThermometerSnowflake,
  ArrowRight,
} from "lucide-react";
import { SERVICES, scrollToSection } from "../../data";

const ICONS = {
  wrench: Wrench,
  shield: ShieldCheck,
  snowflake: Snowflake,
  building: Building2,
  wind: Wind,
  thermostat: ThermometerSnowflake,
};

export default function Services({ onBook }) {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32">
      <div className="absolute top-40 right-0 w-[380px] h-[380px] rounded-full bg-cyan-500/[0.07] blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-5">
            Ch. 01 / What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Six ways we keep
            <span className="text-gradient-cyan"> South Florida cold.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
            From midnight compressor failures to full commercial build-outs — one crew,
            one standard: fixed right the first time.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.number}
                data-testid={`service-card-${service.number}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative card-surface rounded-2xl border border-cyan-500/10 p-7 md:p-8 transition-[border-color,box-shadow,transform] duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_36px_rgba(0,229,255,0.12)] hover:-translate-y-1.5"
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-cyan-500/15 transition-colors duration-300 group-hover:text-cyan-400/30">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{service.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80 border border-cyan-400/20 bg-cyan-400/5 rounded-full px-3 py-1.5">
                    {service.tag}
                  </span>
                  <button
                    data-testid={`service-book-${service.number}`}
                    onClick={() => {
                      onBook(service.title);
                      scrollToSection("booking");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors duration-300 hover:text-cyan-300"
                  >
                    Book
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
