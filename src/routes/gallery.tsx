import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";
import controlPanel from "@/assets/control-panel.webp";
import substation from "@/assets/substation.webp";
import testKit from "@/assets/test-kit.webp";
import relay from "@/assets/relay.webp";
import cables from "@/assets/cables.webp";
import hvTest from "@/assets/hv-test.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Field Work & Commissioning | VECTREV" },
      {
        name: "description",
        content:
          "Real photos from VECTREV's field work: control panels, HV testing, substations, relays and on-site engineering.",
      },
      { property: "og:title", content: "VECTREV Gallery" },
      {
        property: "og:description",
        content: "Field work, on-site engineering and commissioning, captured honestly.",
      },
    ],
  }),
  component: Gallery,
});

const shots = [
  { src: controlPanel, label: "Control & Protection Panel", span: "md:col-span-2 md:row-span-2" },
  { src: substation, label: "EHV Substation · Commissioning", span: "" },
  { src: relay, label: "ABB REF601 Feeder Relay", span: "" },
  { src: testKit, label: "HV Test Kit · 70 kV AC / 80 kV DC", span: "md:col-span-2" },
  { src: "/site/vectrev-technician-ppe.jpg", label: "Workshop · Pre-commissioning", span: "" },
  { src: cables, label: "HV Cable Terminations", span: "" },
  { src: hvTest, label: "Field Test Setup", span: "md:col-span-2" },
];

function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % shots.length)), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + shots.length) % shots.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Real work. Real plants. <br />
            <span className="text-accent-brand">No stock photos.</span>
          </>
        }
        subtitle="A look at our engineers on site — control panels, HV testing, substations and the equipment we energise every week."
      />

      <section className="px-5 sm:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {shots.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative overflow-hidden rounded-2xl bg-card border border-border group text-left focus:outline-none focus:ring-2 focus:ring-accent ${s.span}`}
              aria-label={`Open ${s.label}`}
            >
              <img
                src={s.src}
                alt={s.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
              <figcaption className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white">
                {s.label}
              </figcaption>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={shots[index!].label}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white flex items-center justify-center transition"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="hidden sm:flex fixed left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white items-center justify-center transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white items-center justify-center transition"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={shots[index!].src}
                alt={shots[index!].label}
                className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
              />
              <figcaption className="text-white/90 text-sm sm:text-base font-medium text-center px-4">
                {shots[index!].label}
                <span className="ml-2 text-white/50">
                  · {index! + 1} / {shots.length}
                </span>
              </figcaption>

              <div className="sm:hidden flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous"
                  className="h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next"
                  className="h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <CTAStrip eyebrow="Want this on your site?" title="Let's plan your next commissioning." />
    </>
  );
}
