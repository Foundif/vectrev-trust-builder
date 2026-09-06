import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Mail,
  ChevronDown,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import logo from "@/assets/logo.webp";

import { services, serviceCategories } from "@/data/services";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/company-profile", label: "Company Profile" },
  { to: "/branches", label: "Branches" },
  { to: "/contact", label: "Contact" },
] as const;

const desktopLinksBefore = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
] as const;

const desktopLinksAfter = [{ to: "/contact", label: "Contact" }] as const;

const moreLinks = [
  { to: "/gallery", label: "Gallery", desc: "Field & project photos", icon: ImageIcon },
  {
    to: "/company-profile",
    label: "Company Profile",
    desc: "Download the 2026 PDF",
    icon: FileText,
  },
  { to: "/branches", label: "Branches", desc: "Offices & deployment", icon: ImageIcon },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    setMoreOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "px-3 sm:px-6 pt-3 sm:pt-5" : "px-0 pt-0"}`}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={`flex items-center justify-between gap-3 pl-3 pr-3 py-2 transition-all duration-300 ${
            scrolled
              ? "max-w-7xl mx-auto border border-border bg-card/95 backdrop-blur-xl shadow-soft rounded-full"
              : "w-full border-b border-border bg-card/90 backdrop-blur-md rounded-none px-4 sm:px-8"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 pl-1 pr-3 rounded-full">
            <img src={logo} alt="VECTREV" className="h-12 w-12 sm:h-14 sm:w-14" />
            <div className="leading-none">
              <div className="font-extrabold tracking-tight text-accent-brand text-lg sm:text-xl">
                vectrev
              </div>
              <div className="text-[9px] mt-1.5 uppercase tracking-[0.22em] text-muted-foreground hidden sm:block">
                Engineering Solutions
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {desktopLinksBefore.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-accent-brand bg-accent/10" }}
                inactiveProps={{
                  className: "text-foreground/75 hover:text-foreground hover:bg-secondary",
                }}
                className="px-3.5 py-2 rounded-full text-sm font-medium transition"
              >
                {l.label}
              </Link>
            ))}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => {
                  setMegaOpen((v) => !v);
                  setMoreOpen(false);
                }}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition inline-flex items-center gap-1 ${
                  megaOpen || pathname.startsWith("/services")
                    ? "text-accent-brand bg-accent/10"
                    : "text-foreground/75 hover:text-foreground hover:bg-secondary"
                }`}
                aria-expanded={megaOpen}
                aria-controls="services-mega-menu"
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    id="services-mega-menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 z-50 mt-3 grid max-h-[calc(100vh-7rem)] w-[860px] max-w-[calc(100vw-2rem)] -translate-x-1/2 grid-cols-3 gap-6 overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-card-premium"
                  >
                    {serviceCategories.map((cat) => (
                      <div key={cat}>
                        <div className="text-[10px] uppercase tracking-widest text-accent-brand font-semibold">
                          {cat}
                        </div>
                        <div className="mt-3 space-y-1">
                          {services
                            .filter((s) => s.category === cat)
                            .map((s) => (
                              <Link
                                key={s.slug}
                                to="/services/$slug"
                                params={{ slug: s.slug }}
                                onClick={() => setMegaOpen(false)}
                                className="block p-2.5 rounded-xl hover:bg-secondary transition"
                              >
                                <div className="text-sm font-semibold text-foreground leading-snug">
                                  {s.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                  {s.short}
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-3 pt-4 border-t border-border flex items-center justify-between">
                      <Link
                        to="/services"
                        onClick={() => setMegaOpen(false)}
                        className="text-sm font-semibold text-accent-brand inline-flex items-center gap-1.5"
                      >
                        View all services <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/products"
                        onClick={() => setMegaOpen(false)}
                        className="text-sm font-semibold text-foreground inline-flex items-center gap-1.5"
                      >
                        Panels & instruments <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition inline-flex items-center gap-1 ${
                  moreOpen ||
                  pathname === "/company-profile" ||
                  pathname === "/branches" ||
                  pathname === "/gallery"
                    ? "text-accent-brand bg-accent/10"
                    : "text-foreground/75 hover:text-foreground hover:bg-secondary"
                }`}
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] bg-card border border-border rounded-2xl shadow-card-premium p-2 z-50"
                  >
                    {moreLinks.map((m) => (
                      <Link
                        key={m.to}
                        to={m.to}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <m.icon className="h-5 w-5 text-accent-brand" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                            {m.label}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {desktopLinksAfter.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-accent-brand bg-accent/10" }}
                inactiveProps={{
                  className: "text-foreground/75 hover:text-foreground hover:bg-secondary",
                }}
                className="px-3.5 py-2 rounded-full text-sm font-medium transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+916379608428"
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition px-3"
            >
              <Phone className="h-4 w-4" />
              +91 63796 08428
            </a>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-foreground text-background font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-accent transition group"
            >
              Get Quote
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </Link>
            {!open && (
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="lg:hidden h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-soft hover:bg-accent transition"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-dark text-dark-foreground overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <img src={logo} alt="VECTREV" className="h-9 w-9" />
                  <div className="leading-none">
                    <div className="font-extrabold tracking-tight text-base">
                      vec<span className="text-accent-brand">trev</span>
                    </div>
                    <div className="text-[9px] mt-1 uppercase tracking-[0.22em] text-white/60">
                      Engineering Solutions
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
                Navigate
              </div>
              <nav className="flex flex-col px-3">
                {links.map((l, i) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-white/10 text-accent-brand" }}
                    inactiveProps={{ className: "text-white hover:bg-white/5" }}
                    className="group flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-semibold transition"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] text-white/40 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition" />
                  </Link>
                ))}
              </nav>

              <div className="px-6 mt-8 text-[10px] uppercase tracking-[0.22em] text-white/40">
                Take action
              </div>
              <div className="px-6 mt-4 grid gap-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-4 rounded-full shadow-accent hover:opacity-95 transition group"
                >
                  Request a Quote
                  <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
                </Link>
                <a
                  href="https://wa.me/916379608428?text=Hi%20VECTREV%2C%20I%27d%20like%20a%20consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur px-6 py-4 rounded-full text-white hover:bg-white/10 transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <a
                  href="tel:+916379608428"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur px-6 py-4 rounded-full text-white hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" /> +91 63796 08428
                </a>
              </div>

              <div className="px-6 mt-10 pt-6 border-t border-white/10 text-xs text-white/60 space-y-2 pb-10">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" /> info@vectrev.in
                </div>
                <div>61E/2D, TMC Colony, Polepettai · Thoothukudi 628002</div>
                <div className="text-white/40">CIN U71200TN2025PTC180169</div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
