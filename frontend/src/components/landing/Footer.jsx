import { Snowflake, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { PHONE, PHONE_TEL, EMAIL, LICENSE, NAV_LINKS, CITIES, scrollToSection } from "../../data";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative border-t border-white/10 bg-[#05080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/15 mb-16 h-72 md:h-80" data-testid="footer-video-panel">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src="/media/footer-tech.mp4"
            poster="https://images.pexels.com/photos/5463581/pexels-photo-5463581.jpeg?auto=compress&cs=tinysrgb&w=1600"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            data-testid="footer-video"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080F]/95 via-[#05080F]/55 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-8 md:px-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-400 font-semibold mb-4">
              On the job — 24/7
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Real techs. Real tools.
              <span className="text-gradient-cyan"> Right now.</span>
            </h3>
            <a
              data-testid="footer-call-link"
              href={PHONE_TEL}
              className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#04121c] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,229,255,0.35)]"
            >
              <Phone size={16} />
              Call {PHONE}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-[#070B12]">
                <Snowflake size={20} strokeWidth={2.4} />
              </span>
              <span className="leading-none">
                <span className="block font-display font-extrabold tracking-tight text-[15px] text-white">
                  AC of South Florida
                </span>
                <span className="block font-mono text-[10px] tracking-[0.28em] text-cyan-400/90 mt-1 uppercase">
                  24/7 Climate Control
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm text-slate-500 leading-relaxed max-w-xs">
              Precision air conditioning repair, maintenance, and installation for the
              tri-county area — backed by a 100% satisfaction guarantee.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a data-testid="footer-phone-link" href={PHONE_TEL} className="flex items-center gap-2.5 text-slate-300 transition-colors duration-300 hover:text-cyan-300">
                <Phone size={15} className="text-cyan-400" /> {PHONE}
              </a>
              <a data-testid="footer-email-link" href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-slate-300 transition-colors duration-300 hover:text-cyan-300">
                <Mail size={15} className="text-cyan-400" /> {EMAIL}
              </a>
              <p className="flex items-center gap-2.5 text-slate-500">
                <MapPin size={15} className="text-cyan-400" /> Serving Miami-Dade · Broward · Palm Beach
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    data-testid={`footer-link-${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 transition-colors duration-300 hover:text-cyan-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-5">Service Area</h4>
            <ul className="grid grid-cols-1 gap-y-2.5 text-sm text-slate-400">
              {CITIES.slice(0, 8).map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
              <li className="text-cyan-300/80">+ 8 more cities</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-5">Hours & Licensing</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>
                  <span className="text-white font-semibold">Emergency line:</span> 24/7, every day
                  <br />
                  <span className="text-white font-semibold">Standard dispatch:</span> Mon–Sun, 7 AM – 9 PM
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>
                  FL State Licensed & Insured
                  <br />
                  HVAC Contractor <span className="font-mono text-cyan-300">#{LICENSE}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2026 AC of South Florida. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Lic #{LICENSE} · Miami-Dade · Broward · Palm Beach
          </p>
        </div>
      </div>
    </footer>
  );
}
