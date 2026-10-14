const brands = [
  { name: "Siemens", logo: "/clients/siemens.png" },
  { name: "L&T", logo: "/clients/lt.png" },
  { name: "BHEL", logo: "/clients/bhel.png" },
  { name: "Areva", logo: "/clients/areva.png" },
  { name: "Kusam-Meco", logo: "/clients/kusam-meco.png" },
  { name: "Petron", logo: "/clients/petron.png" },
  { name: "ABB", logo: "/clients/abb.png" },
  { name: "Schneider Electric", logo: "/clients/schneider.png" },
  { name: "OMICRON", logo: "/clients/omicron.png" },
  { name: "Megger", logo: "/clients/megger.png" },
  { name: "GE Grid Solutions", logo: "/clients/ge-grid.png" },
  { name: "Easun Reyrolle", logo: "/clients/easun-reyrolle.png" },
  { name: "Adani Renewables", logo: "/clients/adani-renewables.png" },
  { name: "NLC India Ltd", logo: "/clients/nlc-india.png" },
];


export function OemBrands({
  eyebrow = "OEM & technology partners",
  title = "We test, configure and commission equipment from the world's leading makers.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="px-5 sm:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">{eyebrow}</div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold heading-crisp text-foreground max-w-3xl leading-tight">
          {title}
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b) => (
            <div
              key={b.name}
              className="rounded-2xl bg-card border border-border shadow-card-premium h-24 flex items-center justify-center p-5"
            >
              <img
                src={b.logo}
                alt={`${b.name} logo`}
                loading="lazy"
                className="max-h-12 max-w-full object-contain"
              />
            </div>
          ))}
        </div>




        <p className="mt-6 text-sm text-muted-foreground max-w-2xl">
          Brand names and logos are the property of their respective owners and are shown to indicate
          equipment makes VECTREV has tested, configured or commissioned on client sites.
        </p>
      </div>
    </section>
  );
}
