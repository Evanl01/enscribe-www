export const SERIF = { fontFamily: "var(--font-source-serif), Georgia, serif" };

/** Post-hero section pulls up over the video; rounded top sits on the hero. */
export const HERO_SECTION_OVERLAP_PX = 140;
export const HERO_SECTION_TOP_RADIUS_PX = 60;

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
    name: "Starter",
    monthly: "$39",
    annual: "$39",
    blurb: "Flexible AI scribe for limited patient volumes.",
    cta: "Try for free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Core",
    monthly: "$79",
    annual: "$79",
    blurb: "The best AI scribe for individual clinicians.",
    cta: "Try for free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Premier",
    monthly: "$119",
    annual: "$104",
    blurb: "Full suite of AI tools and integrations.",
    cta: "Try for free",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Groups",
    monthly: "Custom",
    annual: "Custom",
    blurb: "All-in-one AI platform for your clinic.",
    cta: "Talk to sales",
    href: "/signup",
    highlight: false,
  },
];
