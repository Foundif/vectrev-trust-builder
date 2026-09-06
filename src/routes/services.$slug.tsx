import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, ArrowUpRight, ArrowLeft } from "lucide-react";
import { CTAStrip } from "@/components/CTAStrip";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { title: service.title, short: service.short };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — VECTREV" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} | VECTREV Engineering Solutions` },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.short },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: ServiceNotFound,
});

function ServiceNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="text-3xl font-extrabold text-foreground">Service not found</h1>
      <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-accent-brand font-semibold">
        <ArrowLeft className="h-4 w-4" /> All services
      </Link>
    </div>
  );
}

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = getService(slug);
  if (!service) return <ServiceNotFound />;

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="px-5 sm:px-8 pt-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-brand transition"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">
                {service.category}
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-crisp text-foreground leading-[1.08]">
                {service.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{service.intro}</p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-3.5 rounded-full shadow-accent glow-accent group"
              >
                Request a scope & quote
                <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <img
                src={service.image}
                alt={service.title}
                width={1280}
                height={720}
                className="rounded-3xl w-full h-[320px] object-cover shadow-card-premium"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-3xl bg-card border border-border p-8 shadow-card-premium">
            <h2 className="text-xl font-extrabold text-foreground">Scope of work</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {service.scope.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent-brand mt-0.5 flex-shrink-0" />
                  {x}
                </li>
              ))}
            </ul>

          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-dark text-dark-foreground p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-white/50">What you get</div>
              <ul className="mt-5 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 text-accent-brand mt-0.5 flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-card border border-border p-8 shadow-card-premium">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">FAQ</div>
              <div className="mt-5 space-y-5">
                {service.faqs.map((f) => (
                  <div key={f.q}>
                    <div className="font-semibold text-foreground text-sm">{f.q}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Related services
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/services/$slug"
                params={{ slug: r.slug }}
                className="group rounded-2xl border border-border bg-card p-5 hover:-translate-y-1 transition shadow-card-premium"
              >
                <div className="font-semibold text-foreground flex items-start gap-2">
                  {r.title}
                  <ArrowUpRight className="h-4 w-4 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        eyebrow="Next step"
        title="Send us the drawings. We'll send back a scope."
        subtitle="Prompt response with instrument list and manpower plan."
      />
    </>
  );
}
