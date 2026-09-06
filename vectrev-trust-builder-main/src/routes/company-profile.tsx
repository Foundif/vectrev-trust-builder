import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAStrip } from "@/components/CTAStrip";

const PROFILE_URL = "/resources/vectrev-company-profile-2025.pdf";

export const Route = createFileRoute("/company-profile")({
  head: () => ({
    meta: [
      { title: "Company Profile 2025 — Download PDF | VECTREV Engineering Solutions" },
      {
        name: "description",
        content:
          "View or download the official VECTREV Engineering Solutions Pvt Ltd company profile 2025 — services, instruments, completed projects in India and Cameroon, and 2025-26 plans.",
      },
      { property: "og:title", content: "VECTREV Company Profile 2025" },
      {
        property: "og:description",
        content: "Official corporate profile — engineering, testing, commissioning and power system studies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompanyProfile,
});

const highlights = [
  "Engineering, Testing, Commissioning and Power System Studies",
  "AIS switchyard, switchgear and GIS primary component T&C",
  "Protection relays, C&R panels and retrofitting",
  "Substation Automation System (SAS) commissioning",
  "ETAP load flow, short circuit and coordination studies",
  "LV & MV panel design and supply — PCC, MCC, PMCC, APFC",
  "225 kV substation projects executed in Cameroon",
  "Export orders processed to Gabon, Central Africa",
];

function CompanyProfile() {
  return (
    <>
      <PageHero
        eyebrow="Corporate profile"
        title={
          <>
            Energizing infrastructure <br />
            <span className="text-accent-brand">with intelligent solutions.</span>
          </>
        }
        subtitle="The complete VECTREV Engineering Solutions Pvt Ltd profile — capability, instruments, completed projects and 2025-26 plans. Read it here or download the PDF."
      />

      <section className="px-5 sm:px-8 pb-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          <a
            href={PROFILE_URL}
            download="VECTREV-Company-Profile-2025.pdf"
            className="inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground font-semibold px-6 py-3.5 rounded-full shadow-accent glow-accent"
          >
            <Download className="h-4 w-4" /> Download profile (PDF)
          </a>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-card font-semibold px-6 py-3.5 rounded-full text-foreground hover:bg-secondary transition"
          >
            <FileText className="h-4 w-4" /> Open in new tab
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border bg-card font-semibold px-6 py-3.5 rounded-full text-foreground hover:bg-secondary transition group"
          >
            Request a printed copy
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
          </Link>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-[2rem] overflow-hidden border border-border bg-card shadow-card-premium">
            <object data={PROFILE_URL} type="application/pdf" className="w-full h-[70vh] min-h-[520px]">
              <div className="p-10 text-center">
                <p className="text-muted-foreground">
                  Your browser can't display the PDF inline.
                </p>
                <a
                  href={PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-accent-brand font-semibold"
                >
                  <Download className="h-4 w-4" /> Open the company profile
                </a>
              </div>
            </object>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-[2rem] bg-dark text-dark-foreground p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-white/50">Inside the profile</div>
              <ul className="mt-5 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 text-accent-brand mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-card border border-border p-8 shadow-card-premium">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">Company details</div>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Entity</dt>
                  <dd className="font-semibold text-foreground">
                    VECTREV Engineering Solutions Private Limited
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">CIN</dt>
                  <dd className="font-semibold text-foreground">U71200TN2025PTC180169</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">GSTIN</dt>
                  <dd className="font-semibold text-foreground">33AALCV0745P1ZU</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-semibold text-foreground">info@vectrev.in</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd className="font-semibold text-foreground">+91 96004 49144</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <CTAStrip
        eyebrow="Vendor registration"
        title="Need our profile for vendor empanelment?"
        subtitle="We can share GST, CIN, bank details and past-performance certificates on request."
      />
    </>
  );
}
