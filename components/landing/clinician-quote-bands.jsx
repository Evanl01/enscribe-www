"use client";

import { useEffect, useRef, useState } from "react";
import { SERIF, QUOTES_TESTIMONIALS_BG_STYLE } from "@/components/landing/constants";

/** Matches landing header `h-16`. */
const PIN_TOP_PX = 64;
/** Scroll track height — controls pacing through the stack. */
const TRACK_HEIGHT_VH = 220;
/** Vertical peek between stacked cards. */
const STACK_STEP_PX = 80;
/** Animation completes at this fraction of track progress; remainder is safety runway. */
const ANIMATION_END = 0.85;
/** Spatial buffer below the deck frame inside the sticky viewport. */
const DECK_BOTTOM_BUFFER_VH = 12;
const BASE_SCALE = 0.92;
const SCALE_STEP = 0.04;
/** Extra px so fixed-height cards never clip bottom padding after measure. */
const CARD_HEIGHT_BUFFER_PX = 8;
/** How far below the deck cards 2 & 3 start (multiplier on measured card height). */
const STARTING_Y_RATIO = 2.2;
const CARD_MAX_WIDTH = "calc(52rem + 100px)";
const LEFT_COL_WIDTH = "calc(7rem + 50px)";

const bands = [
  {
    kicker: "Designed and trained by clinicians",
    quote:
      "I've used several AI based scribe programs and this is by far the best of the bunch!",
    name: "Dr. Ramy Mansour",
    role: "Gastroenterology",
  },
  {
    kicker: "Enhanced scribe accuracy",
    quote:
      "It feels as though I have a personal scribe in the background capturing the details.",
    name: "Nadine A Smith",
    role: "PMHNP-BC",
  },
  {
    kicker: "Real-time human support",
    quote:
      "The EnScribe team has been quick to address my issues and expedient in solving them. I really appreciate them!",
    name: "Kathleen McCoy",
    role: "NP",
  },
];

const CARD_SURFACE_CLASS =
  "rounded-2xl border border-[#183278]/10 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(24,50,120,0.18)] sm:p-10";

/** Inline layout — avoids Tailwind v4 purge on dynamic/arbitrary utilities. */
const CARD_LAYER_STYLE = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  transformOrigin: "top center",
  willChange: "transform",
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function segmentProgress(t, start, end) {
  return clamp((t - start) / (end - start), 0, 1);
}

