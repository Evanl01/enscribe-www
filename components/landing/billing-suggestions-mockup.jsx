"use client";

import { useEffect, useRef, useState } from "react";
import {
  DOCS_CANVAS,
  GenerateDocumentsPanel,
} from "@/components/landing/generate-documents-mockup";

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
};

/** Card design canvas width — height is content-driven */
export const BILLING_CANVAS = { width: 490 };
export const BILLING_MAX_WIDTH = 450;

const SPACE = {
  headerY: "13px 14px 12px",
  body: "11px 12px 12px",
  sectionGap: 11,
  listGap: 8,
  sectionPad: "6px 9px",
  sectionRadius: 6,
};

/** Matches scribe-note-mockup: accent #3166F7, labels #3C4C78, body #183278 */
const COLORS = {
  accent: "#3166F7",
  label: "#3C4C78",
  body: "#183278",
  chevron: "rgba(60,76,120,0.45)",
  sectionBg: "rgba(24,50,120,0.045)",
  border: "rgba(24,50,120,0.1)",
  divider: "rgba(24,50,120,0.08)",
  headerBg: "rgba(49,102,247,0.06)",
};

const TYPE = {
  title: 18,
  section: 14,
  body: 14,
  label: 12,
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
        gap: 6,
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
    <li className="flex" style={{ gap: 6, paddingLeft: 6 }}>
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

export function BillingSuggestionsPanel({ config = BILLING_SUGGESTIONS_MOCKUP }) {
  const { header, icd10Codes, cpt } = config;

  return (
    <div
      style={{
        width: BILLING_CANVAS.width,
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
            style={{ gap: SPACE.listGap, margin: "8px 0 0", padding: "0 4px", listStyle: "none" }}
          >
            {icd10Codes.map((item) => (
              <CodeRow key={item.code} code={item.code} description={item.description} />
            ))}
          </ul>
        </div>

        <div>
          <AccordionSectionHeader label="CPT" />
          <div style={{ marginTop: 8, paddingLeft: 12 }}>
            <p style={{ fontSize: TYPE.body, lineHeight: 1.4, color: COLORS.body, margin: 0 }}>
              <span className="font-bold" style={{ color: COLORS.accent }}>{cpt.code}</span>
              <span> — {cpt.description}</span>
            </p>
            <p
              className="font-semibold uppercase tracking-wide"
              style={{
                marginTop: 9,
                fontSize: TYPE.label,
                color: COLORS.label,
                letterSpacing: "0.05em",
              }}
            >
              Justification
            </p>
            <p
              style={{
                marginTop: 5,
                fontSize: TYPE.body,
                lineHeight: 1.42,
                color: COLORS.body,
              }}
            >
              {cpt.justification}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Composite layout — billing card sits bottom-right over generate documents */
const BILLING_LAYOUT = { offsetX: 120, offsetY: 20 };

const FEATURE_CANVAS = {
  width: Math.max(BILLING_CANVAS.width, DOCS_CANVAS.width + 24),
};

/** Grows when positive offsetX pushes billing past the right edge */
const FEATURE_LAYOUT_WIDTH =
  FEATURE_CANVAS.width + Math.max(0, BILLING_LAYOUT.offsetX);

/** Billing + generate-documents overlay for the Coding & letters accordion visual. */
export function BillingSuggestionsFeatureMockup({ className = "" }) {
  const containerRef = useRef(null);
  const billingRef = useRef(null);
  const docsRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [footprintHeight, setFootprintHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const billing = billingRef.current;
    const docs = docsRef.current;
    if (!container || !billing || !docs) return;

    const updateScale = () => {
      const { width } = container.getBoundingClientRect();
      const targetWidth = Math.min(width, BILLING_MAX_WIDTH + 40);
      const billingHeight = billing.offsetHeight;
      const docsHeight = docs.offsetHeight;
      const billingTop = docsHeight + BILLING_LAYOUT.offsetY - billingHeight;
      setFootprintHeight(Math.max(docsHeight, billingTop + billingHeight));
      setScale(targetWidth / FEATURE_LAYOUT_WIDTH);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    ro.observe(billing);
    ro.observe(docs);
    return () => ro.disconnect();
  }, []);

  const renderedWidth = footprintHeight > 0 ? FEATURE_LAYOUT_WIDTH * scale : undefined;
  const scaledHeight = footprintHeight > 0 ? footprintHeight * scale : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative m-0 w-full p-0 ${className}`.trim()}
      style={{
        maxWidth: BILLING_MAX_WIDTH + 40,
        width: renderedWidth,
        height: scaledHeight,
      }}
    >
      <div
        className="absolute left-0 top-0 m-0 p-0"
        style={{
          width: FEATURE_LAYOUT_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative overflow-visible"
          style={{ width: FEATURE_LAYOUT_WIDTH, height: footprintHeight || undefined }}
        >
          <div ref={docsRef} className="absolute left-0 top-0" style={{ zIndex: 1 }}>
            <GenerateDocumentsPanel />
          </div>

          <div
            ref={billingRef}
            className="absolute"
            style={{
              right: -BILLING_LAYOUT.offsetX,
              bottom: -BILLING_LAYOUT.offsetY,
              zIndex: 2,
            }}
          >
            <BillingSuggestionsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
