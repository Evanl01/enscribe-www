"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { computeContainedScale, mockupViewports } from "@/components/landing/mockup-scale";
import {
  NOTE_CANVAS,
  NOTE_LAYOUT,
  ScribeNoteMockup,
} from "@/components/landing/scribe-note-mockup";

/** Tweak these to adjust the mockup without touching layout code. */
export const AMBIENT_SCRIBE_MOCKUP = {
  panelBlue: "#2848A8",
  gradientBottom: "#14285F",
  encounterName: "Anya Harmon",
  elapsed: "08:42",
  /** px — width of each volume bar */
  barWidth: 7,
  /** px — gap between bars (matches Waveform gap-[3px]) */
  barGap: 3,
  waveformBarCount: 22,
  /** Seed for deterministic bar heights — change to rescramble */
  waveformSeed: 0x8f3a2c1b,
};

/** Ambient recorder panel design canvas (width × height) */
export const AMBIENT_CANVAS = { width: 450, height: 175 };

/** Composite layout tweak — positions ambient panel within the feature layout box. */
export const AMBIENT_LAYOUT = { top: 0, left: 0 };

/** Overlap between ambient panel and SOAP note in the composite layout. */
export const AI_SCRIBE_NOTE_OVERLAP_PX = 90;

/** Composite layout footprint width — wider than the ambient panel. */
export const AI_SCRIBE_FEATURE_LAYOUT_WIDTH = 500;

/** Left controls column width inside the ambient panel */
const AMBIENT_LEFT_COL_WIDTH = 160;

/** Waveform strip height inside the ambient panel */
const WAVEFORM_HEIGHT = 92;

function PauseIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <rect x="5" y="4" width="5" height="16" rx="1.25" fill="currentColor" />
      <rect x="14" y="4" width="5" height="16" rx="1.25" fill="currentColor" />
    </svg>
  );
}

function StopIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
    </svg>
  );
}

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Scrambled bar heights (0–1) — random-looking, identical on every load. */
function buildStaticWaveform(count, seed) {
  const rand = createSeededRandom(seed);
  return Array.from({ length: count }, () => 0.07 + rand() * 0.9);
}

const STATIC_WAVEFORM = buildStaticWaveform(
  AMBIENT_SCRIBE_MOCKUP.waveformBarCount,
  AMBIENT_SCRIBE_MOCKUP.waveformSeed,
);

