"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SERIF } from "@/components/landing/constants";
import { computeContainedScale, mockupViewports } from "@/components/landing/mockup-scale";

/** Tweak visit prep copy and styling without touching layout code. */
export const VISIT_PREP_MOCKUP = {
  title: "Anya Harmon F/U May 12",
  userMessage: "Any recent med changes?",
  assistantIntro: "Yes:",
  assistantBullets: [
    "Metformin dose increased due to elevated glucose",
    "Basal insulin discussed but not yet started",
  ],
  suggestions: [
    "Review glucose trends",
    "Revisit insulin readiness",
    "Check medication tolerance",
  ],
  inputPlaceholder: "Ask anything",
};

/** Card design canvas width — height is content-driven */
export const PREP_CANVAS = { width: 400 };
export const PREP_MAX_WIDTH = 420;

const SPACE = {
  header: "12px 14px 11px",
  body: "14px 14px 12px",
  chatGap: 14,
  chipGap: 7,
  chipPad: "6px 11px",
};

const COLORS = {
  body: "#183278",
  muted: "#3C4C78",
  border: "rgba(24,50,120,0.1)",
  divider: "rgba(24,50,120,0.08)",
  userBubble: "#F3F4F6",
  chipBorder: "rgba(24,50,120,0.14)",
  inputBorder: "rgba(24,50,120,0.12)",
  icon: "rgba(60,76,120,0.55)",
  placeholder: "rgba(60,76,120,0.45)",
};

const TYPE = {
  title: 15,
  chat: 12.5,
  chip: 11.5,
  input: 12.5,
};

function HistoryIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        d="M12 8v4l3 2"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12a8.5 8.5 0 1 0 2.4-5.9"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M3 7v5h5"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
      />
      <path d="M10 5v14" stroke={COLORS.icon} strokeWidth={1.6} />
    </svg>
  );
}

function MinimizeIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M6 12h12" stroke={COLORS.icon} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function MicIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <rect
        x="9"
        y="3"
        width="6"
        height="11"
        rx="3"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
      />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        fill="none"
        stroke={COLORS.icon}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        d="M12 19V5M12 5l-5 5M12 5l5 5"
        fill="none"
        stroke={COLORS.muted}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AssistantAvatar() {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-full"
      style={{
        width: 28,
        height: 28,
        border: `1px solid ${COLORS.border}`,
        backgroundColor: "#ffffff",
      }}
    >
      <Image
        src="/enscribe-icon-32x32.png"
        alt=""
        width={28}
        height={28}
        className="h-full w-full object-cover"
        aria-hidden
      />
    </div>
  );
}

export function VisitPrepPanel({ config = VISIT_PREP_MOCKUP }) {
  const { title, userMessage, assistantIntro, assistantBullets, suggestions, inputPlaceholder } =
    config;

  return (
    <div
      style={{
        width: PREP_CANVAS.width,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between border-b"
        style={{ borderColor: COLORS.divider, padding: SPACE.header }}
      >
        <p
          className="min-w-0 font-bold leading-tight"
          style={{ ...SERIF, fontSize: TYPE.title, color: COLORS.body, margin: 0 }}
        >
          {title}
        </p>
        <div className="flex shrink-0 items-center" style={{ gap: 10 }}>
          <HistoryIcon />
          <SidebarIcon />
          <MinimizeIcon />
        </div>
      </div>

      <div style={{ padding: SPACE.body }}>
        <div className="flex flex-col" style={{ gap: SPACE.chatGap }}>
          <p
            className="rounded-2xl leading-snug"
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: "auto",
              width: "fit-content",
              maxWidth: "70%",
              textAlign: "right",
              padding: "8px 12px",
              fontSize: TYPE.chat,
              color: COLORS.body,
              backgroundColor: COLORS.userBubble,
            }}
          >
            {userMessage}
          </p>

          <div className="flex" style={{ gap: 9 }}>
            <AssistantAvatar />
            <div className="min-w-0 flex-1">
              <p
                className="leading-snug"
                style={{ margin: 0, fontSize: TYPE.chat, color: COLORS.body }}
              >
                {assistantIntro}
              </p>
              <ul
                className="flex flex-col"
                style={{
                  margin: "4px 0 0",
                  padding: "0 0 0 16px",
                  gap: 3,
                  fontSize: TYPE.chat,
                  color: COLORS.body,
                  lineHeight: 1.45,
                }}
              >
                {assistantBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap" style={{ gap: SPACE.chipGap, marginTop: 14 }}>
          {suggestions.map((label) => (
            <span
              key={label}
              className="rounded-full font-semibold"
              style={{
                padding: SPACE.chipPad,
                fontSize: TYPE.chip,
                color: COLORS.body,
                border: `1px solid ${COLORS.chipBorder}`,
                backgroundColor: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          className="mt-3 flex items-center justify-between"
          style={{
            border: `1px solid ${COLORS.inputBorder}`,
            borderRadius: 12,
            padding: "9px 10px 9px 14px",
          }}
        >
          <span style={{ fontSize: TYPE.input, color: COLORS.placeholder }}>{inputPlaceholder}</span>
          <div className="flex items-center" style={{ gap: 8 }}>
            <MicIcon />
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 26,
                height: 26,
                backgroundColor: COLORS.userBubble,
                border: `1px solid ${COLORS.inputBorder}`,
              }}
            >
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Visit prep chat card — scales to fit its container for the accordion visual. */
export function VisitPrepFeatureMockup({ className = "", fit }) {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [footprintHeight, setFootprintHeight] = useState(0);
  const contain = fit === "contain";

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;

    const updateScale = () => {
      const rect = container.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;
      const { viewport } = mockupViewports({
        width: PREP_CANVAS.width,
        height: panelHeight,
      });
      const nextScale = contain
        ? computeContainedScale(rect, viewport)
        : Math.min(rect.width, PREP_MAX_WIDTH) / viewport.width;

      setFootprintHeight(panelHeight);
      setScale(nextScale);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [contain]);

  const viewports =
    footprintHeight > 0
      ? mockupViewports({ width: PREP_CANVAS.width, height: footprintHeight })
      : null;
  const scaledWidth = viewports ? Math.ceil(viewports.viewport.width * scale) : undefined;
  const scaledHeight = viewports ? Math.ceil(viewports.viewport.height * scale) : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative m-0 p-0 ${contain ? "h-full w-full" : "w-full"} ${className}`.trim()}
      style={
        contain
          ? undefined
          : { maxWidth: PREP_MAX_WIDTH, width: scaledWidth, height: scaledHeight }
      }
    >
      <div
        className="relative m-0 overflow-visible p-0"
        style={{ width: scaledWidth, height: scaledHeight, flexShrink: 0 }}
      >
        <div
          className="absolute left-0 top-0 m-0 p-0"
          style={{
            width: PREP_CANVAS.width,
            height: footprintHeight || undefined,
            transform: footprintHeight > 0 ? `scale(${scale})` : undefined,
            transformOrigin: "top left",
          }}
        >
          <div ref={panelRef}>
            <VisitPrepPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
