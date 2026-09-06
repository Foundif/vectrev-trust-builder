import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";
import { branches } from "@/data/branches";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Our Branches & Locations | VECTREV Engineering Solutions" },
      {
        name: "description",
        content:
          "VECTREV offices and deployment locations — Thoothukudi operating and registered offices, Chennai project desk, pan-India mobile teams and overseas assignments in Cameroon.",
      },
      { property: "og:title", content: "VECTREV Branches & Locations" },
      { property: "og:description", content: "Where our engineering teams are based and deployed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Branches,
});

function Branches() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title={
          <>
            Based in Thoothukudi. <br />
            <span className="text-accent-brand">Deployed across the globe.</span>
          </>
        }
        subtitle="Our commissioning teams travel. Below are our registered and operating offices, our project coordination desks and the regions where we have executed assignments."
      />

      <section className="px-5 sm:px-8 pb-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              className="rounded-3xl bg-card border border-border shadow-card-premium overflow-hidden flex flex-col"
            >
              <div className="p-7 flex-1">
                <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-accent-brand" />
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-widest text-accent-brand font-semibold">
                  {b.type}
                </div>
                <h2 className="mt-2 text-lg font-extrabold text-foreground leading-snug">{b.name}</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 text-accent-brand flex-shrink-0" />
                    <span>{b.address}</span>
                  </div>
                  {b.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 hover:text-accent-brand transition"
                    >
                      <Phone className="h-4 w-4 text-accent-brand flex-shrink-0" />
                      {p}
                    </a>
                  ))}
                  <a
                    href={`mailto:${b.email}`}
                    className="flex items-center gap-2.5 hover:text-accent-brand transition break-all"
                  >
                    <Mail className="h-4 w-4 text-accent-brand flex-shrink-0" />
                    {b.email}
                  </a>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center text-sm font-semibold py-3.5 bg-secondary text-foreground hover:bg-accent/10 hover:text-accent-brand transition"
              >
                View on Google Maps
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-8">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-border shadow-card-premium">
          <iframe
            title="VECTREV Thoothukudi office location"
            src="https://www.google.com/maps?q=Polepettai%2C%20Thoothukudi%20628002%2C%20Tamil%20Nadu&output=embed"
            className="w-full h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <CTAStrip
        eyebrow="Site mobilisation"
        title="Not in this list? We still travel."
        subtitle="Share your site location and shutdown window — we'll confirm mobilisation feasibility and cost."
      />
    </>
  );
}
