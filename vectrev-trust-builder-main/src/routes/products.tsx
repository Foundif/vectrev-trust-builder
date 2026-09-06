import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";
import { KUSAM_MECO, productGroups } from "@/data/products";

const productGallery = [
  { src: "/site/arc-flash-suit.jpg", name: "Arc flash suit" },
  { src: "/site/insulating-mat.jpg", name: "Insulating mat" },
  { src: "/site/km-5213in-10kv.jpg", name: "KM 5213IN 10 kV insulation tester" },
  { src: "/site/km-clamp-meter.jpg", name: "KM clamp meter" },
  { src: "/site/km-digital-multimeter.jpg", name: "KM digital multimeter" },
  { src: "/site/km-earth-resistance-tester.jpg", name: "Earth resistance tester" },
  { src: "/site/km-insulation-tester-kit.jpg", name: "Insulation tester kit" },
  { src: "/site/km-ohm-6501e.jpg", name: "KM OHM 6501E insulation tester" },
  { src: "/site/safety-gloves.jpg", name: "Electrical safety gloves" },
];

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
  const [isProductRailPaused, setIsProductRailPaused] = useState(false);
  const productRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;

    const scroll = () => {
      const rail = productRailRef.current;
      if (rail && !isProductRailPaused) {
        const loopPoint = rail.scrollWidth / 2;
        rail.scrollLeft = rail.scrollLeft >= loopPoint ? 0 : rail.scrollLeft + 1;
      }
      frameId = window.requestAnimationFrame(scroll);
    };

    frameId = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frameId);
  }, [isProductRailPaused]);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Products we supply. <br />
            <span className="text-accent-brand">Built for dependable work.</span>
          </>
        }
        subtitle="We specialise in clampmeters, power measurement & control instruments, and power transducers. VECTREV is an authorised Kusam-Meco dealer serving project teams across the globe."
      />

      <section
        aria-labelledby="kusam-meco-heading"
        className="bg-background px-5 py-10 sm:px-8 sm:py-14"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#061426] lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-red-500">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {KUSAM_MECO.title}
            </p>
            <h2
              id="kusam-meco-heading"
              className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl"
            >
              Kusam-Meco products,{" "}
              <span className="text-accent-brand">supplied with confidence.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              From selection to delivery, we help you choose the right product category for testing,
              measurement and control work.
            </p>
            <ul className="mt-8 grid gap-4 text-sm font-medium text-white sm:grid-cols-2 sm:text-base">
              {[
                "Authorised Kusam-Meco dealership",
                "Product guidance for project needs",
                "Prompt response for enquiries",
                "Supply support across the globe",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-red-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="flex min-h-72 items-center justify-center bg-[#f5f1eb] p-6 sm:p-8">
            <img
              src={KUSAM_MECO.certificate}
              alt={KUSAM_MECO.certificateNote}
              className="h-auto max-h-72 w-auto max-w-full object-contain sm:max-h-80 lg:max-h-96"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section aria-label="Product categories" className="bg-[#f8f5f0] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
          {productGroups.map((group, index) => (
            <article
              key={group.slug}
              className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] md:min-h-64 md:grid-cols-2"
            >
              <div
                className={`relative min-h-56 overflow-hidden md:min-h-full ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
              >
                <img
                  src={group.image}
                  alt={group.title}
                  loading="lazy"
                  draggable="false"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className={`p-6 sm:p-8 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>
                <ul className="mt-4 grid gap-x-5 gap-y-2 text-xs leading-snug text-slate-600 sm:grid-cols-2">
                  {group.items.slice(0, index === 0 ? 6 : group.items.length).map((item) => (
                    <li key={item} className="flex gap-2">
                      <CircleCheck
                        className="mt-0.5 size-3.5 shrink-0 text-red-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex text-xs font-semibold text-red-500 hover:underline"
                >
                  Enquire about this range &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="product-images-heading"
        className="overflow-hidden bg-background py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-brand">
            Product gallery
          </p>
          <h2 id="product-images-heading" className="mt-3 text-3xl font-extrabold text-foreground">
            Products we supply
          </h2>
        </div>
        <div
          ref={productRailRef}
          onMouseEnter={() => setIsProductRailPaused(true)}
          onMouseLeave={() => setIsProductRailPaused(false)}
          className="mt-8 flex gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:gap-5 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {[...productGallery, ...productGallery].map((product, index) => (
            <figure
              data-product-image
              key={`${product.src}-${index}`}
              className="w-[calc((100vw-3.5rem)/2)] shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-[#f4f6f8] sm:w-[calc((100vw-6rem)/3)] lg:w-[calc((100vw-9rem)/5)]"
            >
              <img
                src={product.src}
                alt={product.name}
                loading="lazy"
                draggable="false"
                className="aspect-square w-full object-contain p-3 sm:p-4"
              />
              <figcaption className="border-t border-slate-100 bg-white px-3 py-2 text-center text-xs font-medium text-foreground sm:px-4">
                {product.name}
              </figcaption>
            </figure>
          ))}
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
