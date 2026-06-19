export const SERIF = { fontFamily: "var(--font-source-serif), Georgia, serif" };

/** Shared surface for post-hero white panels (feature accordion, specialties, etc.). */
export const LANDING_WHITE_SECTION_BG = "#ffffff";

/** Primary "Try for free" CTAs on the marketing landing page. */
export const LANDING_TRY_FOR_FREE_HREF = "/signup";

/** Full landing preview (no WIP gate on lower sections). */
export const LANDING_FULL_PREVIEW_HREF = "/landing-page";

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
export const MOBILE_WIP_ENABLED = false;

/** Post-hero section pulls up over the video; rounded top sits on the hero. */
export const HERO_SECTION_OVERLAP_PX = 140;

/** Hero "Scroll to explore" — in-page anchor + smooth-scroll offset. */
export const LANDING_FEATURES_ANCHOR_ID = "features";
export const LANDING_STICKY_HEADER_PX = 64;
/** Lifts the features anchor above the post-hero wrapper for a softer handoff. */
export const LANDING_FEATURES_SCROLL_LIFT_PX = 1;
export const HERO_SECTION_TOP_RADIUS_PX = 60;

/** Desktop feature accordion — fixed height for the right-column figure slot. */
export const FEATURE_ACCORDION_PANEL_HEIGHT_PX = 460;

/** Desktop accordion grid column split — left % / right % */
export const FEATURE_ACCORDION_COL_SPLIT = [42, 58];

/**
 * Desktop scroll path copy / visual split — responsive in feature-scroll-path.css:
 * 35/65 at 1024px, linear to 44/56 by 1200px, fixed 44/56 above.
 */
export const FEATURE_SCROLL_PATH_COL_SPLIT = [44, 56];

/**
 * Scroll-path mockup render target per mockupKey (< lg / lg), in px.
 * width/height define the box the mockup scales to fit (aspect ratio preserved).
 * Outer slot = these dimensions + FEATURE_SCROLL_PATH_VISUAL_PAD.
 */
export const FEATURE_SCROLL_PATH_MOCKUP_SIZES = {
  ambientScribe: { width: 450, height: 400, widthLg: 520, heightLg: 500 },
  noteEhrPush: { width: 500, height: 400, widthLg: 465, heightLg: 420 },
  visitPrep: { width: 500, height: 400, widthLg: 500, heightLg: 440 },
  billingSuggestions: { width: 500, height: 400, widthLg: 520, heightLg: 500 },
};

export function getFeatureScrollPathMockupSize(mockupKey) {
  return (
    FEATURE_SCROLL_PATH_MOCKUP_SIZES[mockupKey] ??
    FEATURE_SCROLL_PATH_MOCKUP_SIZES.noteEhrPush
  );
}

/** Room for mockup drop shadows in the visual column (px). */
export const FEATURE_SCROLL_PATH_VISUAL_PAD = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 12,
};

/** Outer slot = mockup render target box + pad. */
export function getFeatureScrollPathSlotSize(sizeMap, lg) {
  const mockupWidth = lg ? (sizeMap.widthLg ?? sizeMap.width) : sizeMap.width;
  const mockupHeight = lg ? (sizeMap.heightLg ?? sizeMap.height) : sizeMap.height;
  const pad = FEATURE_SCROLL_PATH_VISUAL_PAD;

  return {
    mockupWidth,
    mockupHeight,
    slotWidth: mockupWidth + pad.left + pad.right,
    slotHeight: mockupHeight + pad.top + pad.bottom,
  };
}

export const FEATURES = [
  {
    key: "ai-scribe",
    title: "AI scribe",
    blurb:
      "Transcribe patient visits into concise, accurate notes — so you can focus on delivering excellent care",
    label: "AI-powered transcription",
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
      "Propogate notes to your EHR with one click — it's simple and efficient.",
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
      "Get detailed patient summaries before each visit and instant answers to clinical questions when you need them.",
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
      "Eliminate after-hours work by generating ICD-10 and CPT codes, patient instructions, referral letters, and more.",
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
    blurb: "Get started with AI scribing and note generation at no cost.",
    cta: "Try for free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    blurb: "Unlimited AI scribe usage with powerful automation, templates, and EHR integrations.",
    cta: "Get started",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "Customized solutions for multi-provider practices.",
    cta: "Contact us",
    href: "/contact",
    highlight: false,
  },
];
