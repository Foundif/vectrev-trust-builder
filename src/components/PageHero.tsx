export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="px-5 sm:px-8 pt-12 md:pt-20 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.22em] text-accent-brand">{eyebrow}</div>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.04]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}