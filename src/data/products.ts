import controlPanel from "@/assets/control-panel.webp";
import blogPanels from "@/assets/blog-panels.jpg";
import lcrCalibrator from "@/assets/product-catalog/lcr-calibrator.jpg";
import primaryTesting from "@/assets/product-catalog/primary-testing.jpg";

export type ProductGroup = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  items: string[];
  photos?: { src: string; caption: string }[];
};

export type CatalogProduct = {
  slug: string;
  title: string;
  category: string;
  image: string;
};


export const KUSAM_MECO = {
  title: "Authorised KUSAM-MECO Dealer",
  blurb:
    "VECTREV Engineering Solutions Pvt Ltd is an authorised stockist for KUSAM-MECO electronic test and measuring instruments. Genuine instruments, manufacturer warranty, calibration support and on-site application guidance from practising commissioning engineers.",
  certificate: "/site/kusam-meco-authorisation.jpg",
  certificateNote:
    "Certificate of authorisation — authorised stockists for KUSAM-MECO electronic test & measuring instruments, financial year 2026-2027.",
};


export const productGroups: ProductGroup[] = [
  {
    slug: "kusam-meco-instruments",
    title: "KUSAM-MECO Test & Measuring Instruments",
    blurb:
      "As authorised KUSAM-MECO dealers we supply the complete range of electronic test and measuring instruments — from field multimeters to high-voltage diagnostic sets.",
    image: "/site/km-digital-multimeter.jpg",
    items: [
      "Professional grade digital multimeters",
      "Basic digital multimeters",
      "LCR meters",
      "Digital insulation resistance testers",
      "High voltage measuring instruments",
      "Discharge rod",
      "Digital micro ohm meter",
      "CT-PT analyser",
      "Infrared thermometers",
      "Cable fault pre-locator",
      "Calibrators",
      "Portable thermal imaging camera",
      "Power clampmeters",
      "Power measurement & control instruments",
      "Power transducers",
    ],
    photos: [
      { src: "/site/km-digital-multimeter.jpg", caption: "Professional digital multimeter" },
      { src: "/site/km-clamp-meter.jpg", caption: "KM 2775 digital clamp meter" },
      { src: "/site/km-earth-resistance-tester.jpg", caption: "Earth resistance & soil resistivity tester" },
      { src: "/site/km-insulation-tester-kit.jpg", caption: "Insulation tester kit" },
      { src: "/site/km-ohm-6501e.jpg", caption: "KM OHM 6501E insulation tester" },
      { src: "/site/km-5213in-10kv.jpg", caption: "KM 5213IN 10 kV insulation tester" },
    ],
  },
  {
    slug: "lv-mv-panels",
    title: "LV & MV Electrical Panels",
    blurb:
      "Designed, built and routine-tested to IS/IEC standards for industrial, commercial and infrastructure projects.",
    image: blogPanels,
    items: [
      "PCC — Power Control Centre",
      "MCC — Motor Control Centre",
      "PMCC — Power & Motor Control Centre",
      "APFC — Automatic Power Factor Correction",
      "LDB — Lighting Distribution Board",
      "PDB — Power Distribution Board",
      "Custom-built panels to client SLD",
    ],
  },
  {
    slug: "metering-and-control",
    title: "Metering & Control Panels",
    blurb:
      "Energy metering, control and relay panels with configured IEDs and communication to SCADA.",
    image: controlPanel,
    items: [
      "Metering panels with energy meters",
      "Control & relay panels (C&R)",
      "Annunciation and interlock panels",
      "Substation automation and gateway panels",
      "AMF and synchronising panels",
    ],
  },
  {
    slug: "primary-test-instruments",
    title: "Primary Testing Instruments",
    blurb: "Calibrated primary testing and diagnostic instruments deployed on every HV assignment.",
    image: "/site/primary-injection-test.jpg",
    items: [
      "CPC 100 — Omicron",
      "CP TD1 — Omicron",
      "CT Analyzer — Omicron",
      "Sweep Frequency Response Analyzer — Omicron",
      "Circuit Breaker Analyzer EGIL 200 — Megger",
      "Winding resistance measurement kit",
      "High potential (HiPot) testing set",
      "Primary test instruments — KUSAM-MECO (authorised dealer)",
    ],
  },
  {
    slug: "secondary-test-instruments",
    title: "Secondary Testing Instruments",
    blurb: "Relay and scheme proving instruments for protection commissioning and AMC.",
    image: "/site/secondary-injection.jpg",
    items: [
      "CPC 356 — Omicron",
      "Sverker 750 — Megger",
      "Secondary test instruments — KUSAM-MECO (authorised dealer)",
    ],
  },
  {
    slug: "basic-test-instruments",
    title: "Basic Testing Instruments",
    blurb: "Field measurement and diagnostic instruments carried by every commissioning team.",
    image: "/site/switchgear-testing.jpg",
    items: [
      "Digital earth resistance tester",
      "Digital multimeter",
      "Digital current clamp meter",
      "Digital leakage current clamp meter",
      "Insulation tester 5 kV and 1 kV",
      "Oil bath (BDV) kit",
      "Multifunction process calibrator",
    ],
  },
  {
    slug: "electrical-safety-products",
    title: "Electrical Safety Products",
    blurb:
      "Personal protective equipment and insulation products for live-line work and switching operations.",
    image: "/site/safety-gloves.jpg",
    items: [
      "Electrical insulating gloves",
      "Electrical insulating matting",
      "Arc flash protection suits",
      "Discharge rods and earthing sets",
      "Panel-front safety signage and PPE kits",
    ],
    photos: [
      { src: "/site/safety-gloves.jpg", caption: "Electrical insulating gloves" },
      { src: "/site/insulating-mat.jpg", caption: "Electrical insulating matting" },
      { src: "/site/arc-flash-suit.jpg", caption: "Arc flash protection suit" },
    ],
  },
];


