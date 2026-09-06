import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";
import { services, serviceCategories } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Engineering Services — Testing, Commissioning & Studies | VECTREV" },
      {
        name: "description",
        content:
          "HV & LV testing and commissioning, protection relays, substation automation, ETAP power system studies, panels, AMC and site supervision by VECTREV Engineering Solutions.",
      },
      { property: "og:title", content: "VECTREV Engineering Services" },
      {
        property: "og:description",
        content: "Nine engineering disciplines across testing, commissioning, studies and panel solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Engineering, testing and <br />
            <span className="text-accent-brand">commissioning, end to end.</span>
          </>
        }
        subtitle="From pre-commissioning of a 225 kV switchyard to the supply of an APFC panel — scoped, executed and documented to the standard auditors, OEMs and statutory bodies expect."
      />

      {serviceCategories.map((cat) => (
        <section key={cat} className="px-5 sm:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">{cat}</div>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((s) => s.category === cat)
                .map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: 0.05 * i }}
                  >
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group block h-full rounded-3xl bg-card border border-border shadow-card-premium overflow-hidden hover:-translate-y-1 transition"
                    >
                      <div className="relative h-44">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h2 className="font-extrabold text-lg text-foreground leading-snug flex items-start gap-2">
                          {s.title}
                          <ArrowUpRight className="h-4 w-4 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition" />
                        </h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                        <ul className="mt-4 space-y-1.5">
                          {s.scope.slice(0, 3).map((x) => (
                            <li key={x} className="flex items-start gap-2 text-xs text-foreground/80">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent-brand mt-0.5 flex-shrink-0" />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      ))}

      <CTAStrip
        eyebrow="Scope your project"
        title="Tell us what you need. We'll come back with a plan."
        subtitle="Share the scope and we'll respond promptly."
      />
    </>
  );
}
