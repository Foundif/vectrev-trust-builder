/**
 * Registry of every editable piece of copy / imagery on the public site.
 * The admin content editor renders this list; the site reads it through
 * `useSiteContent()` with the CMS override taking priority over the default.
 */
export type ContentField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "boolean";
  value?: string;
  image?: string;
};

export type ContentGroup = { group: string; fields: ContentField[] };

export const contentGroups: ContentGroup[] = [
  {
    group: "Site settings",
    fields: [
      {
        key: "settings.chat_enabled",
        label: "AI chat assistant enabled",
        type: "boolean",
        value: "true",
      },
      {
        key: "settings.chat_title",
        label: "Chat window title",
        type: "text",
        value: "VECTREV Assistant",
      },
    ],
  },
  {
    group: "Home — Hero",
    fields: [
      { key: "home.hero.eyebrow", label: "Eyebrow", type: "text", value: "Thoothukudi · Est. 2025" },
      { key: "home.hero.title_line1", label: "Headline line 1", type: "text", value: "Engineering" },
      { key: "home.hero.title_accent", label: "Headline accent word", type: "text", value: "Reliability" },
      { key: "home.hero.title_line2", label: "Headline line 2 (after accent)", type: "text", value: "Into" },
      { key: "home.hero.title_line3", label: "Headline line 3", type: "text", value: "Every Plant." },
      {
        key: "home.hero.subtitle",
        label: "Sub-headline",
        type: "textarea",
        value:
          "From testing to energisation, we ensure every system performs as designed — with confidence.",
      },
      { key: "home.hero.cta_primary", label: "Primary button", type: "text", value: "Get a Quote" },
      { key: "home.hero.cta_secondary", label: "Secondary button", type: "text", value: "Our Services" },
      { key: "home.hero.stat1_value", label: "Stat 1 value", type: "text", value: "50+" },
      { key: "home.hero.stat1_label", label: "Stat 1 label", type: "text", value: "Sites Commissioned" },
      { key: "home.hero.stat2_value", label: "Stat 2 value", type: "text", value: "2" },
      { key: "home.hero.stat2_label", label: "Stat 2 label", type: "text", value: "Countries Served" },
      {
        key: "home.hero.quote",
        label: "Review card quote",
        type: "textarea",
        value: "\"Professional, knowledgeable and easy to work with.\"",
      },
      { key: "home.hero.quote_author", label: "Review card author", type: "text", value: "— Verified Google review" },
      { key: "home.hero.image1", label: "Hero slide 1", type: "image", image: "/site/switchgear-testing.jpg" },
      { key: "home.hero.image2", label: "Hero slide 2", type: "image", image: "/site/substation-hv-work.jpg" },
      { key: "home.hero.image3", label: "Hero slide 3", type: "image", image: "/site/relay-panel-work.jpg" },
      { key: "home.hero.image4", label: "Hero slide 4", type: "image", image: "/site/primary-injection-test.jpg" },
      { key: "home.hero.image5", label: "Hero slide 5", type: "image", image: "/site/secondary-injection.jpg" },
      { key: "home.hero.image6", label: "Hero slide 6", type: "image", image: "/site/wind-substation.jpg" },
    ],
  },
  {
    group: "Home — Promise band",
    fields: [
      {
        key: "home.promise.title",
        label: "Promise headline",
        type: "textarea",
        value:
          "From testing to energisation, we ensure every system performs as designed—with confidence.",
      },
      { key: "home.promise.line1", label: "Pillar 1", type: "text", value: "Precision in testing." },
      { key: "home.promise.line2", label: "Pillar 2", type: "text", value: "Proven procedures." },
      { key: "home.promise.line3", label: "Pillar 3", type: "text", value: "Reliable results." },
    ],
  },
  {
    group: "Home — Clients & partners",
    fields: [
      { key: "home.clients.eyebrow", label: "Eyebrow", type: "text", value: "Clients & Partners" },
      { key: "home.clients.title", label: "Heading", type: "text", value: "Trusted by EPCs, OEMs & utilities" },
      {
        key: "home.clients.subtitle",
        label: "Sub-text",
        type: "textarea",
        value:
          "VECTREV works alongside global project builders, OEMs and consultants — delivering pre-commissioning, protection studies and HV field testing.",
      },
    ],
  },
  {
    group: "Home — The VECTREV standard",
    fields: [
      { key: "home.solution.eyebrow", label: "Eyebrow", type: "text", value: "The VECTREV standard" },
      {
        key: "home.solution.title",
        label: "Heading",
        type: "text",
        value: "An engineering partner that owns the outcome — not just the scope.",
      },
      {
        key: "home.solution.body",
        label: "Paragraph",
        type: "textarea",
        value:
          "Confidence begins long before energisation — with engineering excellence, technical precision and proven expertise. Our engineers stay on site until your system runs the way it was designed to.",
      },
      { key: "home.solution.bullet1", label: "Bullet 1", type: "text", value: "Ready for energisation — tested and prepared for a smooth start-up" },
      { key: "home.solution.bullet2", label: "Bullet 2", type: "text", value: "Complete test records — structured documentation for easy review" },
      { key: "home.solution.bullet3", label: "Bullet 3", type: "text", value: "Proven performance — systems verified for safe, reliable operation" },
      { key: "home.solution.bullet4", label: "Bullet 4", type: "text", value: "Compliance with IS / IEC / CEA standards" },
      { key: "home.solution.image", label: "Section image", type: "image", image: "/site/panel-testing-workshop.jpg" },
    ],
  },
  {
    group: "Home — Services",
    fields: [
      { key: "home.services.eyebrow", label: "Eyebrow", type: "text", value: "Our expertise" },
      { key: "home.services.title", label: "Heading", type: "text", value: "Featured Services" },
      {
        key: "home.services.subtitle",
        label: "Sub-text",
        type: "textarea",
        value: "Four engineering disciplines built around one promise: reliable power, every shift.",
      },
    ],
  },
  {
    group: "Home — Social proof & credentials",
    fields: [
      { key: "home.proof.eyebrow", label: "Testimonials eyebrow", type: "text", value: "Social proof" },
      {
        key: "home.proof.blurb",
        label: "Testimonials blurb",
        type: "textarea",
        value: "Plant owners and project managers choose VECTREV because we show up, document, and deliver.",
      },
      { key: "home.credentials.eyebrow", label: "Credentials eyebrow", type: "text", value: "Credentials & Certificates" },
      { key: "home.credentials.title", label: "Credentials heading", type: "text", value: "Recognised. Registered. Referenced." },
      {
        key: "home.credentials.subtitle",
        label: "Credentials sub-text",
        type: "textarea",
        value: "Statutory registrations and real client performance letters — click any card to open it full-screen.",
      },
    ],
  },
  {
    group: "About page",
    fields: [
      { key: "about.hero.eyebrow", label: "Eyebrow", type: "text", value: "About VECTREV" },
      { key: "about.hero.title", label: "Headline", type: "text", value: "Reliable plants start with" },
      { key: "about.hero.accent", label: "Headline accent", type: "text", value: "reliable commissioning." },
      {
        key: "about.hero.subtitle",
        label: "Sub-headline",
        type: "textarea",
        value:
          "Confidence begins long before energisation—with engineering excellence, technical precision, and proven expertise.",
      },
      { key: "about.intro.eyebrow", label: "Story eyebrow", type: "text", value: "Why we exist" },
      { key: "about.intro.title", label: "Story heading", type: "text", value: "Built on Precision. Driven by Reliability." },
      {
        key: "about.intro.body",
        label: "Story paragraph",
        type: "textarea",
        value:
          "VECTREV was founded to set a higher standard in electrical testing and commissioning—combining technical expertise, disciplined execution, and complete accountability on every project.",
      },
      {
        key: "about.intro.body2",
        label: "Story closing line",
        type: "textarea",
        value: "We don't just commission systems. We deliver confidence in every energisation.",
      },
      { key: "about.intro.image", label: "Story image", type: "image", image: "/site/engineer-laptop-panel.jpg" },
      { key: "about.values.title", label: "Values heading", type: "text", value: "Our values, on every site." },
    ],
  },
  {
    group: "Products page",
    fields: [
      { key: "products.hero.title", label: "Headline", type: "text", value: "Panels we build." },
      { key: "products.hero.accent", label: "Headline accent", type: "text", value: "Safety products we supply." },
      {
        key: "products.hero.subtitle",
        label: "Sub-headline",
        type: "textarea",
        value:
          "End-to-end design and supply of LV and MV electrical panels and electrical safety products for industrial, commercial and infrastructure projects.",
      },
      { key: "products.dealer.title", label: "Product banner heading", type: "text", value: "Panel & Safety Solutions" },
      {
        key: "products.dealer.body",
        label: "Dealer banner text",
        type: "textarea",
        value:
          "Practical electrical products designed to support safe, reliable and well-documented project execution.",
      },
      { key: "products.dealer.image", label: "Product image", type: "image", image: "/site/panel-testing-workshop.jpg" },
    ],
  },
  {
    group: "Services page",
    fields: [
      { key: "services.hero.title", label: "Headline", type: "text", value: "Precision in testing." },
      { key: "services.hero.accent", label: "Headline accent", type: "text", value: "Proven procedures. Reliable results." },
      {
        key: "services.hero.subtitle",
        label: "Sub-headline",
        type: "textarea",
        value:
          "Testing & commissioning, engineering studies and panel solutions — delivered by engineers who own the outcome.",
      },
    ],
  },
];

export const contentDefaults: Record<string, ContentField> = Object.fromEntries(
  contentGroups.flatMap((g) => g.fields.map((f) => [f.key, f])),
);