function QuoteCardContent({ band }) {
  const portraitStyle = {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "7rem",
    height: "7rem",
    borderRadius: "9999px",
    border: "1px dashed rgba(124, 157, 249, 0.55)",
    background: "linear-gradient(to bottom right, #F9FAFF, rgba(124, 157, 249, 0.15))",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#3166F7",
    overflow: "hidden",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${LEFT_COL_WIDTH} 1fr`,
        gridTemplateRows: "auto minmax(0, 1fr) auto",
        columnGap: "1.5rem",
        rowGap: "1rem",
        height: "100%",
        minHeight: 0,
        flex: 1,
      }}
    >
      {/* Row 1 — title only, right column */}
      <p
        style={{
          gridColumn: 2,
          gridRow: 1,
          margin: 0,
          marginBottom: "1rem",
          fontSize: "1.89rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#3166F7",
        }}
      >
        {band.kicker}
      </p>

      {/* Rows 2–3 — portrait centered on quote + name block only */}
      <div
        style={{
          gridColumn: 1,
          gridRow: "2 / 4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div aria-label={`${band.name} portrait`} style={portraitStyle}>
          <span style={{ paddingInline: "0.25rem", textAlign: "center" }}>Portrait</span>
        </div>
      </div>

      {/* Row 2 — testimonial, right column */}
      <blockquote
        style={{
          ...SERIF,
          gridColumn: 2,
          gridRow: 2,
          margin: 0,
          minWidth: 0,
          minHeight: 0,
          alignSelf: "start",
          fontSize: "1.575rem",
          fontWeight: 600,
          lineHeight: 1.375,
          color: "#183278",
        }}
      >
        &ldquo;{band.quote}&rdquo;
      </blockquote>

      {/* Row 3 — testifier, right column (same x as title + quote) */}
      <footer
        style={{
          gridColumn: 2,
          gridRow: 3,
          margin: 0,
          marginTop: "auto",
          paddingTop: "0.75rem",
          paddingBottom: "0.125rem",
          borderTop: "1px solid rgba(24, 50, 120, 0.08)",
        }}
      >
        <p style={{ margin: 0, fontSize: "1.225rem", fontWeight: 600, color: "#183278" }}>
          {band.name}
          <span style={{ marginInline: "0.375rem", fontWeight: 400, color: "#4B5D99" }}>·</span>
          <span style={{ fontSize: "1.05rem", fontWeight: 500, color: "#4B5D99" }}>{band.role}</span>
        </p>
      </footer>
    </div>
  );
}

export function ClinicianQuoteBands() {
  const trackRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const deckFrameHeight = cardHeight + STACK_STEP_PX * (bands.length - 1);
  const startingY = cardHeight * STARTING_Y_RATIO;
  const hiddenTransform =
    cardHeight > 0 ? `translateY(${startingY}px) scale(${BASE_SCALE})` : undefined;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
    if (cards.length === 0) return undefined;

    const syncHeight = () => {
      const maxHeight = Math.max(
        ...cards.map((card) => {
          const prevHeight = card.style.height;
          card.style.height = "auto";
          card.style.minHeight = "0";
          const naturalHeight = Math.ceil(
            Math.max(card.getBoundingClientRect().height, card.scrollHeight),
          );
          card.style.height = prevHeight;
          card.style.minHeight = "";
          return naturalHeight;
        }),
      );
      setCardHeight(maxHeight + CARD_HEIGHT_BUFFER_PX);
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    cards.forEach((card) => ro.observe(card));
    window.addEventListener("resize", syncHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    let raf = 0;

    const applyTransforms = () => {
      const track = trackRef.current;
      if (!track || !card2 || !card3 || cardHeight <= 0) return;

      const trackRect = track.getBoundingClientRect();
      const scrollable = trackRect.height - window.innerHeight;
      if (scrollable <= 0) return;

      let progress = -trackRect.top / scrollable;
      progress = clamp(progress, 0, 1);

      let animationProgress = progress / ANIMATION_END;
      animationProgress = clamp(animationProgress, 0, 1);

      const card2Progress = segmentProgress(animationProgress, 0, 0.5);
      const card3Progress = segmentProgress(animationProgress, 0.5, 1);

      const startingY = cardHeight * STARTING_Y_RATIO;

      const y2 = startingY - (startingY - STACK_STEP_PX) * card2Progress;
      const s2 = BASE_SCALE + SCALE_STEP * card2Progress;

      const y3 = startingY - (startingY - STACK_STEP_PX * 2) * card3Progress;
      const s3 = BASE_SCALE + SCALE_STEP * 2 * card3Progress;

      card2.style.transform = `translateY(${y2}px) scale(${s2})`;
      card3.style.transform = `translateY(${y3}px) scale(${s3})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyTransforms);
    };

    applyTransforms();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, cardHeight]);

  if (reducedMotion) {
    return (
      <section
        className="relative px-5 py-20 sm:px-8"
        style={QUOTES_TESTIMONIALS_BG_STYLE}
        aria-label="Clinician quotes"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: CARD_MAX_WIDTH, marginInline: "auto" }}>
          {bands.map((band) => (
            <article key={band.kicker} className={CARD_SURFACE_CLASS}>
              <QuoteCardContent band={band} />
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{ height: `${TRACK_HEIGHT_VH}vh`, ...QUOTES_TESTIMONIALS_BG_STYLE }}
      aria-label="Clinician quotes"
    >
      <div
        className="sticky flex w-full flex-col items-center justify-center overflow-hidden px-5 sm:px-8"
        style={{
          top: PIN_TOP_PX,
          height: `calc(100dvh - ${PIN_TOP_PX}px)`,
          ...QUOTES_TESTIMONIALS_BG_STYLE,
        }}
      >
        <div
          className="relative flex w-full justify-center"
          style={{
            maxWidth: CARD_MAX_WIDTH,
            height: deckFrameHeight || undefined,
            marginBottom: `${DECK_BOTTOM_BUFFER_VH}vh`,
          }}
        >
          <div
            className="relative w-full"
            style={{ height: deckFrameHeight || undefined, isolation: "isolate" }}
          >
            <article
              ref={card1Ref}
              className={CARD_SURFACE_CLASS}
              style={{
                ...CARD_LAYER_STYLE,
                zIndex: 1,
                height: cardHeight || "auto",
                boxSizing: "border-box",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                transform: "translateY(0px) scale(0.92)",
              }}
            >
              <QuoteCardContent band={bands[0]} />
            </article>

            <article
              ref={card2Ref}
              className={CARD_SURFACE_CLASS}
              style={{
                ...CARD_LAYER_STYLE,
                zIndex: 2,
                height: cardHeight || "auto",
                boxSizing: "border-box",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                transform: hiddenTransform,
              }}
            >
              <QuoteCardContent band={bands[1]} />
            </article>

            <article
              ref={card3Ref}
              className={CARD_SURFACE_CLASS}
              style={{
                ...CARD_LAYER_STYLE,
                zIndex: 3,
                height: cardHeight || "auto",
                boxSizing: "border-box",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                transform: hiddenTransform,
              }}
            >
              <QuoteCardContent band={bands[2]} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
