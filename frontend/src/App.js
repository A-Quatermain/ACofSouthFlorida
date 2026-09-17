import { useEffect, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import Reviews from "@/components/landing/Reviews";
import ServiceArea from "@/components/landing/ServiceArea";
import Booking from "@/components/landing/Booking";
import Footer from "@/components/landing/Footer";

const SECTION_IDS = ["home", "services", "pricing", "reviews", "service-area", "booking"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [preselectedService, setPreselectedService] = useState("");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App bg-[#070B12] text-slate-100 antialiased">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <Marquee />
        <Services onBook={setPreselectedService} />
        <Pricing onBook={setPreselectedService} />
        <Reviews />
        <ServiceArea />
        <Booking preselectedService={preselectedService} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
