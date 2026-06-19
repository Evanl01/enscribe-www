"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMockupPulseAnimation } from "@/components/landing/use-mockup-play-animation";
import { SERIF } from "@/components/landing/constants";
import { computeContainedScale, mockupViewports } from "@/components/landing/mockup-scale";
import "./note-ehr-push-mockup.css";

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
    text: "Reports recurrent bilateral ankle swelling by evening, home BP readings ~148/92, and foamy urine over the past week.",
  },
  collapsedSections: ["Objective", "Assessment", "Plan", "ICD-10 & CPT", "Patient Instructions"],
  animatePushButton: true,
  pushEmphasisDelayMs: 200,
};

/** Card design canvas (width × height) */
export const NOTE_EHR_PUSH_CANVAS = { width: 580, height: 500 };
export const NOTE_EHR_PUSH_MAX_WIDTH = 440;

const { viewport: NOTE_EHR_PUSH_VIEWPORT } = mockupViewports(NOTE_EHR_PUSH_CANVAS);

const SPACE = {
  header: "14px 14px 13px",
  body: "10px 12px 14px",
  sectionGap: 8,
  sectionPad: "8px 10px",
  collapsedSectionPad: "9px 2px",
  nameMetaGap: 7,
  nameRowMinHeight: 38,
  nameAvatarGap: 10,
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
};

const AVATAR_SIZE = 34;

