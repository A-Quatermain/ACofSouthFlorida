import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { TIERS, scrollToSection } from "../../data";

export default function Pricing({ onBook }) {
  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 md:py-32 bg-[#0A1120]/60">
      <div className="absolute -top-20 left-1/3 w-[420px] h-[420px] rounded-full bg-blue-600/[0.08] blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-5">
            Ch. 02 / Specials & Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Upfront pricing.
            <span className="text-gradient-cyan"> Zero surprises.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
            The number we quote is the number you pay. Every visit includes parts, labor,
            and a workmanship guarantee.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              data-testid={`pricing-tier-${tier.id}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-3xl p-8 md:p-9 flex flex-col transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 ${
                tier.highlight
                  ? "border border-cyan-400/50 bg-gradient-to-b from-[#10233d] to-[#0B1628] shadow-[0_0_50px_rgba(0,229,255,0.14)] lg:scale-[1.04]"
                  : "card-surface border border-white/10 hover:border-cyan-400/30"
              }`}
            >
              <span
                className={`absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] font-bold ${
                  tier.highlight
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-[#04121c]"
                    : "border border-cyan-400/25 bg-[#0D1424] text-cyan-300"
                }`}
              >
                {tier.highlight && <Zap size={11} />}
                {tier.badge}
              </span>

              <h3 className="mt-3 font-display text-xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{tier.subtitle}</p>
              <div className="mt-6 flex items-end gap-2">
                {tier.period === "from" && (
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 pb-2.5">from</span>
                )}
                <span className="font-display text-5xl font-extrabold tracking-tight text-white">
                  {tier.price}
                </span>
                {tier.period === "/year" && (
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 pb-2.5">/year</span>
                )}
                {tier.period === "flat" && (
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 pb-2.5">flat</span>
                )}
              </div>

              <ul className="mt-8 space-y-3.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/10 shrink-0">
                      <Check size={12} className="text-cyan-300" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                data-testid={`pricing-cta-${tier.id}`}
                onClick={() => {
                  onBook(tier.service);
                  scrollToSection("booking");
                }}
                className={`mt-9 w-full rounded-full py-3.5 text-sm font-bold transition-[transform,box-shadow,background-color,border-color] duration-300 hover:-translate-y-0.5 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-[#04121c] hover:shadow-[0_12px_36px_rgba(0,229,255,0.35)]"
                    : "border border-white/15 bg-white/5 text-white hover:border-cyan-400/50 hover:bg-cyan-400/10"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600"
        >
          Prices include parts & labor for standard residential service · Financing on approved credit
        </motion.p>
      </div>
    </section>
  );
}
