import testKit from "@/assets/test-kit.webp";
import relay from "@/assets/relay.webp";
import cables from "@/assets/cables.webp";
import hvTest from "@/assets/hv-test.webp";
import substation from "@/assets/substation.webp";
import controlPanel from "@/assets/control-panel.webp";
import technician from "@/assets/technician.webp";
import blogSas from "@/assets/blog-sas.jpg";
import blogStudies from "@/assets/blog-power-studies.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  category: "Testing & Commissioning" | "Engineering & Studies" | "Products & Support";
  image: string;
  intro: string;
  legacyIntro?: string;
  scope: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "hv-lv-testing-commissioning",
    title: "Testing & Commissioning of HV & LV Equipment",
    short: "Pre-commissioning and commissioning of switchgear, switchyard, GIS and DC systems.",
    category: "Testing & Commissioning",
    image: testKit,
    legacyIntro:
      "We specialise in pre-commissioning testing and commissioning of electrical systems — from LV distribution boards right up to 225 kV switchyards. Every test is executed with calibrated Omicron and Megger instruments and closed out with traceable, audit-ready reports.",
    intro:
      "We specialise in pre-commissioning testing and commissioning of electrical systems \u2014 from LV distribution boards to high-voltage switchyards. Every test is performed using calibrated instruments.",
    scope: [
      "Testing and commissioning of switchgear equipment (LV / MV / HV)",
      "Testing and commissioning of AIS switchyard primary components",
      "Testing and commissioning of GIS equipment",
      "Testing and commissioning of DC systems, battery banks and UPS",
      "Energisation support, load trials and punch-list closure",
    ],
    outcomes: [
      "First-time-right energisation with no rework at charging",
      "Complete test record pack accepted by consultants and inspectorate",
      "Defects caught at pre-commissioning, not at load",
    ],
    faqs: [
      {
        q: "Which voltage levels do you cover?",
        a: "LV distribution through to 225 kV switchyards, including GIS. Our overseas projects include 225/90/33 kV substations in Cameroon.",
      },
      {
        q: "Are your instruments calibrated?",
        a: "Yes. We use Omicron CPC 100, CP TD1, CT Analyzer, SFRA, Megger EGIL 200 circuit breaker analysers and calibrated 5 kV / 1 kV insulation testers, with valid calibration certificates supplied on request.",
      },
    ],
  },
  {
    slug: "protection-relays-and-cr-panels",
    title: "Protection Relays, Control & Relay Panels",
    short: "Relay configuration, secondary injection, scheme checking and function testing.",
    category: "Testing & Commissioning",
    image: relay,
    legacyIntro:
      "Protection is where commissioning projects are won or lost. We verify the panel against the BOM, check the scheme end to end, configure and test the protection devices, and prove every trip and interlock before energisation.",
    intro:
      "We bring precision to protection commissioning\u2014verifying every scheme, validating every function, and proving every trip and interlock for reliable operation.",
    scope: [
      "BOM verification of the panels",
      "Scheme checking against approved drawings",
      "Configuration and testing of protection devices",
      "Secondary injection and stability checks",
      "Function check of the complete panel",
    ],
    outcomes: [
      "Verified protection settings and coordination",
      "Every trip path proven end to end",
      "Signed function-test records per bay",
    ],
    faqs: [
      {
        q: "Which relay makes do you work with?",
        a: "ABB, Siemens, Schneider, GE and Easun make numerical relays, tested with Omicron CPC 356 and Megger Sverker 750 kits.",
      },
    ],
  },
  {
    slug: "retrofitting-and-refurbishment",
    title: "Retrofitting & Refurbishment",
    short: "Upgrade legacy protection and control schemes with minimum outage time.",
    category: "Testing & Commissioning",
    image: cables,
    intro:
      "Ageing electromechanical protection can be modernised without replacing the whole panel. We engineer the upgraded scheme, swap the device and re-commission the bay inside a planned shutdown window.",
    scope: [
      "Upgradation of scheme for the proposed new device",
      "Dismantling of existing device and installation of new device",
      "Upgraded scheme checking",
      "New device configuration",
      "New device testing and commissioning",
    ],
    outcomes: [
      "Modern numerical protection on existing panels",
      "Outage windows respected",
      "As-built drawings updated and handed over",
    ],
    faqs: [
      {
        q: "Can you work inside a short shutdown?",
        a: "Yes. Scheme engineering and configuration are completed offline so that only the physical swap and proving happen during the outage.",
      },
    ],
  },
  {
    slug: "substation-automation-systems",
    title: "Substation Automation System (SAS) Commissioning",
    short: "Database, IED integration, HMI, gateway and load despatch communication.",
    category: "Testing & Commissioning",
    image: blogSas,
    intro:
      "We commission substation automation systems end to end — from database creation and Ethernet switch configuration to establishing communication with the load control centre and third-party systems.",
    scope: [
      "Database creation",
      "Ethernet switch configuration",
      "Testing of BCU / BCPU and PMU",
      "Integration of IEDs, metering devices and GPS",
      "HMI and gateway configuration",
      "Communication establishing to load control centres",
      "Integration to third-party systems",
      "FTP configuration",
      "Point-to-point testing",
    ],
    outcomes: [
      "Every point verified point-to-point from field to HMI",
      "Time-synchronised, reliable SCADA data",
      "Clean handover to O&M teams",
    ],
    faqs: [
      {
        q: "Do you handle IEC 61850 systems?",
        a: "Yes — IED integration, GOOSE verification, gateway mapping and point-to-point proving are part of our standard SAS scope.",
      },
    ],
  },
  {
    slug: "power-system-studies",
    title: "Design & Power System Studies",
    short: "Load flow, short circuit, harmonics, coordination and arc flash using ETAP.",
    category: "Engineering & Studies",
    image: blogStudies,
    intro:
      "Design decisions become expensive once steel is in the ground. Our studies team models the network in ETAP and gives you defendable numbers before procurement and after commissioning.",
    scope: [
      "Load flow, short circuit and power analysis",
      "Harmonic analysis and report generation using power analyzer",
      "Motor starting and generator stability studies",
      "Protection coordination and arc flash analysis",
      "Ground grid and switching transient studies",
      "Design software tools — ETAP Power Station",
    ],
    outcomes: [
      "Correctly rated equipment and cable sizes",
      "Coordinated, selective protection settings",
      "Arc flash labels and safe working boundaries",
    ],
    faqs: [
      {
        q: "What inputs do you need to start a study?",
        a: "Single line diagram, equipment ratings, cable schedule and utility fault level. We can also build the model from a site survey where drawings are missing.",
      },
    ],
  },
  {
    slug: "engineering-documentation",
    title: "Engineering Document Preparation",
    short: "Sizing calculations, cable schedules, layouts and SLDs.",
    category: "Engineering & Studies",
    image: hvTest,
    intro:
      "Documentation is a deliverable, not an afterthought. We prepare the calculations and drawings that consultants, OEMs and statutory authorities need to approve your installation.",
    scope: [
      "Design and sizing calculation of CT and PT",
      "Power and auxiliary transformer sizing calculations",
      "Power and control cable sizing calculations",
      "Power and control cable schedule preparations",
      "Layout drawings and SLD preparations",
    ],
    outcomes: [
      "Approval-ready calculation sets",
      "Consistent, drawing-controlled documentation",
      "Faster consultant and inspectorate sign-off",
    ],
    faqs: [
      {
        q: "Do you provide as-built documentation after commissioning?",
        a: "Yes. Red-lined field changes are incorporated and issued as as-built drawings with the final test report pack.",
      },
    ],
  },
  {
    slug: "electrical-panel-solutions",
    title: "Electrical Panel Solutions",
    short: "Design and supply of LV & MV panels — PCC, MCC, PMCC, APFC, LDB, PDB.",
    category: "Products & Support",
    image: controlPanel,
    intro:
      "We provide end-to-end design and supply of electrical panels tailored for industrial, commercial and infrastructure projects, built and tested to IS/IEC standards.",
    scope: [
      "Design and supply of LV and MV panels",
      "Supply of PCC, MCC, PMCC, APFC, LDB, PDB and custom-built panels",
      "Metering panels equipped with energy meters",
      "Panel upgrades, retrofitting and diagnostics",
      "Quality checks and compliance as per IS/IEC standards",
    ],
    outcomes: [
      "Panels that pass routine tests first time",
      "Documented compliance to IS/IEC",
      "Single point of responsibility from design to commissioning",
    ],
    faqs: [
      {
        q: "Do you supply custom-built panels?",
        a: "Yes. Share the SLD and load list and we will engineer, build and test a panel to your exact requirement.",
      },
    ],
  },
  {
    slug: "annual-maintenance-and-testing",
    title: "Annual Maintenance & Testing",
    short: "Planned preventive testing contracts for substations and plants.",
    category: "Products & Support",
    image: substation,
    intro:
      "Scheduled testing keeps protection dependable and insurers satisfied. We run annual maintenance testing contracts covering relays, transformers, breakers, earthing and DC systems.",
    scope: [
      "Annual protection relay maintenance testing",
      "Transformer and breaker condition testing",
      "Earth resistance and continuity testing",
      "Battery bank and DC system health checks",
      "Thermography surveys and defect reporting",
    ],
    outcomes: [
      "Fewer unplanned trips and outages",
      "Year-on-year trend data on asset condition",
      "Compliance evidence for audits and insurance",
    ],
    faqs: [
      {
        q: "Do you offer multi-site AMC?",
        a: "Yes. We run AMC contracts across multiple plants with a shared reporting format and scheduled visit calendar.",
      },
    ],
  },
  {
    slug: "consultancy-and-site-supervision",
    title: "Consultancy & Site Supervision",
    short: "Independent technical review and daily on-ground engineering supervision.",
    category: "Products & Support",
    image: technician,
    intro:
      "Where projects need technical depth on the ground, our engineers supervise installation and commissioning activities, coordinate OEMs and keep the schedule honest.",
    scope: [
      "Independent design and vendor review",
      "Site supervision of electrical and instrumentation works",
      "OEM and contractor coordination",
      "Quality plans, ITPs and milestone tracking",
      "Statutory liaison and compliance support",
    ],
    outcomes: [
      "Progress visibility with daily reporting",
      "Fewer interface gaps between contractors",
      "Statutory approvals achieved without rework",
    ],
    faqs: [
      {
        q: "Can you deploy engineers outside Tamil Nadu?",
        a: "Yes. We have executed supervision and commissioning assignments across India and in Cameroon, Central Africa.",
      },
    ],
  },
];

export const serviceCategories = [
  "Testing & Commissioning",
  "Engineering & Studies",
  "Products & Support",
] as const;

export const getService = (slug: string) => services.find((s) => s.slug === slug);
