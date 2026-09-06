import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function CTAStrip({
  eyebrow = "Let's talk",
  title = "Avoid costly delays and safety risks.",
  subtitle = "Send us your scope. An engineer responds promptly with a clear plan, realistic timeline, and a no-nonsense quote.",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-5 sm:px-8 py-16">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-dark text-dark-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative p-10 md:p-16 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase tracking-[0.22em] text-white/60">{eyebrow}</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
              {title}
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl">{subtitle}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-4 rounded-full shadow-accent hover:opacity-95 transition group"
            >
              Request Consultation
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
            </Link>
            <a
              href="tel:+916379608428"
              className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur px-6 py-4 rounded-full text-white hover:bg-white/10 transition"
            >
              Call +91 63796 08428
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}