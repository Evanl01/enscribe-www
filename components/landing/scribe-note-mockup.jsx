"use client";

import { useEffect, useState } from "react";

/** Tweak note copy and styling without touching layout code. */
export const SCRIBE_NOTE_MOCKUP = {
  header: "SOAP note",
  noteTitle: "Anya Harmon",
  sections: [
    {
      key: "S",
      label: "Subjective",
      text: "Reports recurrent bilateral ankle swelling by evening, home BP readings ~148/92, and foamy urine over the past week.",
    },
    {
      key: "O",
      label: "Objective",
      text: "BP 146/90; mild bilateral pedal edema. Prior BMP showed eGFR 38.",
    },
    {
      key: "A",
      label: "Assessment",
      text: "CKD stage 3b with hypertension; worsening proteinuria.",
    },
  ],
  typingSection: {
    key: "P",
    label: "Plan",
    text: "Continue lisinopril; repeat BMP/eGFR in 3 months; renal dietitian referral.",
  },
  animateTyping: true,
  typingIntervalMs: 42,
};

/** SOAP note card design canvas (width × height) */
export const NOTE_CANVAS = { width: 340, height: 320 };

/** Composite layout tweak — positive shifts the note downward. */
export const NOTE_LAYOUT = { offsetY: 425 };

function SoapSection({ sectionKey, label, text, showCursor = false }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span
          className="shrink-0 font-bold"
          style={{ fontSize: 11, color: "#3166F7", letterSpacing: "0.02em" }}
        >
          {sectionKey}
        </span>
        <span
          className="font-semibold uppercase tracking-wide"
          style={{ fontSize: 9.5, color: "#3C4C78", letterSpacing: "0.05em" }}
        >
          {label}
        </span>
      </div>
      <p
        className="mt-0.5 leading-snug"
        style={{ fontSize: 11.5, color: "#183278", margin: 0, paddingLeft: 16 }}
      >
        {text}
        {showCursor ? <span className="scribe-note-cursor ml-px inline-block align-middle" aria-hidden /> : null}
      </p>
    </div>
  );
}

export function ScribeNotePanel({ config = SCRIBE_NOTE_MOCKUP, typedChars = null }) {
  const { header, noteTitle, sections, typingSection } = config;
  const showTyping = typedChars !== null && typingSection;
  const typedText = showTyping ? typingSection.text.slice(0, typedChars) : typingSection?.text ?? "";

  return (
    <div
      className="overflow-hidden"
      style={{
        width: NOTE_CANVAS.width,
        height: NOTE_CANVAS.height,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        border: "1px solid rgba(24,50,120,0.1)",
        boxShadow: "0 18px 40px rgba(11,26,71,0.18), 0 2px 8px rgba(11,26,71,0.06)",
      }}
    >
      <div
        className="border-b"
        style={{
          borderColor: "rgba(24,50,120,0.08)",
          padding: "10px 12px 9px",
        }}
      >
        <div className="flex items-baseline gap-2">
          <p
            className="shrink-0 font-bold uppercase tracking-wider"
            style={{ fontSize: 10.5, color: "#3166F7", margin: 0, letterSpacing: "0.06em" }}
          >
            {header}
          </p>
          {noteTitle ? (
            <>
              <span
                aria-hidden
                className="shrink-0"
                style={{ fontSize: 10.5, color: "rgba(60,76,120,0.45)", lineHeight: 1 }}
              >
                ·
              </span>
              <p
                className="min-w-0 truncate font-semibold"
                style={{ fontSize: 14, color: "#183278", margin: 0 }}
              >
                {noteTitle}
              </p>
            </>
          ) : null}
        </div>
      </div>

      <div
        className="flex flex-col gap-3 overflow-hidden"
        style={{ padding: "12px 12px 14px" }}
      >
        {sections.map((section) => (
          <SoapSection
            key={section.key}
            sectionKey={section.key}
            label={section.label}
            text={section.text}
          />
        ))}

        {typingSection ? (
          <SoapSection
            sectionKey={typingSection.key}
            label={typingSection.label}
            text={showTyping ? typedText : typingSection.text}
            showCursor={showTyping && typedChars < typingSection.text.length}
          />
        ) : null}
      </div>
    </div>
  );
}

/** SOAP note card — scales to fit its container when used standalone. */
export function ScribeNoteMockup({ className = "", config = SCRIBE_NOTE_MOCKUP }) {
  const [typedChars, setTypedChars] = useState(() =>
    config.animateTyping ? 0 : config.typingSection?.text.length ?? 0,
  );

  useEffect(() => {
    if (!config.animateTyping || !config.typingSection) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedChars(config.typingSection.text.length);
      return;
    }

    const fullLen = config.typingSection.text.length;
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
      <ScribeNotePanel config={config} typedChars={config.animateTyping ? typedChars : null} />
    </div>
  );
}
