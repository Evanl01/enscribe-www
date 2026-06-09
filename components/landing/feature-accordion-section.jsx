"use client";

import { useState } from "react";
import {
  FEATURES,
  HERO_SECTION_OVERLAP_PX,
  HERO_SECTION_TOP_RADIUS_PX,
  SERIF,
} from "@/components/landing/constants";
import { FeatureVisual } from "@/components/landing/placeholders";

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

        <div className="mt-14 grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-5 lg:items-stretch lg:gap-16">
          {/* Accordion column — 2/5 (40%) */}
          <ul className="min-w-0 divide-y divide-[#183278]/10 border-y border-[#183278]/10 lg:col-span-2 lg:min-h-[32rem]">
            {FEATURES.map((f) => {
              const isOpen = f.key === activeKey;
              return (
                <li key={f.key} className="min-w-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`feature-panel-${f.key}`}
                    onClick={() => setActiveKey(f.key)}
                    className="flex w-full min-w-0 min-h-[4.5rem] cursor-pointer items-center justify-between gap-4 border-0 bg-transparent text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2 sm:min-h-[7.5rem]"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
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
                          ? "rotate-45 border-[#3166F7] bg-[#3166F7] text-white"
                          : "border-[#183278]/20 bg-white text-[#183278]"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {isOpen ? (
                    <div
                      className="min-w-0 pr-0 lg:pr-8"
                      style={{ paddingBottom: 15 }}
                    >
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

          {/* Synced sticky visual — desktop only, 3/5 (60%) */}
          <div className="hidden min-w-0 lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <FeatureVisual
                feature={active}
                aspect={
                  active.media === "mockup"
                    ? active.mockupAspect === "3 / 4"
                      ? "aspect-[3/4]"
                      : "aspect-[25/18]"
                    : "aspect-[4/3]"
                }
              />
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
