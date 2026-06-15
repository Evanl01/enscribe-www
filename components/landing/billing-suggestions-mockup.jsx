"use client";

import { useEffect, useState } from "react";

/** Tweak billing copy and styling without touching layout code. */
export const BILLING_SUGGESTIONS_MOCKUP = {
  header: "Billing Suggestions",
  icd10Codes: [
    { code: "N18.32", description: "Chronic kidney disease, stage 3b" },
    {
      code: "I12.9",
      description:
        "Hypertensive chronic kidney disease with stage 1 through stage 4 CKD, or unspecified CKD",
    },
    { code: "R80.9", description: "Proteinuria, unspecified" },
  ],
  cpt: {
    code: "99214",
    description: "Office visit, established patient, moderate complexity",
    justification:
      "Extended HPI for CKD monitoring and symptom review; moderate MDM with BMP/eGFR interpretation, ACE inhibitor management, and renal dietitian referral coordination.",
  },
  animateTyping: true,
  typingIntervalMs: 42,
};

/** Card design canvas (width × height) */
export const BILLING_CANVAS = { width: 430, height: 455 };

/** Composite layout tweak — positive offsetX shifts right; offsetY shifts downward. */
export const BILLING_LAYOUT = { offsetX: 100, offsetY: 70 };

const SPACE = {
  headerY: "16px 18px 14px",
  body: "16px 20px 20px 18px",
  sectionGap: 16,
  listGap: 12,
  listTop: 12,
  listInset: 6,
  sectionPad: "9px 12px",
  sectionRadius: 6,
  cptInset: 16,
  cptTop: 12,
  labelTop: 12,
  bodyTop: 8,
  justificationPad: "10px 12px",
  justificationRadius: 6,
};

/** Matches scribe-note-mockup: accent #3166F7, labels #3C4C78, body #183278 */
const COLORS = {
  accent: "#3166F7",
  label: "#3C4C78",
  body: "#183278",
  muted: "rgba(60,76,120,0.68)",
  chevron: "rgba(60,76,120,0.45)",
  sectionBg: "rgba(24,50,120,0.045)",
  border: "rgba(24,50,120,0.1)",
  divider: "rgba(24,50,120,0.08)",
  headerBg: "rgba(49,102,247,0.06)",
  justificationBg: "rgba(24,50,120,0.03)",
};

const TYPE = {
  title: 16,
  section: 14,
  body: 14,
  supporting: 12,
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

function AccordionSectionHeader({ label }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: 8,
        backgroundColor: COLORS.sectionBg,
        borderRadius: SPACE.sectionRadius,
        padding: SPACE.sectionPad,
      }}
    >
      <ChevronDown />
      <span
        className="font-semibold uppercase tracking-wide"
        style={{
          fontSize: TYPE.section,
          color: COLORS.label,
          lineHeight: 1.2,
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CodeRow({ code, description }) {
  return (
    <li className="flex" style={{ gap: 8, paddingLeft: SPACE.listInset }}>
      <span style={{ marginTop: 2, flexShrink: 0 }}>
        <ChevronRight />
      </span>
      <p
        className="min-w-0 flex-1"
        style={{ fontSize: TYPE.body, lineHeight: 1.4, color: COLORS.body, margin: 0 }}
      >
        <span className="font-bold" style={{ color: COLORS.accent }}>{code}</span>
        <span> — {description}</span>
      </p>
    </li>
  );
}

export function BillingSuggestionsPanel({
  config = BILLING_SUGGESTIONS_MOCKUP,
  typedChars = null,
}) {
  const { header, icd10Codes, cpt } = config;
  const showTyping = typedChars !== null;
  const typedDescription = showTyping ? cpt.description.slice(0, typedChars) : cpt.description;

  return (
    <div
      className="overflow-hidden"
      style={{
        width: BILLING_CANVAS.width,
        height: BILLING_CANVAS.height,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 14px 32px rgba(11,26,71,0.16), 0 2px 6px rgba(11,26,71,0.05)",
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
        <div>
          <AccordionSectionHeader label="ICD-10 Codes" />
          <ul
            className="flex flex-col"
            style={{ gap: SPACE.listGap, margin: `${SPACE.listTop}px 0 0`, padding: `0 ${SPACE.listInset}px`, listStyle: "none" }}
          >
            {icd10Codes.map((item) => (
              <CodeRow key={item.code} code={item.code} description={item.description} />
            ))}
          </ul>
        </div>

        <div>
          <AccordionSectionHeader label="CPT" />
          <div style={{ marginTop: SPACE.cptTop, paddingLeft: SPACE.cptInset }}>
            {showTyping ? (
              <p
                style={{
                  position: "relative",
                  fontSize: TYPE.body,
                  lineHeight: 1.4,
                  color: COLORS.body,
                  margin: 0,
                }}
              >
                <span aria-hidden style={{ visibility: "hidden", display: "block" }}>
                  <span className="font-bold">{cpt.code}</span>
                  <span className="font-medium"> — {cpt.description}</span>
                </span>
                <span style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                  <span className="font-bold" style={{ color: COLORS.accent }}>{cpt.code}</span>
                  <span className="font-medium">
                    {" — "}
                    {typedDescription}
                    {typedChars < cpt.description.length ? (
                      <span className="scribe-note-cursor ml-px inline-block align-middle" aria-hidden />
                    ) : null}
                  </span>
                </span>
              </p>
            ) : (
              <p style={{ fontSize: TYPE.body, lineHeight: 1.4, color: COLORS.body, margin: 0 }}>
                <span className="font-bold" style={{ color: COLORS.accent }}>{cpt.code}</span>
                <span className="font-medium"> — {cpt.description}</span>
              </p>
            )}
            <div
              style={{
                marginTop: SPACE.labelTop,
                padding: SPACE.justificationPad,
                borderRadius: SPACE.justificationRadius,
                backgroundColor: COLORS.justificationBg,
                border: `1px solid ${COLORS.divider}`,
              }}
            >
              <p
                className="font-medium"
                style={{
                  margin: 0,
                  fontSize: TYPE.supporting,
                  color: COLORS.label,
                  lineHeight: 1.2,
                }}
              >
                Justification
              </p>
              <p
                className="font-normal"
                style={{
                  marginTop: SPACE.bodyTop,
                  fontSize: TYPE.supporting,
                  lineHeight: 1.45,
                  color: COLORS.muted,
                }}
              >
                {cpt.justification}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Billing suggestions card — typing animation on CPT description when used standalone. */
export function BillingSuggestionsMockup({ className = "", config = BILLING_SUGGESTIONS_MOCKUP }) {
  const [typedChars, setTypedChars] = useState(() =>
    config.animateTyping ? 0 : config.cpt.description.length,
  );

  useEffect(() => {
    if (!config.animateTyping) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedChars(config.cpt.description.length);
      return;
    }

    const fullLen = config.cpt.description.length;
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setTypedChars(count);
      if (count >= fullLen) window.clearInterval(id);
    }, config.typingIntervalMs);
    return () => window.clearInterval(id);
  }, [config]);

  return (
    <div className={className}>
      <BillingSuggestionsPanel
        config={config}
        typedChars={config.animateTyping ? typedChars : null}
      />
    </div>
  );
}
