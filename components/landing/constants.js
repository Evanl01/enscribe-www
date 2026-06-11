export const SERIF = { fontFamily: "var(--font-source-serif), Georgia, serif" };

/** Abstract shapes — fixed to viewport so they stay visible during sticky scroll. */
export const QUOTES_TESTIMONIALS_BG_STYLE = {
  backgroundColor: "#F9FAFF",
  backgroundImage: [
    "radial-gradient(ellipse 340px 300px at 8% 18%, rgba(124, 157, 249, 0.22), transparent 72%)",
    "radial-gradient(circle 130px at 86% 22%, rgba(49, 102, 247, 0.18), transparent 70%)",
    "radial-gradient(ellipse 260px 180px at 42% 58%, rgba(124, 157, 249, 0.16), transparent 68%)",
    "radial-gradient(ellipse 240px 200px at 14% 82%, rgba(49, 102, 247, 0.14), transparent 70%)",
  ].join(", "),
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto",
  backgroundAttachment: "fixed",
};

/**
 * MOBILE-WIP — set to false (or delete MobileWipGate) when mobile landing is ready.
 * Grep: MOBILE_WIP_ENABLED
 */
export const MOBILE_WIP_ENABLED = true;

/** Post-hero section pulls up over the video; rounded top sits on the hero. */
export const HERO_SECTION_OVERLAP_PX = 140;
export const HERO_SECTION_TOP_RADIUS_PX = 60;

/** Desktop feature accordion — left list and right figure share this height. */
export const FEATURE_ACCORDION_PANEL_HEIGHT_PX = 640;

/** Inset around the right-column figure (replaces grid gap between columns). */
export const FEATURE_ACCORDION_FIGURE_GUTTER_PX = 32;

export const FEATURES = [
  {
    key: "ai-scribe",
    title: "AI scribe",
    blurb:
      "Turn patient conversations into clear, accurate notes — so you can focus on delivering excellent care.",
    label: "Active encounter capture",
    spec: "Screenshot/loop: live waveform, partial SOAP note populating as the visit progresses.",
    media: "mockup",
    mockupKey: "ambientScribe",
    imageAlt:
      "EnScribe SOAP note populating over an active recording with waveform",
  },
  {
    key: "ehr",
    title: "EHR integration",
    blurb:
      "Transfer notes to the EHR you already use with just one click — saving you time and frustration throughout the day.",
    label: "One-click push to EHR",
    spec: "Screenshot: completed note with “Send to EHR” button, connector chips (Epic, Athena, Elation placeholders).",
    media: "mockup",
    mockupKey: "noteEhrPush",
    imageAlt:
      "EnScribe completed SOAP note with one-click push to Epic EHR",
  },
  {
    key: "prep",
    title: "Visit prep",
    blurb:
      "Get clear patient summaries before the visit and quick clinical answers when questions come up.",
    label: "Pre-visit summary",
    spec: "Screenshot: patient card with history, problem list, last-visit recap, clinical Q&A panel.",
    media: "mockup",
    mockupKey: "visitPrep",
    imageAlt:
      "EnScribe visit prep chat with patient summary and suggested clinical follow-up prompts",
  },
  {
    key: "coding",
    title: "Coding & letters",
    blurb:
      "Reduce after-hours work by generating ICD-10 and CPT codes, patient instructions, referral letters, and more.",
    label: "ICD-10 / CPT + letters",
    spec: "Screenshot: suggested codes panel + drafted patient instructions / referral letter.",
    media: "mockup",
    mockupKey: "billingSuggestions",
    imageAlt:
      "EnScribe billing suggestions with ICD-10 and CPT codes overlaid by generated patient instructions and referral letters",
  },
];

export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    blurb: "Flexible AI scribe for limited patient volumes.",
    cta: "Try for free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    blurb: "Full suite of AI tools and integrations.",
    cta: "Try for free",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "All-in-one AI platform for your clinic.",
    cta: "Contact Sales",
    href: "/signup",
    highlight: false,
  },
];
