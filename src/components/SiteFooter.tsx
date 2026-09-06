import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.webp";

export function SiteFooter() {
  return (
    <footer className="bg-dark text-dark-foreground mt-24 rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="VECTREV" className="h-10 w-10" />
              <div>
                <div className="font-extrabold text-2xl tracking-tight">
                  vec<span className="text-accent-brand">trev</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                  Engineering Solutions Pvt Ltd
                </div>
              </div>
            </div>
            <p className="mt-6 text-white/70 max-w-md leading-relaxed">
              Industrial electrical Testing & Commissioning, engineering
              consultancy and safety-compliant execution for plants across
              Tamil Nadu.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-3 rounded-full shadow-accent hover:opacity-95 transition group"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/50">Explore</div>
            <ul className="mt-5 space-y-3 text-white/80">
              {[
                ["/about", "About"],
                ["/products", "Products"],
                ["/services", "Services"],
                ["/gallery", "Gallery"],
                ["/company-profile", "Company Profile"],
                ["/branches", "Branches"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent-brand transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.22em] text-white/50">Contact</div>
            <ul className="mt-5 space-y-4 text-white/80 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-accent-brand" />
                <a href="tel:+916379608428" className="hover:text-white">+91 63796 08428</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-accent-brand" />
                <a href="mailto:info@vectrev.in" className="hover:text-white">info@vectrev.in</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent-brand" />
                <span>61E/2D, TMC Colony, Polepettai, Thoothukudi — 628002, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} VECTREV Engineering Solutions Pvt Ltd · CIN U71200TN2025PTC180169</div>
          <div>GSTIN 33AALCV0745P1ZU</div>
        </div>
      </div>
    </footer>
  );
}