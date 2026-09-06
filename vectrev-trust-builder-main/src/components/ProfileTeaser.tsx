import { Link } from "@tanstack/react-router";
import { Download, FileText, ArrowUpRight } from "lucide-react";

const PROFILE_URL = "/resources/vectrev-company-profile-2026.pdf";

export function ProfileTeaser() {
  return (
    <section className="px-5 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-dark text-dark-foreground p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">Company profile 2026</div>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold heading-crisp leading-tight">
            Everything about VECTREV in one document.
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-3">
          <a
            href={PROFILE_URL}
            download="VECTREV-Company-Profile-2026.pdf"
            className="inline-flex items-center justify-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-3.5 rounded-full shadow-accent glow-accent"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <Link
            to="/company-profile"
            className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3.5 rounded-full font-semibold hover:bg-white/10 transition group"
          >
            <FileText className="h-4 w-4" /> View online
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
}
