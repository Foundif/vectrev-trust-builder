import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { catalogProducts, productGroups } from "@/data/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Electrical Panels & Safety Solutions | VECTREV" },
      {
        name: "description",
        content:
          "LV and MV electrical panels, metering and control panels, and electrical safety products for industrial, commercial and infrastructure projects.",
      },
      { property: "og:title", content: "VECTREV Products — Panels & Safety Solutions" },
      {
        property: "og:description",
        content: "Electrical panel solutions and practical safety products for project execution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const moveRail = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>("[data-product-card]");
    if (!rail || !card) return;

    const gap = Number.parseFloat(window.getComputedStyle(rail).gap) || 0;
    const step = card.offsetWidth + gap;
    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    const isAtStart = rail.scrollLeft <= 1;
    const isAtEnd = rail.scrollLeft >= maxScrollLeft - 1;

    const left = direction === 1
      ? (isAtEnd ? 0 : Math.min(rail.scrollLeft + step, maxScrollLeft))
      : (isAtStart ? maxScrollLeft : Math.max(rail.scrollLeft - step, 0));

    rail.scrollTo({ left, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isInteracting) return;
    const timer = window.setInterval(() => moveRail(1), 4500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isInteracting, moveRail]);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>Products we supply. <br /><span className="text-accent-brand">Built for dependable work.</span></>}
        subtitle="Authorised KUSAM-MECO dealer and electrical panel supplier for industrial, commercial and infrastructure projects."
      />

      <section aria-labelledby="product-categories" className="border-y border-border bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-brand">Our range</p>
          <h2 id="product-categories" className="mt-3 text-3xl font-extrabold text-foreground">Electrical products for every stage of the job</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {productGroups.map((group) => (
              <article key={group.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card-premium">
                <div className="h-40 bg-background p-4"><img src={group.image} alt={group.title} loading="lazy" className="h-full w-full object-contain" /></div>
                <div className="p-5"><h3 className="text-lg font-bold text-foreground">{group.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="product-catalog" className="w-full overflow-hidden py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-brand">Product catalogue</p><h2 id="product-catalog" className="mt-3 text-3xl font-extrabold text-foreground">KUSAM-MECO and VECTREV supply</h2></div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="icon" onClick={() => moveRail(-1)} aria-label="Previous products"><ChevronLeft /></Button>
              <Button type="button" variant="outline" size="icon" onClick={() => setIsAutoPlaying((value) => !value)} aria-label={isAutoPlaying ? "Pause product carousel" : "Play product carousel"}>{isAutoPlaying ? <Pause /> : <Play />}</Button>
              <Button type="button" variant="outline" size="icon" onClick={() => moveRail(1)} aria-label="Next products"><ChevronRight /></Button>
              <Button type="button" variant="outline" size="icon" onClick={() => moveRail(1)} aria-label="Scroll products right"><ChevronRight /></Button>
            </div>
          </div>
          <div
            ref={railRef}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={() => setIsInteracting(false)}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {catalogProducts.map((product) => (
              <article data-product-card key={product.slug} className="w-[min(78vw,300px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-card-premium">
                <div className="flex h-56 items-center justify-center bg-background p-5"><img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-contain" /></div>
                <div className="min-h-32 p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-brand">{product.category}</p><h3 className="mt-2 text-base font-bold leading-snug text-foreground">{product.title}</h3></div>
              </article>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Swipe or drag to browse the complete range.</p>
        </div>
      </section>

      <CTAStrip
        eyebrow="Panel enquiry"
        title="Share your SLD and load list."
        subtitle="We'll engineer, build and routine-test a panel to your exact requirement, with IS/IEC compliance documentation."
      />
    </>
  );
}
