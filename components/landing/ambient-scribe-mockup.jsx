"use client";

import { useEffect, useRef, useState } from "react";
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

/** Ambient panel design canvas (width × height) */
const CANVAS = { width: 400, height: 150 };

/** Composite layout footprint — drives scale + note position; wider than the panel. */
const FEATURE_LAYOUT_WIDTH = 500;

/** Waveform strip height inside the ambient panel */
const WAVEFORM_HEIGHT = 68;

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
        width: 34,
        height: 34,
      }}
    >
      {icon}
    </div>
  );
}

function AmbientScribePanel({ config, meterSamples = STATIC_WAVEFORM }) {
  const { panelBlue, gradientBottom, encounterName, elapsed, barWidth, barGap } = config;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: CANVAS.width,
        height: CANVAS.height,
        backgroundColor: panelBlue,
        color: "#ffffff",
        borderRadius: 16,
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

      <div
        className="relative z-[1] flex h-full items-center gap-3 px-4 py-3"
      >
        <div
          className="flex shrink-0 flex-col items-center justify-center gap-1.5"
          style={{ width: 130 }}
        >
          <div
            className="inline-flex max-w-full items-center gap-1.5"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.12)",
              padding: "5px 10px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="truncate"
              style={{ fontSize: 13, fontWeight: 500, maxWidth: 88, color: "#ffffff" }}
            >
              {encounterName}
            </span>
            <span style={{ fontSize: 13, color: "#ffffff", transform: "scaleX(-1)" }} aria-hidden>
              ✎
            </span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              color: "#ffffff",
            }}
          >
            {elapsed}
          </span>
          <div className="flex items-center justify-center gap-5">
            <IconButton icon={<PauseIcon size={16} />} label="Pause recording" />
            <IconButton icon={<StopIcon size={14} />} label="End recording" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Waveform samples={meterSamples} barWidth={barWidth} barGap={barGap} />
        </div>
      </div>
    </div>
  );
}

/** Overlap between ambient panel and SOAP note in the composite layout */
const FEATURE_NOTE_OVERLAP_PX = 90;

/** Composite canvas — layout width is fixed so shrinking the panel leaves top-right space. */
const FEATURE_CANVAS = {
  width: FEATURE_LAYOUT_WIDTH,
  height:
    CANVAS.height + NOTE_CANVAS.height - NOTE_LAYOUT.offsetY - FEATURE_NOTE_OVERLAP_PX,
};

/** Pin composite mockup to figure top-left (0px inset). */
const AMBIENT_LAYOUT = { top: 0, left: 0 };

/** Ambient scribe + SOAP note overlay for the AI scribe accordion visual. */
export function AiScribeFeatureMockup({ className = "" }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const { width } = el.getBoundingClientRect();
      // Scale to figure width so the left edge stays flush (no height cap).
      setScale(width / FEATURE_CANVAS.width);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledWidth = FEATURE_CANVAS.width * scale;
  // Note sits at bottom: -offsetY, so the visible footprint extends below FEATURE_CANVAS.
  const scaledHeight = (FEATURE_CANVAS.height + NOTE_LAYOUT.offsetY) * scale;

  return (
    <div
      ref={containerRef}
      className={`relative m-0 h-full w-full p-0 ${className}`.trim()}
    >
      {/* Viewport sized to the scaled footprint — pins flush top-left */}
      <div
        className="absolute m-0 p-0"
        style={{
          top: AMBIENT_LAYOUT.top,
          left: AMBIENT_LAYOUT.left,
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          className="absolute m-0 p-0 drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]"
          style={{
            top: 0,
            left: 0,
            width: FEATURE_CANVAS.width,
            height: FEATURE_CANVAS.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            className="relative overflow-visible"
            style={{ width: FEATURE_CANVAS.width, height: FEATURE_CANVAS.height }}
          >
            <div
              className="absolute"
              style={{
                left: AMBIENT_LAYOUT.left,
                top: AMBIENT_LAYOUT.top,
                zIndex: 1,
              }}
            >
              <AmbientScribePanel config={AMBIENT_SCRIBE_MOCKUP} />
            </div>

            <div
              className="absolute"
              style={{ right: 0, bottom: -NOTE_LAYOUT.offsetY, zIndex: 2 }}
            >
              <ScribeNoteMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Ambient scribe recording UI — scales to fit the feature frame. */
export function AmbientScribeMockup({ className = "" }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const { width, height } = el.getBoundingClientRect();
      const maxWidth = Math.min(width * 0.92, 520);
      setScale(Math.min(maxWidth / CANVAS.width, height / CANVAS.height));
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledWidth = CANVAS.width * scale;
  const scaledHeight = CANVAS.height * scale;

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
            width: CANVAS.width,
            height: CANVAS.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <AmbientScribePanel config={AMBIENT_SCRIBE_MOCKUP} />
        </div>
      </div>
    </div>
  );
}
