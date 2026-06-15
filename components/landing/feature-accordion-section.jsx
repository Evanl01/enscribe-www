"use client";

import { useState } from "react";
import {
  FEATURES,
  FEATURE_ACCORDION_PANEL_HEIGHT_PX,
  FEATURE_ACCORDION_COL_SPLIT,
  HERO_SECTION_OVERLAP_PX,
  HERO_SECTION_TOP_RADIUS_PX,
  SERIF,
} from "@/components/landing/constants";
import { FeatureVisual } from "@/components/landing/placeholders";

/** Vertical padding on accordion title buttons (px). */
const ACCORDION_BUTTON_PAD_Y = 32;

export function FeatureAccordionSection() {
  const [activeKey, setActiveKey] = useState(FEATURES[0].key);
  const active = FEATURES.find((f) => f.key === activeKey) ?? FEATURES[0];

  return (
    <section
      className="relative z-20 overflow-hidden border-b border-[#183278]/8 py-20 sm:py-28"
      style={{
        marginTop: -HERO_SECTION_OVERLAP_PX,
        borderTopLeftRadius: HERO_SECTION_TOP_RADIUS_PX,
        borderTopRightRadius: HERO_SECTION_TOP_RADIUS_PX,
        backgroundColor: "#ffffff",
        boxShadow: "0 -20px 50px -20px rgba(11, 26, 71, 0.35)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          className="w-full text-3xl font-semibold leading-[1.05] tracking-tight lg:text-[3rem]"
          style={SERIF}
        >
          Your <span className="text-[#3166F7]">All-in-One</span> Scribe that will save you{" "}
          <span className="text-[#3166F7]">hours</span>.
        </h2>

        <div
          className="mt-14 grid min-w-0 feature-accordion-columns gap-10 lg:items-start lg:gap-0"
          style={{
            "--feature-panel-h": `${FEATURE_ACCORDION_PANEL_HEIGHT_PX}px`,
            "--accordion-col-left": `${FEATURE_ACCORDION_COL_SPLIT[0]}%`,
            "--accordion-col-right": `${FEATURE_ACCORDION_COL_SPLIT[1]}%`,
          }}
        >
      {/* Accordion column — 42% */}
      <ul className="feature-accordion-list-panel min-w-0 divide-y divide-[#183278]/10 border-y border-[#183278]/10 lg:flex lg:flex-col lg:justify-start">
        {FEATURES.map((f) => {
          const isOpen = f.key === activeKey;
          return (
            <li key={f.key} className="flex shrink-0 flex-col min-w-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`feature-panel-${f.key}`}
                onClick={() => setActiveKey(f.key)}
                className="flex w-full min-w-0 min-h-[5.5rem] shrink-0 cursor-pointer items-center justify-between gap-4 border-0 bg-transparent text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2 sm:min-h-[6rem]"
                style={{ paddingTop: ACCORDION_BUTTON_PAD_Y, paddingBottom: ACCORDION_BUTTON_PAD_Y }}
              >
                <span
                  className={`min-w-0 flex-1 pr-2 text-xl font-semibold transition sm:text-2xl ${
                    isOpen ? "text-[#183278]" : "text-[#3C4C78]"
                  }`}
                  style={SERIF}
                >
                  {f.title}
                </span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                    isOpen
                      ? "border-[#3166F7] bg-[#3166F7] text-white"
                      : "border-[#183278]/20 bg-white text-[#183278]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(270deg)" : "rotate(0deg)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </span>
              </button>

              {isOpen ? (
                <div className="min-w-0" style={{ paddingBottom: 15 }}>
                  <p
                    className="text-base leading-relaxed text-[#3C4C78]"
                    style={{ margin: 0 }}
                  >
                    {f.blurb}
                  </p>
                  {/* Inline below copy on < lg */}
                  <div className="mt-4 w-full max-w-full overflow-hidden lg:hidden">
                    <FeatureVisual
                      feature={active}
                      aspect={
                        active.media === "mockup"
                          ? active.mockupAspect === "3 / 4"
                            ? "aspect-[3/4]"
                            : "aspect-[25/18]"
                          : active.imageSrc
                            ? "aspect-[3/4]"
                            : "aspect-video"
                      }
                    />
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {/* Synced sticky visual — desktop only, 58% */}
      <div
        className="feature-accordion-figure-panel hidden min-h-0 min-w-0 overflow-visible lg:block"
        style={{
          paddingTop: 20,
          paddingRight: 32,
          paddingBottom: 20,
          paddingLeft: 90,
          boxSizing: "border-box",
        }}
      >
        <div className="sticky top-24 h-full min-h-0 overflow-visible">
          <FeatureVisual feature={active} layout="accordion" className="h-full w-full" />
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  3) Made for small practices — dual marquee of clinic logos   */
/* ============================================================ */
