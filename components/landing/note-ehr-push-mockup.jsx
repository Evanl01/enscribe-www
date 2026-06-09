"use client";

import { useEffect, useRef, useState } from "react";
import { SERIF } from "@/components/landing/constants";

/** Tweak note push copy and styling without touching layout code. */
export const NOTE_EHR_PUSH_MOCKUP = {
  patient: {
    initials: "AH",
    name: "Anya Harmon",
    timestamp: "Today, 2.30pm",
    noteType: "SOAP",
  },
  ehr: "Epic",
  expandedSection: {
    label: "Subjective",
    text: "Patient reports improved energy and fewer nocturnal urination episodes. Denies chest pain, SOB, or vision changes. Taking metformin 1000 mg BID with meals.",
  },
  collapsedSections: ["Objective", "Assessment", "Plan", "ICD-10 & CPT", "Patient Instructions"],
  animatePushButton: true,
  pushEmphasisDelayMs: 200,
};

/** Card design canvas width — height is content-driven */
export const NOTE_EHR_PUSH_CANVAS = { width: 420 };
export const NOTE_EHR_PUSH_MAX_WIDTH = 440;

const SPACE = {
  header: "12px 14px 11px",
  body: "10px 12px 14px",
  sectionGap: 6,
  sectionPad: "8px 10px",
  sectionRadius: 8,
};

const COLORS = {
  accent: "#3166F7",
  label: "#3C4C78",
  body: "#183278",
  muted: "rgba(60,76,120,0.55)",
  chevron: "rgba(60,76,120,0.45)",
  border: "rgba(24,50,120,0.1)",
  divider: "rgba(24,50,120,0.08)",
  avatarBg: "rgba(49,102,247,0.12)",
  badgeBg: "rgba(49,102,247,0.1)",
  sectionBorder: "rgba(24,50,120,0.12)",
};

const TYPE = {
  name: 15,
  meta: 11,
  badge: 10,
  section: 12.5,
  body: 11.5,
  button: 11,
};

