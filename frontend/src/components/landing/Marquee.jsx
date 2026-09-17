import { Snowflake } from "lucide-react";
import { PHONE } from "../../data";

const ITEMS = [
  "24/7 EMERGENCY DISPATCH",
  "MIAMI-DADE",
  "BROWARD",
  "PALM BEACH",
  "HIGH-EFFICIENCY INVERTER SYSTEMS",
  "INDOOR AIR PURIFICATION",
  "LICENSED & INSURED CAC#1819283",
  PHONE,
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="ticker-marquee"
      className="relative border-y border-cyan-500/10 bg-[#0A1120] py-5 overflow-hidden"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-slate-500 uppercase">
              {item}
            </span>
            <Snowflake size={13} className="text-cyan-500/60 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
