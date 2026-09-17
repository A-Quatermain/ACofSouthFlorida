import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Snowflake, Phone, Menu, X, CalendarCheck } from "lucide-react";
import { NAV_LINKS, PHONE, PHONE_TEL, scrollToSection } from "../../data";

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 border-b ${
        scrolled
          ? "glass-panel border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <button
            data-testid="nav-logo"
            onClick={() => go("home")}
            className="flex items-center gap-3 group"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-[#070B12] shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-transform duration-300 group-hover:rotate-90">
              <Snowflake size={20} strokeWidth={2.4} />
            </span>
            <span className="text-left leading-none">
              <span className="block font-display font-extrabold tracking-tight text-[15px] text-white">
                AC of South Florida
              </span>
              <span className="block font-mono text-[10px] tracking-[0.28em] text-cyan-400/90 mt-1 uppercase">
                24/7 Climate Control
              </span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-links-desktop">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-testid={`nav-link-${link.id}`}
                onClick={() => go(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-4 right-4 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              data-testid="call-button-header"
              href={PHONE_TEL}
              className="hidden md:flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-[background-color,border-color,transform] duration-300 hover:bg-cyan-400/20 hover:border-cyan-400/60 hover:-translate-y-0.5"
            >
              <Phone size={15} />
              {PHONE}
            </a>
            <button
              data-testid="nav-book-button"
              onClick={() => go("booking")}
              className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-[#04121c] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,229,255,0.35)]"
            >
              <CalendarCheck size={15} />
              Book Now
            </button>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen(!open)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-200"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden glass-panel border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  data-testid={`mobile-nav-link-${link.id}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  onClick={() => go(link.id)}
                  className={`text-left py-3 text-lg font-display font-semibold border-b border-white/5 ${
                    activeSection === link.id ? "text-cyan-300" : "text-slate-200"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                data-testid="mobile-call-button"
                href={PHONE_TEL}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3.5 text-base font-bold text-[#04121c]"
              >
                <Phone size={17} />
                Call {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
