"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { useMockupTypingAnimation } from "@/components/landing/use-mockup-play-animation";
import { SERIF } from "@/components/landing/constants";
import { computeContainedScale, mockupViewports } from "@/components/landing/mockup-scale";

/** Tweak visit prep copy and styling without touching layout code. */
export const VISIT_PREP_MOCKUP = {
  title: "Anya Harmon F/U May 12",
  userMessage: "Any recent med changes?",
  assistantIntro: "No.",
  assistantBullets: [
    "Lisinopril 10 mg daily — unchanged",
    "No new prescriptions or OTC meds",
  ],
  suggestions: [
    "Review last BMP",
    "Check home BP trend",
    "Ask about leg swelling",
  ],
  inputPlaceholder: "Ask anything",
  animateTyping: true,
  typingIntervalMs: 35,
};

/** Card design canvas (width × height) */
export const PREP_CANVAS = { width: 480, height: 440 };

const { viewport: PREP_VIEWPORT } = mockupViewports(PREP_CANVAS);

const SPACE = {
  header: "12px 14px 11px",
  body: "14px 14px 12px",
  chatGap: 24,
  chipGap: 9,
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
  title: 18,
  chat: 17,
  chip: 15,
  input: 14,
};

const ASSISTANT_CHAT = {
  lineHeight: 1.45,
  lineGap: 3,
  textInset: 7,
  avatarSize: 28,
  /** Vertically centers avatar with the first text line only. */
  avatarOffsetTop: (TYPE.chat * 1.45) / 2 - 28 / 2,
};

function getAssistantResponseText(intro, bullets) {
  return [intro, ...bullets].join("\n");
}

function sliceAssistantResponse(intro, bullets, typedChars) {
  const fullText = getAssistantResponseText(intro, bullets);
  const typed = fullText.slice(0, typedChars);
  return {
    lines: typed.split("\n"),
    showCursor: typedChars < fullText.length,
    fullLength: fullText.length,
  };
}

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
        width: ASSISTANT_CHAT.avatarSize,
        height: ASSISTANT_CHAT.avatarSize,
        border: `1px solid ${COLORS.border}`,
        backgroundColor: "#ffffff",
      }}
    >
      <Image
        src="/enscribe-icon-32x32.png"
        alt=""
        width={ASSISTANT_CHAT.avatarSize}
        height={ASSISTANT_CHAT.avatarSize}
        className="h-full w-full object-cover"
        aria-hidden
      />
    </div>
  );
}

function AssistantResponseText({ lines, showCursor = false, reserveLayout = false }) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col"
      style={{
        gap: ASSISTANT_CHAT.lineGap,
        paddingLeft: ASSISTANT_CHAT.textInset,
        fontSize: TYPE.chat,
        color: COLORS.body,
        lineHeight: ASSISTANT_CHAT.lineHeight,
        visibility: reserveLayout ? "hidden" : undefined,
      }}
      aria-hidden={reserveLayout || undefined}
    >
      {lines.map((line, index) => (
        <p key={index} className="leading-snug" style={{ margin: 0 }}>
          {line}
          {!reserveLayout && showCursor && index === lines.length - 1 ? (
            <span className="scribe-note-cursor ml-px inline-block align-middle" aria-hidden />
          ) : null}
        </p>
      ))}
    </div>
  );
}

export function VisitPrepPanel({ config = VISIT_PREP_MOCKUP, typedChars = null }) {
  const { title, userMessage, assistantIntro, assistantBullets, suggestions, inputPlaceholder } =
    config;

  const showTyping = typedChars !== null;
  const fullResponseLines = [assistantIntro, ...assistantBullets];
  const response = showTyping
    ? sliceAssistantResponse(assistantIntro, assistantBullets, typedChars)
    : {
        lines: fullResponseLines,
        showCursor: false,
      };

  return (
    <div
      style={{
        width: PREP_CANVAS.width,
        height: PREP_CANVAS.height,
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

          <div className="flex items-start" style={{ gap: 9 }}>
            <div className="shrink-0" style={{ marginTop: ASSISTANT_CHAT.avatarOffsetTop }}>
              <AssistantAvatar />
            </div>
            {showTyping ? (
              <div className="relative min-w-0 flex-1">
                <AssistantResponseText lines={fullResponseLines} reserveLayout />
                <div className="absolute inset-0">
                  <AssistantResponseText
                    lines={response.lines}
                    showCursor={response.showCursor}
                  />
                </div>
              </div>
            ) : (
              <AssistantResponseText lines={response.lines} />
            )}
          </div>
        </div>

        <div className="flex flex-wrap" style={{ gap: SPACE.chipGap, marginTop: 100 }}>
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
export function VisitPrepFeatureMockup({
  className = "",
  fit,
  config = VISIT_PREP_MOCKUP,
  displaySize,
  playAnimations,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const fullResponseLength = getAssistantResponseText(
    config.assistantIntro,
    config.assistantBullets,
  ).length;
  const typedChars = useMockupTypingAnimation({
    animateTyping: config.animateTyping,
    playAnimations,
    fullLength: fullResponseLength,
    intervalMs: config.typingIntervalMs,
  });
  const contain = fit === "contain" && !displaySize?.width;

  useLayoutEffect(() => {
    if (displaySize?.width) {
      setScale(computeContainedScale(displaySize, PREP_VIEWPORT));
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      setScale(
        contain
          ? computeContainedScale(rect, PREP_VIEWPORT)
          : rect.width / PREP_VIEWPORT.width,
      );
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contain, displaySize]);

  const scaledWidth = Math.ceil(PREP_VIEWPORT.width * scale);
  const scaledHeight = Math.ceil(PREP_VIEWPORT.height * scale);

  return (
    <div
      ref={containerRef}
      className={`m-0 p-0 ${contain ? "flex h-full w-full items-center justify-start" : "relative w-full"} ${className}`.trim()}
      style={
        contain
          ? undefined
          : { width: scaledWidth, height: scaledHeight }
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
            height: PREP_CANVAS.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <VisitPrepPanel
            config={config}
            typedChars={config.animateTyping ? typedChars : null}
          />
        </div>
      </div>
    </div>
  );
}