export const catalogProducts: CatalogProduct[] = [
  { slug: "professional-grade-digital-multimeters", title: "Professional Grade Digital Multimeters", category: "KUSAM-MECO Test & Measuring Instruments", image: "/site/km-digital-multimeter.jpg" },
  { slug: "basic-digital-multimeters", title: "Basic Digital Multimeters", category: "KUSAM-MECO Test & Measuring Instruments", image: "/site/km-digital-multimeter.jpg" },
  { slug: "lcr-meters", title: "LCR Meters", category: "Basic Testing Instruments", image: lcrCalibrator },
  { slug: "digital-insulation-resistance-testers", title: "Digital Insulation Resistance Testers", category: "KUSAM-MECO Test & Measuring Instruments", image: "/site/km-insulation-tester-kit.jpg" },
  { slug: "high-voltage-measuring-instruments", title: "High Voltage Measuring Instruments", category: "Primary Testing Instruments", image: primaryTesting },
  { slug: "discharge-rod", title: "Discharge Rod", category: "Electrical Safety Products", image: "/site/arc-flash-suit.jpg" },
  { slug: "digital-micro-ohm-meter", title: "Digital Micro Ohm Meter", category: "KUSAM-MECO Test & Measuring Instruments", image: "/site/km-ohm-6501e.jpg" },
  { slug: "ct-pt-analyser", title: "CT-PT Analyser", category: "Primary Testing Instruments", image: primaryTesting },
  { slug: "infrared-thermometers", title: "Infrared Thermometers", category: "Basic Testing Instruments", image: lcrCalibrator },
  { slug: "cable-fault-pre-locator", title: "Cable Fault Pre-Locator", category: "Primary Testing Instruments", image: primaryTesting },
  { slug: "calibrators", title: "Calibrators", category: "Secondary Testing Instruments", image: lcrCalibrator },
  { slug: "portable-thermal-imaging-camera", title: "Portable Thermal Imaging Camera", category: "KUSAM-MECO Test & Measuring Instruments", image: lcrCalibrator },
  { slug: "power-clampmeters", title: "Power Clampmeters", category: "Basic Testing Instruments", image: "/site/km-clamp-meter.jpg" },
  { slug: "power-measurement-control", title: "Power Measurement & Control Instruments", category: "Secondary Testing Instruments", image: lcrCalibrator },
  { slug: "power-transducers", title: "Power Transducers", category: "Secondary Testing Instruments", image: lcrCalibrator },
];