const TYPE = {
  title: 20,
  meta: 16,
  badge: 15,
  avatar: 16,
  sectionLabel: 18,
  sectionBody: 18,
  pushMain: 19,
  pushEhr: 16,
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

function PushArrowIcon({ width = 12, height = 9 }) {
  return (
    <svg viewBox="0 0 14 10" width={width} height={height} aria-hidden style={{ flexShrink: 0 }}>
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
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        backgroundColor: COLORS.avatarBg,
        color: COLORS.accent,
        fontSize: TYPE.avatar,
        letterSpacing: "0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

const PUSH_BUTTON_RADIUS = 8;

/** Split push button — primary label leads; EHR segment stays secondary. */
const PUSH_BUTTON = {
  fontSizeMain: TYPE.pushMain,
  fontSizeEhr: TYPE.pushEhr,
  padMain: "11px 15px",
  padEhr: "11px 11px",
  gapMain: 6,
  gapEhr: 5,
  arrow: { width: 15, height: 11 },
  chevron: 7,
};

function PushToEhrButton({ ehr, emphasize = false, onPulseEnd }) {
  return (
    <div
      className={
        emphasize
          ? "flex shrink-0 items-stretch note-ehr-push-button-emphasis"
          : "flex shrink-0 items-stretch"
      }
      style={{
        border: `1px solid ${COLORS.accent}`,
        borderRadius: PUSH_BUTTON_RADIUS,
        backgroundColor: COLORS.accent,
        overflow: "visible",
      }}
      aria-hidden
      onAnimationEnd={(event) => {
        if (event.animationName.includes("note-ehr-push-ring")) onPulseEnd?.();
      }}
    >
      <span
        className="flex items-center font-bold text-white"
        style={{
          gap: PUSH_BUTTON.gapMain,
          padding: PUSH_BUTTON.padMain,
          fontSize: PUSH_BUTTON.fontSizeMain,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        <PushArrowIcon
          width={PUSH_BUTTON.arrow.width}
          height={PUSH_BUTTON.arrow.height}
        />
        Push to EHR
      </span>
      <span
        className="flex items-center font-medium text-white"
        style={{
          gap: PUSH_BUTTON.gapEhr,
          padding: PUSH_BUTTON.padEhr,
          borderLeft: "1px solid rgba(255,255,255,0.25)",
          fontSize: PUSH_BUTTON.fontSizeEhr,
        }}
      >
        {ehr}
        <ChevronDown size={PUSH_BUTTON.chevron} color="rgba(255,255,255,0.85)" />
      </span>
    </div>
  );
}

function ExpandedSection({ label, text }) {
  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ padding: "7px 10px" }}
      >
        <div className="flex items-center" style={{ gap: 7 }}>
          <ChevronDown />
          <span className="font-semibold" style={{ fontSize: TYPE.sectionLabel, color: COLORS.body }}>
            {label}
          </span>
        </div>
        <CloseIcon />
      </div>
      <div style={{ padding: "0 10px 10px" }}>
        <p
          className="leading-snug"
          style={{
            margin: 0,
            paddingLeft: 10,
            borderLeft: `3px solid ${COLORS.accent}`,
            fontSize: TYPE.sectionBody,
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
      style={{ padding: SPACE.collapsedSectionPad }}
    >
      <div className="flex items-center" style={{ gap: 7 }}>
        <ChevronRight />
        <span className="font-semibold" style={{ fontSize: TYPE.sectionLabel, color: COLORS.body }}>
          {label}
        </span>
      </div>
      <CloseIcon />
    </div>
  );
}

export function NoteEhrPushPanel({ config = NOTE_EHR_PUSH_MOCKUP, playAnimations }) {
  const {
    patient,
    ehr,
    expandedSection,
    collapsedSections,
    animatePushButton = false,
    pushEmphasisDelayMs = 200,
  } = config;
  const pulseTrigger = useMockupPulseAnimation({
    animate: animatePushButton,
    playAnimations,
    delayMs: pushEmphasisDelayMs,
  });
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (pulseTrigger) setPulseActive(true);
    else setPulseActive(false);
  }, [pulseTrigger]);

  return (
    <div
      className="overflow-visible"
      style={{
        width: NOTE_EHR_PUSH_CANVAS.width,
        height: NOTE_EHR_PUSH_CANVAS.height,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="grid border-b overflow-visible"
        style={{
          borderColor: COLORS.divider,
          padding: SPACE.header,
          gridTemplateColumns: "1fr auto",
          gridTemplateRows: "auto auto",
          columnGap: 12,
          rowGap: SPACE.nameMetaGap,
        }}
      >
        <div
          className="flex min-w-0 items-center"
          style={{
            gridColumn: 1,
            gridRow: 1,
            gap: SPACE.nameAvatarGap,
            minHeight: SPACE.nameRowMinHeight,
          }}
        >
          <PatientAvatar initials={patient.initials} />
          <p
            className="min-w-0 truncate font-semibold leading-tight"
            style={{ ...SERIF, fontSize: TYPE.title, color: COLORS.body, margin: 0 }}
          >
            {patient.name}
          </p>
        </div>
        <div
          className="flex min-w-0 flex-wrap items-center"
          style={{ gridColumn: 1, gridRow: 2, gap: 6 }}
        >
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
        <div
          className="relative z-[1] flex items-center self-center"
          style={{ gridColumn: 2, gridRow: "1 / 3", padding: 16, margin: -16 }}
        >
          <PushToEhrButton
            ehr={ehr}
            emphasize={pulseActive}
            onPulseEnd={() => setPulseActive(false)}
          />
        </div>
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
export function NoteEhrPushFeatureMockup({
  className = "",
  config = NOTE_EHR_PUSH_MOCKUP,
  fit,
  displaySize,
  playAnimations,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const contain = fit === "contain" && !displaySize?.width;

  useLayoutEffect(() => {
    if (displaySize?.width) {
      setScale(computeContainedScale(displaySize, NOTE_EHR_PUSH_VIEWPORT));
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      setScale(
        contain
          ? computeContainedScale(rect, NOTE_EHR_PUSH_VIEWPORT)
          : Math.min(rect.width, NOTE_EHR_PUSH_MAX_WIDTH) / NOTE_EHR_PUSH_VIEWPORT.width,
      );
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contain, displaySize]);

  const scaledWidth = Math.ceil(NOTE_EHR_PUSH_VIEWPORT.width * scale);
  const scaledHeight = Math.ceil(NOTE_EHR_PUSH_VIEWPORT.height * scale);

  return (
    <div
      ref={containerRef}
      className={`m-0 p-0 ${contain ? "flex h-full w-full items-center justify-start" : "relative w-full"} ${className}`.trim()}
      style={
        contain
          ? undefined
          : { maxWidth: NOTE_EHR_PUSH_MAX_WIDTH, width: scaledWidth, height: scaledHeight }
      }
    >
      <div
        className="relative m-0 overflow-visible p-0"
        style={{ width: scaledWidth, height: scaledHeight, flexShrink: 0 }}
      >
        <div
          className="absolute left-0 top-0 m-0 p-0"
          style={{
            width: NOTE_EHR_PUSH_CANVAS.width,
            height: NOTE_EHR_PUSH_CANVAS.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <NoteEhrPushPanel config={config} playAnimations={playAnimations} />
        </div>
      </div>
    </div>
  );
}
