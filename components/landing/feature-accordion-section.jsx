"use client";

import { useState } from "react";
import { FEATURES, SERIF } from "@/components/landing/constants";
import { VideoPlaceholder, VisualPlaceholder } from "@/components/landing/placeholders";

export function FeatureAccordionSection() {
  const [activeKey, setActiveKey] = useState(FEATURES[0].key);
  const active = FEATURES.find((f) => f.key === activeKey) ?? FEATURES[0];

  return (
    <section
      className="relative z-10 border-y border-[#183278]/8 bg-white py-20 shadow-[0_-30px_60px_-30px_rgba(11,26,71,0.45)] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Oversized stacked headline like Freed */}
        <h2
          className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
          style={SERIF}
        >
          From <span className="text-[#3166F7]">first</span>
          <br />
          visit to <span className="text-[#3166F7]">last</span>
          <br />
          note, EnScribe
          <br />
          is by your side.
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Accordion column */}
          <ul className="divide-y divide-[#183278]/10 border-y border-[#183278]/10">
            {FEATURES.map((f) => {
              const isOpen = f.key === activeKey;
              return (
                <li key={f.key}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`feature-panel-${f.key}`}
                    onClick={() => setActiveKey(f.key)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2"
                  >
                    <span
                      className={`text-xl font-semibold transition sm:text-2xl ${
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
                  <div
                    id={`feature-panel-${f.key}`}
                    role="region"
                    aria-labelledby={`feature-trigger-${f.key}`}
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="pb-6 pr-6 text-base leading-relaxed text-[#3C4C78]">{f.blurb}</p>
                      {/* Visual shown inline on small screens (sticky panel handles lg+) */}
                      <div className="pb-6 lg:hidden">
                        {active.media === "video" ? (
                          <VideoPlaceholder
                            aspect="aspect-video"
                            label={active.label}
                            spec={active.spec}
                          />
                        ) : (
                          <VisualPlaceholder
                            aspect="aspect-video"
                            label={active.label}
                            spec={active.spec}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Synced sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              {active.media === "video" ? (
                <VideoPlaceholder
                  key={active.key}
                  aspect="aspect-[4/3]"
                  label={active.label}
                  spec={active.spec}
                />
              ) : (
                <VisualPlaceholder
                  key={active.key}
                  aspect="aspect-[4/3]"
                  label={active.label}
                  spec={active.spec}
                />
              )}
              <p className="mt-4 text-xs text-[#4B5D99]">
                Visual swaps when you select a feature — sticky on scroll.
              </p>
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
