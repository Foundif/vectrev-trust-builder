import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Zap,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  ChevronLeft,
  ChevronRight,
  Award,
  BadgeCheck,
  FileCheck2,
  ScrollText,
  X,
} from "lucide-react";

import { CTAStrip } from "@/components/CTAStrip";
import { OemBrands } from "@/components/OemBrands";
import { ProfileTeaser } from "@/components/ProfileTeaser";
import { useSiteContent } from "@/lib/site-content";
import controlPanel from "@/assets/control-panel.webp";
import substation from "@/assets/substation.webp";
import testKit from "@/assets/test-kit.webp";
import relay from "@/assets/relay.webp";
import cables from "@/assets/cables.webp";
import hvTest from "@/assets/hv-test.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VECTREV Engineering Solutions — Industrial T&C & Consulting | Tamil Nadu" },
      {
        name: "description",
        content:
          "Industrial electrical Testing & Commissioning, engineering consultancy and safety-compliant project execution. Trusted by plants and contractors across Tamil Nadu.",
      },
      { property: "og:title", content: "VECTREV Engineering Solutions — Industrial T&C & Consulting | Tamil Nadu" },
      { property: "og:description", content: "Industrial electrical Testing & Commissioning, engineering consultancy and safety-compliant project execution. Trusted by plants and contractors across Tamil Nadu." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "VECTREV Engineering Solutions Private Limited",
          telephone: "+91-88796-08428",
          address: {
            "@type": "PostalAddress",
            streetAddress: "61E/2D, TMC Colony, Polepettai",
            addressLocality: "Thoothukudi",
            addressRegion: "Tamil Nadu",
            postalCode: "628002",
            addressCountry: "IN",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "2" },
        }),
      },
    ],
  }),
  component: Home,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const partnerLogos = [
  { name: "Kusam-Meco", src: "/clients/kusam-meco.png", note: "Instruments & Test Equipment" },
  { name: "Siemens", src: "/clients/siemens.png", note: "EPC / Integration Partner" },
  { name: "Larsen & Toubro", src: "/clients/lt.png", note: "EPC / Integration Partner" },
  { name: "BHEL", src: "/clients/bhel.png", note: "EPC / Integration Partner" },
  { name: "Areva", src: "/clients/areva.png", note: "EPC / Integration Partner" },
  { name: "Petron Engineering", src: "/clients/petron.png", note: "EPC / Integration Partner" },
  { name: "ABB", src: "/clients/abb.png", note: "OEM equipment & relays" },
  { name: "Schneider Electric", src: "/clients/schneider.png", note: "OEM switchgear & automation" },
  { name: "OMICRON", src: "/clients/omicron.png", note: "Relay test equipment" },
  { name: "Megger", src: "/clients/megger.png", note: "Test & measurement" },
  { name: "GE Grid Solutions", src: "/clients/ge-grid.png", note: "Protection & grid systems" },
  { name: "Easun Reyrolle", src: "/clients/easun-reyrolle.png", note: "Protection relays" },
  { name: "Adani Renewables", src: "/clients/adani-renewables.png", note: "Renewable energy client" },
  { name: "NLC India Ltd", src: "/clients/nlc-india.png", note: "Utility client" },
];


const consultantPartners = [
  "ABB",
  "Get Power Ltd.",
  "Engineers India Ltd. (EIL)",
  "Tata Consultancy Services",
  "Fichtner-India",
  "Avant-Garde",
  "Development Consultants",
  "DEWA · UAE",
  "SECO · Saudi Arabia",
  "Kahramaa · Qatar",
  "NCC · Saudi Arabia",
  "ORC · Oman",
];

const heroSlideMeta = [
  { key: "home.hero.image1", label: "Switchgear Testing", badge: "LV / MV / HV", tag: "Field Testing" },
  { key: "home.hero.image2", label: "Substation Commissioning", badge: "Up to 225 kV", tag: "Switchyard" },
  { key: "home.hero.image3", label: "Protection & C&R Panels", badge: "ABB · Siemens", tag: "Numerical" },
  { key: "home.hero.image4", label: "Primary Injection Testing", badge: "KUSAM-MECO", tag: "Diagnostics" },
  { key: "home.hero.image5", label: "Secondary Injection", badge: "Scheme Proving", tag: "Relays" },
  { key: "home.hero.image6", label: "Renewable Substations", badge: "Wind · Solar", tag: "Energisation" },
];

