"use client";

import { useEffect, useRef, useState } from "react";

/** Tweak these to adjust the mockup without touching layout code. */
export const AMBIENT_SCRIBE_MOCKUP = {
  panelBlue: "#2848A8",
  gradientBottom: "#14285F",
  encounterName: "Anya Harmon",
  elapsed: "08:42",
  animateWaveform: true,
  /** ms between bar shifts — higher = slower scroll */
  waveformScrollMs: 240,
  /** px — width of each volume bar */
  barWidth: 7,
  waveformBarCount: 34,
};

/** Landscape design canvas (width × height) */
const CANVAS = { width: 500, height: 180 };

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

function Waveform({ samples, barWidth, color = "#ffffff" }) {
  return (
    <div
      className="flex items-center justify-between gap-[3px] px-1"
      style={{ height: 88, width: "100%" }}
      role="img"
      aria-label="Audio waveform"
    >
      {samples.map((h, i) => (
        <div key={i} className="flex flex-1 items-center justify-center">
          <div
            style={{
              width: barWidth,
              height: Math.max(4, 4 + h * 72),
              borderRadius: 999,
              backgroundColor: color,
            }}
          />
        </div>
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
        width: 38,
        height: 38,
      }}
    >
      {icon}
    </div>
  );
}

function AmbientScribePanel({ config, meterSamples }) {
  const { panelBlue, gradientBottom, encounterName, elapsed, barWidth } = config;

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
        className="relative z-[1] flex h-full items-center gap-4 px-4 py-4"
      >
        <div
          className="flex shrink-0 flex-col items-center justify-center gap-2"
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
              fontSize: 32,
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
          <Waveform samples={meterSamples} barWidth={barWidth} />
        </div>
      </div>
    </div>
  );
}

function randomMeterSample() {
  return 0.06 + Math.random() * 0.88;
}

function buildInitialWaveform(count) {
  return Array.from({ length: count }, randomMeterSample);
}

function shiftWaveform(prev) {
  return [...prev.slice(1), randomMeterSample()];
}

/** Ambient scribe recording UI — scales to fit the feature frame. */
export function AmbientScribeMockup({ className = "" }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [meterSamples, setMeterSamples] = useState(() =>
    buildInitialWaveform(AMBIENT_SCRIBE_MOCKUP.waveformBarCount),
  );

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

  useEffect(() => {
    if (!AMBIENT_SCRIBE_MOCKUP.animateWaveform) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setMeterSamples((prev) => shiftWaveform(prev));
    }, AMBIENT_SCRIBE_MOCKUP.waveformScrollMs);
    return () => window.clearInterval(id);
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
          <AmbientScribePanel config={AMBIENT_SCRIBE_MOCKUP} meterSamples={meterSamples} />
        </div>
      </div>
    </div>
  );
}
