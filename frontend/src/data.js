export const PHONE = "954-554-3040";
export const PHONE_TEL = "tel:+19545543040";
export const EMAIL = "alan@acofsouthflorida.com";
export const LICENSE = "CAC1819283";

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Specials" },
  { id: "reviews", label: "Reviews" },
  { id: "service-area", label: "Service Area" },
  { id: "booking", label: "Book Online" },
];

export const SERVICES = [
  {
    number: "01",
    icon: "wrench",
    title: "24/7 AC Repair & Diagnostics",
    desc: "Precision diagnostics and immediate cooling restoration for all major brands — even at 2 AM in August.",
    tag: "Emergency Dispatch",
  },
  {
    number: "02",
    icon: "shield",
    title: "Maintenance & Tune-Ups",
    desc: "21-point inspection that prevents breakdowns, lowers FPL bills, and extends equipment lifespan.",
    tag: "$89 Special",
  },
  {
    number: "03",
    icon: "snowflake",
    title: "New System Installation",
    desc: "High-SEER2 inverter systems engineered for Florida humidity. Free load calculations, zero-down financing.",
    tag: "Rebates up to $2,000",
  },
  {
    number: "04",
    icon: "building",
    title: "Commercial HVAC",
    desc: "Custom climate engineering for retail, offices, and industrial spaces across the tri-county area.",
    tag: "Commercial Priority",
  },
  {
    number: "05",
    icon: "wind",
    title: "Duct Cleaning & Sanitization",
    desc: "HEPA filtration and UV sanitization that eliminate mold spores, dust mites, and allergens at the source.",
    tag: "Pure Air Guarantee",
  },
  {
    number: "06",
    icon: "thermostat",
    title: "Smart Thermostats",
    desc: "Nest, Ecobee, and full smart-home integration for remote climate and humidity control from anywhere.",
    tag: "Energy Savings",
  },
];

export const TIERS = [
  {
    id: "tuneup",
    name: "Precision Tune-Up",
    price: "$89",
    period: "flat",
    subtitle: "Single service assessment",
    badge: "Popular Entry",
    highlight: false,
    cta: "Claim $89 Tune-Up",
    service: "Maintenance / $89 Tune-Up",
    features: [
      "21-point comprehensive system check",
      "Refrigerant level & pressure test",
      "Condensate drain line flush",
      "Electrical & capacitor inspection",
      "Thermostat calibration",
    ],
  },
  {
    id: "careplan",
    name: "Annual Care Plan",
    price: "$199",
    period: "/year",
    subtitle: "Complete peace of mind",
    badge: "Best Value",
    highlight: true,
    cta: "Join Care Plan",
    service: "Annual Care Plan",
    features: [
      "2 full maintenance visits per year",
      "15% off all repairs & parts",
      "Priority emergency dispatch status",
      "Zero diagnostic fees with repair",
      "Transferable to new homeowner",
    ],
  },
  {
    id: "install",
    name: "New System Install",
    price: "$3,999",
    period: "from",
    subtitle: "High-efficiency upgrade",
    badge: "High Efficiency",
    highlight: false,
    cta: "Request Free Estimate",
    service: "New System Installation",
    features: [
      "Daikin, Trane & Carrier inverter units",
      "10-year manufacturer warranty",
      "0% APR financing for 60 months",
      "Free smart thermostat included",
      "Same-day professional installation",
    ],
  },
];

export const REVIEWS = [
  {
    name: "Dr. Marcus Vance",
    city: "Coral Gables, FL",
    service: "24/7 AC Repair",
    text: "AC died on a 94° Saturday afternoon. A tech was at my front door in 38 minutes and repaired the blown capacitor on the spot. Lifesavers.",
  },
  {
    name: "Elena Rostova",
    city: "Boca Raton, FL",
    service: "New System Installation",
    text: "Replaced our 12-year-old unit with an 18 SEER2 variable-speed system. Our FPL bill dropped nearly $180 a month immediately. Flawless work.",
  },
  {
    name: "Carlos M. Rodriguez",
    city: "Fort Lauderdale, FL",
    service: "Annual Care Plan",
    text: "Three years on the care plan. Punctual, polite, extremely clean — shoe covers on, mechanical closet immaculate when they leave.",
  },
  {
    name: "Sarah Jenkins",
    city: "West Palm Beach, FL",
    service: "Duct Cleaning & UV",
    text: "Noticeable air-quality improvement within 24 hours. My daughter's morning allergies completely vanished after the duct sanitization.",
  },
  {
    name: "David L. Sterling",
    city: "Aventura, FL",
    service: "Commercial HVAC",
    text: "They handle climate control for our three retail showrooms. Professional, transparent invoicing, zero downtime. Outstanding partner.",
  },
  {
    name: "Patricia Thorne",
    city: "Weston, FL",
    service: "Smart Thermostat Setup",
    text: "Installed Nest thermostats and balanced airflow across all four upstairs bedrooms. Cool, quiet, perfectly balanced air throughout.",
  },
];

export const RATING_BREAKDOWN = [
  { label: "Emergency Speed", score: "5.0", pct: 100 },
  { label: "Workmanship & Cleanliness", score: "4.9", pct: 98 },
  { label: "Technical Expertise", score: "5.0", pct: 100 },
  { label: "Fair & Upfront Pricing", score: "4.8", pct: 96 },
];

export const CITIES = [
  { name: "West Palm Beach", county: "Palm Beach", x: 419, y: 58 },
  { name: "Boynton Beach", county: "Palm Beach", x: 406, y: 157 },
  { name: "Delray Beach", county: "Palm Beach", x: 400, y: 190 },
  { name: "Boca Raton", county: "Palm Beach", x: 346, y: 239 },
  { name: "Pompano Beach", county: "Broward", x: 350, y: 306 },
  { name: "Fort Lauderdale", county: "Broward", x: 338, y: 367 },
  { name: "Plantation", county: "Broward", x: 247, y: 364 },
  { name: "Davie", county: "Broward", x: 229, y: 390 },
  { name: "Weston", county: "Broward", x: 89, y: 378 },
  { name: "Hollywood", county: "Broward", x: 327, y: 424 },
  { name: "Pembroke Pines", county: "Broward", x: 188, y: 426 },
  { name: "Miramar", county: "Broward", x: 249, y: 437 },
  { name: "Aventura", county: "Miami-Dade", x: 337, y: 453 },
  { name: "Sunny Isles", county: "Miami-Dade", x: 354, y: 456 },
  { name: "Miami", county: "Miami-Dade", x: 287, y: 554 },
  { name: "Coral Gables", county: "Miami-Dade", x: 215, y: 575 },
];

export const SERVICE_TYPES = [
  "AC Repair & Diagnostics",
  "Maintenance / $89 Tune-Up",
  "Annual Care Plan",
  "New System Installation",
  "Commercial HVAC",
  "Duct Cleaning & Sanitization",
  "Smart Thermostat Setup",
];

export const TIME_SLOTS = [
  "Morning (8 AM – 11 AM)",
  "Midday (11 AM – 2 PM)",
  "Afternoon (2 PM – 5 PM)",
  "Evening (5 PM – 8 PM)",
  "Emergency — ASAP",
];
