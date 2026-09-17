import { motion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { REVIEWS, RATING_BREAKDOWN } from "../../data";

const Stars = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={15} className="fill-cyan-400 text-cyan-400" />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <section id="reviews" data-testid="reviews-section" className="relative py-24 md:py-32">
      <div className="absolute top-1/4 -left-24 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-5">
            Ch. 03 / Reviews
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Rated by the people
            <span className="text-gradient-cyan"> we keep cool.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
          <motion.div
            data-testid="rating-summary"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface rounded-3xl border border-cyan-500/15 p-8 md:p-9 flex flex-col"
          >
            <div className="flex items-end gap-3">
              <span className="font-display text-7xl font-extrabold tracking-tight text-white leading-none">4.9</span>
              <div className="pb-1.5">
                <Stars />
                <p className="mt-2 text-xs text-slate-500">1,280+ verified reviews</p>
              </div>
            </div>
            <div className="mt-8 space-y-5 flex-1">
              {RATING_BREAKDOWN.map((row, i) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">{row.label}</span>
                    <span className="font-mono text-cyan-300">{row.score}/5</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2.5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3.5">
              <BadgeCheck size={18} className="text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-300 leading-relaxed">
                100% satisfaction guarantee — if it's not right, we come back free.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <motion.figure
                key={review.name}
                data-testid={`review-card-${i + 1}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group card-surface rounded-2xl border border-white/10 p-6 flex flex-col transition-[border-color,transform,box-shadow] duration-300 hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(0,229,255,0.08)]"
              >
                <Quote size={20} className="text-cyan-500/30 mb-4 transition-colors duration-300 group-hover:text-cyan-400/50" />
                <blockquote className="text-sm text-slate-300 leading-relaxed flex-1">
                  "{review.text}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-white/5">
                  <Stars />
                  <p className="mt-3 text-sm font-semibold text-white">{review.name}</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">{review.city}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-300/70 border border-cyan-400/15 rounded-full px-2 py-1">
                      {review.service}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