function Hero() {
  const { t, img } = useSiteContent();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((v) => (v + 1) % heroSlideMeta.length), 3800);
    return () => clearInterval(i);
  }, []);
  const heroSlides = heroSlideMeta.map((m) => ({ ...m, src: img(m.key) }));
  const slide = heroSlides[idx];
  return (
    <section className="relative px-5 sm:px-8 pt-8 md:pt-14 pb-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="lg:col-span-7"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-brand text-xs font-semibold tracking-wider uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("home.hero.eyebrow")}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.12] lg:leading-[1.08]"
          >
            <span className="block">{t("home.hero.title_line1")}</span>
            <span className="block">
              <span className="text-accent-brand">{t("home.hero.title_accent")}</span>{" "}
              {t("home.hero.title_line2")}
            </span>
            <span className="block">{t("home.hero.title_line3")}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-3">
            <Link
              to="/contact"
              className="glow-ink inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold px-5 sm:px-7 py-3.5 sm:py-4 rounded-full hover:bg-accent transition group text-sm sm:text-base"
            >
              {t("home.hero.cta_primary")}
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border border-foreground/20 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-foreground hover:bg-secondary transition text-sm sm:text-base"
            >
              {t("home.hero.cta_secondary")}
            </Link>
          </motion.div>


          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 max-w-lg gap-6">
            {[
              [t("home.hero.stat1_value"), t("home.hero.stat1_label")],
              [t("home.hero.stat2_value"), t("home.hero.stat2_label")],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{n}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden bg-dark aspect-[4/3] lg:aspect-[4/5] max-h-[62vh] lg:max-h-none shadow-soft">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={slide.src}
                alt={slide.label}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/95 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              <Gauge className="h-3.5 w-3.5 text-accent-brand" />
              {slide.label}
            </div>
            <div className="absolute top-5 right-5 bg-gradient-accent text-accent-foreground rounded-2xl px-4 py-3 text-right shadow-accent">
              <div className="text-[10px] uppercase tracking-widest opacity-80">{slide.tag}</div>
              <div className="text-base font-extrabold leading-tight mt-1">{slide.badge}</div>
            </div>

            {/* Carousel controls */}
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4">
              <button
                onClick={() => setIdx((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Previous slide"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIdx((i) => (i + 1) % heroSlides.length)}
                aria-label="Next slide"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-6 -left-4 sm:left-6 bg-card border border-border rounded-2xl p-4 shadow-card-premium max-w-[260px]"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm font-medium text-foreground mt-2 leading-snug">
              "Professional, knowledgeable and easy to work with."
            </p>
            <p className="text-xs text-muted-foreground mt-1">— Verified Google review</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ClientsMarquee() {
  return (
    <section className="mt-24 py-16 border-y border-border bg-secondary/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center text-xs uppercase tracking-[0.22em] text-accent-brand">
          Clients & Partners
        </div>
        <h2 className="mt-3 text-center text-3xl md:text-4xl font-extrabold text-foreground">
          Trusted by EPCs, OEMs & utilities
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto text-sm">
          VECTREV works alongside global project builders, OEMs and consultants —
          delivering pre-commissioning, protection studies and HV field testing.
        </p>

        <div className="mt-12 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex gap-4 w-max marquee-slow">
            {[...partnerLogos, ...partnerLogos].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="group relative w-44 shrink-0 rounded-2xl bg-card border border-border p-6 flex items-center justify-center h-32 shadow-card-premium"
                title={`${p.name} — ${p.note}`}
              >
                <img
                  src={p.src}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className="max-h-14 max-w-[80%] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>


        {/* Consultants & utilities — text marquee */}
        <div className="mt-14 pt-10 border-t border-border">
          <div className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
            Consultants & utilities we've supported
          </div>
          <div className="overflow-hidden relative">
            <div className="flex gap-10 whitespace-nowrap marquee w-max">
              {[...consultantPartners, ...consultantPartners].map((c, i) => (
                <span key={i} className="text-base md:text-lg font-semibold text-foreground/40 hover:text-accent-brand transition">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

function PromiseBand() {
  const { t } = useSiteContent();
  return (
    <section className="px-5 sm:px-8 py-16">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-dark text-dark-foreground px-8 py-10 md:px-12 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <h2 className="lg:col-span-7 text-2xl md:text-4xl font-extrabold leading-tight">
            {t("home.promise.title")}
          </h2>
          <div className="lg:col-span-5 grid sm:grid-cols-3 gap-4 text-sm font-semibold text-white/75">
            {["home.promise.line1", "home.promise.line2", "home.promise.line3"].map((key) => (
              <div key={key} className="border-l-2 border-accent pl-3">
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const { t, img } = useSiteContent();
  const outcomes = [
    "Zero-defect handover with full test reports",
    "Compliance with IS / IEC / CEA standards",
    "Predictable timelines, transparent updates",
    "Documentation auditors accept first time",
  ];
  return (
    <section className="px-5 sm:px-8 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] overflow-hidden shadow-soft"
        >
          <img src={img("home.solution.image")} alt="VECTREV engineering team on site" className="w-full h-[500px] object-cover" />
        </motion.div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">{t("home.solution.eyebrow")}</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
            {t("home.solution.title")}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {t("home.solution.body")}
          </p>
          <ul className="mt-8 space-y-3">
            {["home.solution.bullet1", "home.solution.bullet2", "home.solution.bullet3", "home.solution.bullet4"].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-brand flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Zap, title: "Electrical T&C", desc: "Pre-commissioning, relay & HV testing.", image: testKit },
  { icon: ClipboardCheck, title: "Consultancy", desc: "Protection studies, SLDs, BOQs.", image: relay },
  { icon: HardHat, title: "Project Execution", desc: "On-site supervision & OEM coordination.", image: cables },
  { icon: ShieldCheck, title: "Safety Compliance", desc: "CEA / Electrical Inspectorate ready.", image: hvTest },
];

function FeaturedServices() {
  return (
    <section className="px-5 sm:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">Our expertise</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
              Featured Services
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Four engineering disciplines built around one promise: reliable
              power, every shift.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-brand transition group"
          >
            View all services
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.06 }}
              className="h-full"
            >
              <Link
                to="/services"
                className="group flex h-full flex-col rounded-3xl overflow-hidden bg-card border border-border shadow-card-premium hover:-translate-y-1 transition"
              >
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white/95 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-accent-brand" />
                  </div>
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/95 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-foreground group-hover:rotate-45 transition" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sumathy S",
    role: "Verified Google review",
    text: "VECTREV delivered exactly what we needed — professional, knowledgeable, and easy to work with. Their team was responsive, detail-oriented, and got the job done right.",
  },
  {
    name: "Project Manager",
    role: "EPC Contractor · Tamil Nadu",
    text: "VECTREV Engineering Solutions provided excellent service for our project. Very competent team, followed all safety protocols. Highly recommended for industrial electrical T&C.",
  },
  {
    name: "Plant Head",
    role: "Manufacturing Plant · Thoothukudi",
    text: "Documentation was audit-ready on day one. They stayed on site until every relay was coordinated and every reading was signed off. Rare in this industry.",
  },
  {
    name: "EHS Manager",
    role: "Process Industry",
    text: "PTW, LOTO, PPE — non-negotiable and visible on every shift. Zero incidents across the shutdown. That's what a safety-first partner looks like.",
  },
];

function SocialProof() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((v) => (v + 1) % testimonials.length), []);
  const prev = useCallback(() => setI((v) => (v - 1 + testimonials.length) % testimonials.length), []);
  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="px-5 sm:px-8 py-20">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-secondary/60 p-8 md:p-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">Social proof</div>
            <div className="mt-5 flex items-end gap-3">
              <div className="text-6xl font-extrabold text-foreground leading-none">5.0</div>
              <div className="pb-1">
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Google reviews</div>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground max-w-sm leading-relaxed">
              Plant owners and project managers choose VECTREV because we show
              up, document, and deliver.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="h-11 w-11 rounded-full border border-border bg-card hover:bg-secondary transition flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="h-11 w-11 rounded-full border border-border bg-card hover:bg-secondary transition flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="ml-3 text-xs text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card-premium"
              >
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-5 text-foreground leading-relaxed text-lg md:text-xl">
                  "{testimonials[i].text}"
                </p>
                <footer className="mt-6 text-sm">
                  <div className="font-semibold text-foreground">{testimonials[i].name}</div>
                  <div className="text-muted-foreground">{testimonials[i].role}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {testimonials.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setI(j)}
                  aria-label={`Testimonial ${j + 1}`}
                  className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-accent" : "w-1.5 bg-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceBadges() {
  const items = [
    { icon: ShieldCheck, title: "Statutory Ready", note: "CEA · IS/IEC · Factories Act" },
    { icon: BadgeCheck, title: "MSME Registered", note: "Udyam Recognised" },
    { icon: FileCheck2, title: "GST Compliant", note: "33AALCV0745P1ZU" },
    { icon: Award, title: "PTW · LOTO · PPE", note: "Zero-incident protocol" },
    { icon: ScrollText, title: "Audit-ready Reports", note: "Signed field protocols" },
  ];
  return (
    <section className="px-5 sm:px-8 pb-4 pt-2">
      <div className="max-w-7xl mx-auto rounded-3xl border border-border bg-card/70 backdrop-blur px-5 sm:px-8 py-5 shadow-card-premium">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <it.icon className="h-5 w-5 text-accent-brand" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">{it.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{it.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const credentials = [
  { title: "Certificate of Incorporation", issuer: "Ministry of Corporate Affairs · GoI", ref: "CIN · U71200TN2025PTC180169", accent: "from-[oklch(0.35_0.08_258)] to-[oklch(0.18_0.04_258)]" },
  { title: "GST Registration", issuer: "Government of India · CBIC", ref: "GSTIN · 33AALCV0745P1ZU", accent: "from-[oklch(0.55_0.24_18)] to-[oklch(0.35_0.18_18)]" },
  { title: "Udyam / MSME Recognition", issuer: "Ministry of MSME", ref: "Recognised Micro Enterprise", accent: "from-[oklch(0.4_0.12_180)] to-[oklch(0.22_0.06_258)]" },
  { title: "Performance Letter — Substation T&C", issuer: "EPC Client · Tamil Nadu", ref: "33/11 kV Energisation · 2025", accent: "from-[oklch(0.35_0.08_258)] to-[oklch(0.18_0.04_258)]" },
  { title: "Safety Compliance Sign-off", issuer: "Plant EHS · Process Industry", ref: "Zero-incident shutdown · 2025", accent: "from-[oklch(0.55_0.24_18)] to-[oklch(0.28_0.14_18)]" },
];

function Credentials() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const next = useCallback(() => setI((v) => (v + 1) % credentials.length), []);
  const prev = useCallback(() => setI((v) => (v - 1 + credentials.length) % credentials.length), []);

  useEffect(() => {
    if (open !== null) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <section className="px-5 sm:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">Credentials & Certificates</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground heading-crisp">
              Recognised. Registered. Referenced.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Statutory registrations and real client performance letters —
              click any card to open it full-screen.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Previous credential" className="h-11 w-11 rounded-full border border-border bg-card hover:bg-secondary transition flex items-center justify-center">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next credential" className="h-11 w-11 rounded-full border border-border bg-card hover:bg-secondary transition flex items-center justify-center">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <motion.div
            animate={{ x: `calc(${-i} * (min(360px, 85%) + 20px))` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="flex gap-5"
          >
            {credentials.map((c, idx) => (
              <button
                key={c.title}
                onClick={() => setOpen(idx)}
                className={`group flex-shrink-0 w-[85%] sm:w-[360px] aspect-[4/3] rounded-3xl overflow-hidden text-left relative bg-gradient-to-br ${c.accent} shadow-card-premium hover:-translate-y-1 transition`}
              >
                <div className="absolute inset-0 grid-pattern opacity-25" />
                <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="relative h-full p-7 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">Certificate</div>
                    <div className="mt-3 text-xl font-extrabold leading-tight">{c.title}</div>
                    <div className="mt-2 text-sm text-white/75">{c.issuer}</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-xs font-mono text-white/85 tabular-nums">{c.ref}</div>
                    <div className="inline-flex items-center gap-1 text-xs text-white/80 group-hover:text-white transition">
                      View <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {credentials.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Credential ${j + 1}`}
              className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-accent" : "w-1.5 bg-foreground/20"}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog" aria-modal="true"
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpen(null); }}
              aria-label="Close"
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white flex items-center justify-center transition"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className={`relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${credentials[open].accent}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 grid-pattern opacity-25" />
              <div className="relative h-full p-10 md:p-14 flex flex-col justify-between text-white">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/60">Certificate</div>
                  <div className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">{credentials[open].title}</div>
                  <div className="mt-3 text-white/75">{credentials[open].issuer}</div>
                </div>
                <div>
                  <div className="text-sm font-mono text-white/85 tabular-nums">{credentials[open].ref}</div>
                  <a
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur px-5 py-2.5 rounded-full text-sm font-semibold transition"
                  >
                    Request verified copy <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <ComplianceBadges />
      <ClientsMarquee />
      <OemBrands />
      <ProfileTeaser />
      <PromiseBand />
      <div className="relative">
        <img src={substation} alt="" aria-hidden="true" className="absolute -z-10 inset-0 w-full h-full object-cover opacity-[0.04]" />
        <Solution />
      </div>
      <FeaturedServices />
      <SocialProof />
      <Credentials />
      <CTAStrip />
    </>
  );
}