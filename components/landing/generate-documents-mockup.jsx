"use client";

/** Tweak document copy and styling without touching layout code. */
export const GENERATE_DOCUMENTS_MOCKUP = {
  header: "Generate Documents",
  sections: [
    {
      key: "patient-instructions",
      title: "Patient Instructions",
      status: "Ready to review",
      statusTone: "review",
      expanded: true,
      showCopy: true,
      body: [
        "Dear Anya,",
        "It was good to see you today for your kidney follow-up. We reviewed your recent labs — your eGFR is stable at 42 mL/min and potassium is within range.",
        "Please continue lisinopril 10 mg daily. Avoid NSAIDs (ibuprofen, naproxen). Follow a low-sodium diet (<2,000 mg/day) and limit fluids to 1.5 L per day as discussed.",
        "Repeat BMP and urine albumin in 4 weeks. Call the office if you notice leg swelling, decreased urine output, or blood pressure readings above 150/90.",
        "Sincerely,\nDr. Patel",
      ],
    },
    {
      key: "referral-letter",
      title: "Referral letter",
      status: "Complete",
      statusTone: "complete",
      expanded: false,
    },
    {
      key: "lmn",
      title: "Letter of Medical Necessity",
      status: "Draft",
      statusTone: "draft",
      expanded: false,
    },
  ],
  actions: [
    "Renal dietitian referral",
    "Medical leave extension",
    "Caregiver note",
    "Other",
  ],
};

/** Card design canvas width — height is content-driven */
export const DOCS_CANVAS = { width: 470 };

const SPACE = {
  headerY: "13px 14px 12px",
  body: "11px 12px 12px",
  sectionGap: 10,
  contentPad: "10px 11px",
  contentRadius: 6,
  chipGap: 7,
  chipPad: "5px 10px",
};

/** Matches billing-suggestions-mockup palette */
const COLORS = {
  accent: "#3166F7",
  label: "#3C4C78",
  body: "#183278",
  chevron: "rgba(60,76,120,0.45)",
  border: "rgba(24,50,120,0.1)",
  divider: "rgba(24,50,120,0.08)",
  headerBg: "rgba(49,102,247,0.06)",
  contentBorder: "rgba(24,50,120,0.12)",
  chipBorder: "rgba(124,157,249,0.65)",
  chipBg: "rgba(249,250,255,0.9)",
  copy: "rgba(60,76,120,0.7)",
};

const STATUS = {
  review: { bg: "rgba(49,102,247,0.1)", text: "#3166F7" },
  complete: { bg: "rgba(34,197,94,0.12)", text: "#16A34A" },
  draft: { bg: "rgba(24,50,120,0.06)", text: "rgba(60,76,120,0.75)" },
};

const TYPE = {
  title: 18,
  section: 14,
  body: 14,
  label: 12,
  chip: 12,
};

function ChevronDown({ size = 9, color = COLORS.chevron }) {
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M2 3.5L5 6.5L8 3.5"
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ size = 8, color = COLORS.chevron }) {
  return (
    <svg viewBox="0 0 8 10" width={size} height={size} aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M1.5 1.5L5.5 5L1.5 8.5"
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon({ size = 11, color = COLORS.copy }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} aria-hidden style={{ flexShrink: 0 }}>
      <rect
        x="4"
        y="1.5"
        width="6.5"
        height="7.5"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
      />
      <path
        d="M2.5 4.5H2C1.17 4.5 0.5 5.17 0.5 6v4.5C0.5 11.33 1.17 12 2 12h4.5c0.83 0 1.5-0.67 1.5-1.5v-0.5"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusBadge({ label, tone }) {
  const style = STATUS[tone] ?? STATUS.draft;
  return (
    <span
      className="shrink-0 font-semibold"
      style={{
        fontSize: TYPE.label,
        color: style.text,
        backgroundColor: style.bg,
        borderRadius: 999,
        padding: "2px 6px",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function DocumentSection({ section }) {
  const { title, status, statusTone, expanded, showCopy, body } = section;

  return (
    <div>
      <div
        className="flex items-center"
        style={{
          gap: 6,
          padding: "4px 0",
        }}
      >
        {expanded ? <ChevronDown /> : <ChevronRight />}
        <span
          className="min-w-0 flex-1 font-semibold"
          style={{ fontSize: TYPE.section, color: COLORS.body, lineHeight: 1.2 }}
        >
          {title}
        </span>
        <StatusBadge label={status} tone={statusTone} />
        {showCopy ? (
          <span className="flex shrink-0 items-center" style={{ gap: 3, color: COLORS.copy }}>
            <CopyIcon />
            <span style={{ fontSize: TYPE.label, fontWeight: 600 }}>Copy</span>
          </span>
        ) : null}
      </div>

      {expanded && body?.length ? (
        <div
          style={{
            marginTop: 8,
            border: `1px solid ${COLORS.contentBorder}`,
            borderRadius: SPACE.contentRadius,
            padding: SPACE.contentPad,
            backgroundColor: "#ffffff",
          }}
        >
          {body.map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: index === 0 ? 0 : "8px 0 0",
                fontSize: TYPE.body,
                lineHeight: 1.45,
                color: COLORS.body,
                whiteSpace: "pre-line",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function GenerateDocumentsPanel({ config = GENERATE_DOCUMENTS_MOCKUP }) {
  const { header, sections, actions } = config;

  return (
    <div
      style={{
        width: DOCS_CANVAS.width,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="border-b"
        style={{
          borderColor: COLORS.divider,
          backgroundColor: COLORS.headerBg,
          padding: SPACE.headerY,
        }}
      >
        <p
          className="font-extrabold uppercase"
          style={{
            fontSize: TYPE.title,
            color: COLORS.accent,
            margin: 0,
            letterSpacing: "0.09em",
          }}
        >
          {header}
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: SPACE.sectionGap, padding: SPACE.body }}>
        {sections.map((section) => (
          <DocumentSection key={section.key} section={section} />
        ))}

        <div className="flex flex-wrap" style={{ gap: SPACE.chipGap, marginTop: 4 }}>
          {actions.map((label) => (
            <span
              key={label}
              className="font-medium"
              style={{
                fontSize: TYPE.chip,
                color: COLORS.label,
                backgroundColor: COLORS.chipBg,
                border: `1px dashed ${COLORS.chipBorder}`,
                borderRadius: 999,
                padding: SPACE.chipPad,
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