function ChevronDown({ size = 8, color = COLORS.chevron }) {
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

function ChevronRight({ size = 7, color = COLORS.chevron }) {
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

function CloseIcon({ size = 10, color = COLORS.muted }) {
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M2 2l6 6M8 2L2 8"
        fill="none"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PushArrowIcon() {
  return (
    <svg viewBox="0 0 14 10" width={12} height={9} aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M1 5h10M7 1.5L11.5 5 7 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatientAvatar({ initials }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: 34,
        height: 34,
        backgroundColor: COLORS.avatarBg,
        color: COLORS.accent,
        fontSize: 11.5,
        letterSpacing: "0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

const PUSH_BUTTON_RADIUS = 8;

function PushToEhrButton({ ehr, emphasize = false, onPulseEnd }) {
  return (
    <div
      className={emphasize ? "inline-flex shrink-0 ehr-push-button-emphasis" : "inline-flex shrink-0"}
      style={{
        border: `1px solid ${COLORS.accent}`,
        borderRadius: PUSH_BUTTON_RADIUS,
        backgroundColor: COLORS.accent,
        overflow: "visible",
      }}
      aria-hidden
      onAnimationEnd={(event) => {
        if (event.animationName.includes("ehr-push-ring")) onPulseEnd?.();
      }}
    >
      <span
        className="flex items-center font-semibold text-white"
        style={{
          gap: 5,
          padding: "6px 10px",
          fontSize: TYPE.button,
          whiteSpace: "nowrap",
        }}
      >
        <PushArrowIcon />
        Push to EHR
      </span>
      <span
        className="flex items-center font-medium text-white"
        style={{
          gap: 4,
          padding: "6px 9px",
          borderLeft: "1px solid rgba(255,255,255,0.25)",
          fontSize: TYPE.button,
        }}
      >
        {ehr}
        <ChevronDown size={7} color="rgba(255,255,255,0.85)" />
      </span>
    </div>
  );
}

function ExpandedSection({ label, text }) {
  return (
    <div
      style={{
        border: `1px solid ${COLORS.sectionBorder}`,
        borderRadius: SPACE.sectionRadius,
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "7px 10px", borderBottom: `1px solid ${COLORS.divider}` }}
      >
        <div className="flex items-center" style={{ gap: 7 }}>
          <ChevronDown />
          <span className="font-semibold" style={{ fontSize: TYPE.section, color: COLORS.body }}>
            {label}
          </span>
        </div>
        <CloseIcon />
      </div>
      <div style={{ padding: "9px 10px 10px" }}>
        <p
          className="leading-snug"
          style={{
            margin: 0,
            paddingLeft: 10,
            borderLeft: `3px solid ${COLORS.accent}`,
            fontSize: TYPE.body,
            color: COLORS.body,
            lineHeight: 1.45,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function CollapsedSection({ label }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: "6px 2px" }}
    >
      <div className="flex items-center" style={{ gap: 7 }}>
        <ChevronRight />
        <span className="font-semibold" style={{ fontSize: TYPE.section, color: COLORS.body }}>
          {label}
        </span>
      </div>
      <CloseIcon />
    </div>
  );
}

export function NoteEhrPushPanel({ config = NOTE_EHR_PUSH_MOCKUP }) {
  const {
    patient,
    ehr,
    expandedSection,
    collapsedSections,
    animatePushButton = false,
    pushEmphasisDelayMs = 200,
  } = config;
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (!animatePushButton) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const id = window.setTimeout(() => setPulseActive(true), pushEmphasisDelayMs);
    return () => window.clearTimeout(id);
  }, [animatePushButton, pushEmphasisDelayMs]);

  return (
    <div
      style={{
        width: NOTE_EHR_PUSH_CANVAS.width,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between gap-3 border-b overflow-visible"
        style={{ borderColor: COLORS.divider, padding: SPACE.header }}
      >
        <div className="flex min-w-0 items-center" style={{ gap: 10 }}>
          <PatientAvatar initials={patient.initials} />
          <div className="min-w-0">
            <p
              className="truncate font-semibold leading-tight"
              style={{ ...SERIF, fontSize: TYPE.name, color: COLORS.body, margin: 0 }}
            >
              {patient.name}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center" style={{ gap: 6 }}>
              <span style={{ fontSize: TYPE.meta, color: COLORS.muted }}>{patient.timestamp}</span>
              <span
                className="rounded font-semibold uppercase tracking-wide"
                style={{
                  padding: "2px 6px",
                  fontSize: TYPE.badge,
                  color: COLORS.accent,
                  backgroundColor: COLORS.badgeBg,
                  letterSpacing: "0.04em",
                }}
              >
                {patient.noteType}
              </span>
            </div>
          </div>
        </div>
        <PushToEhrButton
          ehr={ehr}
          emphasize={pulseActive}
          onPulseEnd={() => setPulseActive(false)}
        />
      </div>

      <div className="flex flex-col" style={{ gap: SPACE.sectionGap, padding: SPACE.body }}>
        <ExpandedSection label={expandedSection.label} text={expandedSection.text} />
        {collapsedSections.map((label) => (
          <CollapsedSection key={label} label={label} />
        ))}
      </div>
    </div>
  );
}

/** Completed note with EHR push — scales to fit its container for the accordion visual. */
export function NoteEhrPushFeatureMockup({ className = "", config = NOTE_EHR_PUSH_MOCKUP }) {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [footprintHeight, setFootprintHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;

    const updateScale = () => {
      const { width } = container.getBoundingClientRect();
      const targetWidth = Math.min(width, NOTE_EHR_PUSH_MAX_WIDTH);
      setFootprintHeight(panel.offsetHeight);
      setScale(targetWidth / NOTE_EHR_PUSH_CANVAS.width);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    ro.observe(panel);
    return () => ro.disconnect();
  }, []);

  const renderedWidth = footprintHeight > 0 ? NOTE_EHR_PUSH_CANVAS.width * scale : undefined;
  const scaledHeight = footprintHeight > 0 ? footprintHeight * scale : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative m-0 w-full p-0 ${className}`.trim()}
      style={{
        maxWidth: NOTE_EHR_PUSH_MAX_WIDTH,
        width: renderedWidth,
        height: scaledHeight,
      }}
    >
      <div
        className="absolute left-0 top-0 m-0 p-0"
        style={{
          width: NOTE_EHR_PUSH_CANVAS.width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={panelRef}>
          <NoteEhrPushPanel config={config} />
        </div>
      </div>
    </div>
  );
}
