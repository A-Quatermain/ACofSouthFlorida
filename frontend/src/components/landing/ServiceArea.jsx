import { motion } from "framer-motion";
import { MapPin, Truck } from "lucide-react";
import { CITIES } from "../../data";

const COUNTY_COLORS = {
  "Palm Beach": "text-cyan-300 border-cyan-400/25 bg-cyan-400/5",
  Broward: "text-sky-300 border-sky-400/25 bg-sky-400/5",
  "Miami-Dade": "text-indigo-300 border-indigo-400/25 bg-indigo-400/5",
};

export default function ServiceArea() {
  return (
    <section id="service-area" data-testid="service-area-section" className="relative py-24 md:py-32 bg-[#0A1120]/60 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-5">
              Ch. 04 / Service Area
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Three counties. Sixteen cities.
              <span className="text-gradient-cyan"> One rapid fleet.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              From Jupiter Inlet to Coral Gables, our dispatch hub stages fully stocked trucks
              across the tri-county corridor — so "we'll be right there" actually means it.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4">
              <Truck size={20} className="text-cyan-300 shrink-0" />
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">Live dispatch:</span> average arrival
                under 45 minutes inside the shaded zone.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5" data-testid="city-list">
              {CITIES.map((city) => (
                <span
                  key={city.name}
                  data-testid={`city-chip-${city.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 cursor-default ${COUNTY_COLORS[city.county]}`}
                >
                  <MapPin size={12} />
                  {city.name}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Palm Beach
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> Broward
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" /> Miami-Dade
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative card-surface rounded-3xl border border-cyan-500/15 p-4 sm:p-6 shadow-[0_0_60px_rgba(0,229,255,0.07)]"
            data-testid="service-area-map"
          >
            <svg viewBox="0 0 480 620" className="w-full h-auto" role="img" aria-label="Tri-county service area map">
              <defs>
                <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10203A" />
                  <stop offset="100%" stopColor="#0A1424" />
                </linearGradient>
                <linearGradient id="mapStroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              <path
                d="M 70 24 L 400 24 Q 448 140 414 264 Q 446 352 404 440 Q 438 520 380 588 L 110 588 Q 60 470 74 350 Q 52 180 70 24 Z"
                fill="url(#mapFill)"
                stroke="url(#mapStroke)"
                strokeWidth="1.6"
              />
              <path d="M 66 264 Q 240 250 414 264" fill="none" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="5 7" />
              <path d="M 72 440 Q 240 428 404 440" fill="none" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="5 7" />

              <text x="176" y="140" fill="#67E8F9" fillOpacity="0.55" fontSize="13" fontFamily="'JetBrains Mono', monospace" letterSpacing="4">PALM BEACH</text>
              <text x="196" y="352" fill="#7DD3FC" fillOpacity="0.55" fontSize="13" fontFamily="'JetBrains Mono', monospace" letterSpacing="4">BROWARD</text>
              <text x="168" y="522" fill="#A5B4FC" fillOpacity="0.55" fontSize="13" fontFamily="'JetBrains Mono', monospace" letterSpacing="4">MIAMI-DADE</text>
              <text x="464" y="330" fill="#475569" fontSize="11" fontFamily="'JetBrains Mono', monospace" letterSpacing="3" transform="rotate(90 464 330)">ATLANTIC OCEAN</text>

              {CITIES.map((city) => {
                const color = city.county === "Palm Beach" ? "#22D3EE" : city.county === "Broward" ? "#38BDF8" : "#818CF8";
                return (
                  <g key={city.name} className="city-dot" data-testid={`map-city-${city.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <circle className="dot-ring" cx={city.x} cy={city.y} r="7" fill={color} opacity="0.4" />
                    <circle cx={city.x} cy={city.y} r="5" fill={color} stroke="#070B12" strokeWidth="1.5" />
                    <g className="dot-label">
                      <rect x={city.x - 52} y={city.y - 34} width="104" height="22" rx="11" fill="#0D1424" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
                      <text x={city.x} y={city.y - 19} textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
                        {city.name}
                      </text>
                    </g>
                    <title>{city.name}, {city.county} County</title>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