function Waveform({ samples, barWidth, barGap, color = "#ffffff" }) {
  return (
    <div
      className="flex items-center px-1"
      style={{ height: WAVEFORM_HEIGHT, gap: barGap }}
      role="img"
      aria-label="Audio waveform"
    >
      {samples.map((h, i) => (
        <div
          key={`meter-${i}`}
          style={{
            width: barWidth,
            height: Math.max(4, 4 + h * (WAVEFORM_HEIGHT - 10)),
            borderRadius: 999,
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function IconButton({ icon, label }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex shrink-0 items-center justify-center"
      style={{
        color: "#ffffff",
        border: "1px solid #ffffff",
        borderRadius: 999,
        width: 42,
        height: 42,
      }}
    >
      {icon}
    </div>
  );
}

export function AmbientScribePanel({ config = AMBIENT_SCRIBE_MOCKUP, meterSamples = STATIC_WAVEFORM }) {
  const { panelBlue, gradientBottom, encounterName, elapsed, barWidth, barGap } = config;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: AMBIENT_CANVAS.width,
        height: AMBIENT_CANVAS.height,
        backgroundColor: panelBlue,
        color: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        style={{
          height: "55%",
          background: `linear-gradient(to top, ${gradientBottom}, ${panelBlue})`,
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex h-full items-center gap-5 px-5 py-4">
        <div
          className="flex shrink-0 flex-col items-center justify-center gap-3"
          style={{ width: AMBIENT_LEFT_COL_WIDTH }}
        >
          <div
            className="inline-flex max-w-full items-center gap-2"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.12)",
              padding: "6px 14px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="truncate"
              style={{ fontSize: 15, fontWeight: 500, maxWidth: 120, color: "#ffffff" }}
            >
              {encounterName}
            </span>
            <span style={{ fontSize: 15, color: "#ffffff", transform: "scaleX(-1)" }} aria-hidden>
              ✎
            </span>
          </div>
          <span
            style={{
              fontSize: 33,
              fontWeight: 700,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              color: "#ffffff",
            }}
          >
            {elapsed}
          </span>
          <div className="flex items-center justify-center gap-4">
            <IconButton icon={<PauseIcon size={20} />} label="Pause recording" />
            <IconButton icon={<StopIcon size={18} />} label="End recording" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Waveform samples={meterSamples} barWidth={barWidth} barGap={barGap} />
        </div>
      </div>
    </div>
  );
}

/** Layout box — panel positions only; shadows overflow into accordion padding. */
const FEATURE_LAYOUT = {
  width: AI_SCRIBE_FEATURE_LAYOUT_WIDTH,
  height:
    AMBIENT_CANVAS.height +
    NOTE_CANVAS.height -
    NOTE_LAYOUT.offsetY -
    AI_SCRIBE_NOTE_OVERLAP_PX,
};

/** Visible footprint — ambient top through note bottom. */
const FEATURE_FOOTPRINT_HEIGHT =
  AMBIENT_CANVAS.height + NOTE_CANVAS.height - AI_SCRIBE_NOTE_OVERLAP_PX;

const FEATURE_LAYOUT_FOOTPRINT = {
  width: AI_SCRIBE_FEATURE_LAYOUT_WIDTH + Math.max(0, NOTE_LAYOUT.offsetX),
  height: FEATURE_FOOTPRINT_HEIGHT,
};

const { viewport: AMBIENT_VIEWPORT } = mockupViewports(AMBIENT_CANVAS);

/** Ambient scribe + SOAP note overlay for the AI scribe accordion visual. */
export function AiScribeFeatureMockup({ className = "", fit }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const contain = fit === "contain";

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      setScale(
        contain
          ? computeContainedScale(rect, FEATURE_LAYOUT_FOOTPRINT)
          : rect.width / FEATURE_LAYOUT_FOOTPRINT.width,
      );
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contain]);

  const scaledWidth = FEATURE_LAYOUT_FOOTPRINT.width * scale;
  const scaledHeight = FEATURE_LAYOUT_FOOTPRINT.height * scale;

  const viewport = (
    <div
      className="relative m-0 overflow-visible p-0"
      style={{
        width: Math.ceil(scaledWidth),
        height: Math.ceil(scaledHeight),
        flexShrink: 0,
      }}
    >
      <div
        className="absolute left-0 top-0 m-0 p-0"
        style={{
          width: FEATURE_LAYOUT_FOOTPRINT.width,
          height: FEATURE_LAYOUT_FOOTPRINT.height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative overflow-visible"
          style={{ width: FEATURE_LAYOUT.width, height: FEATURE_LAYOUT.height }}
        >
          <div
            className="absolute"
            style={{
              left: AMBIENT_LAYOUT.left,
              top: AMBIENT_LAYOUT.top,
              zIndex: 1,
            }}
          >
            <AmbientScribePanel />
          </div>

          <div
            className="absolute"
            style={{
              right: -NOTE_LAYOUT.offsetX,
              bottom: -NOTE_LAYOUT.offsetY,
              zIndex: 2,
            }}
          >
            <ScribeNoteMockup />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`m-0 h-full w-full p-0 ${contain ? "flex items-center justify-end" : "relative"} ${className}`.trim()}
    >
      {contain ? (
        viewport
      ) : (
        <div
          className="absolute m-0 p-0"
          style={{
            top: AMBIENT_LAYOUT.top,
            left: AMBIENT_LAYOUT.left,
            width: scaledWidth,
            height: scaledHeight,
          }}
        >
          {viewport}
        </div>
      )}
    </div>
  );
}

/** Ambient scribe recording UI — scales to fit its container. */
export function AmbientScribeMockup({ className = "", config = AMBIENT_SCRIBE_MOCKUP }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      setScale(computeContainedScale(rect, AMBIENT_VIEWPORT));
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledWidth = AMBIENT_VIEWPORT.width * scale;
  const scaledHeight = AMBIENT_VIEWPORT.height * scale;

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full items-center justify-center ${className}`.trim()}
    >
      <div
        className="drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div
          style={{
            width: AMBIENT_CANVAS.width,
            height: AMBIENT_CANVAS.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <AmbientScribePanel config={config} />
        </div>
      </div>
    </div>
  );
}
