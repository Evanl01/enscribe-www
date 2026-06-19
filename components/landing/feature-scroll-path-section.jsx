"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FEATURE_SCROLL_PATH_VISUAL_PAD,
  FEATURES,
  getFeatureScrollPathMockupSize,
  getFeatureScrollPathSlotSize,
  HERO_SECTION_OVERLAP_PX,
  HERO_SECTION_TOP_RADIUS_PX,
  LANDING_STICKY_HEADER_PX,
  LANDING_WHITE_SECTION_BG,
  SERIF,
} from "@/components/landing/constants";
import { FeatureVisual } from "@/components/landing/placeholders";
import { useMockupDisplaySize } from "@/components/landing/use-mockup-display-size";
import "@/components/landing/feature-scroll-path.css";

function formatStepNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function scrollPathVisualStyle(feature) {
  const sizeMap = getFeatureScrollPathMockupSize(feature.mockupKey);
  const mobile = getFeatureScrollPathSlotSize(sizeMap, false);
  const desktop = getFeatureScrollPathSlotSize(sizeMap, true);

  return {
    "--scroll-visual-w": `${mobile.slotWidth}px`,
    "--scroll-visual-h": `${mobile.slotHeight}px`,
    "--scroll-visual-w-lg": `${desktop.slotWidth}px`,
    "--scroll-visual-h-lg": `${desktop.slotHeight}px`,
    "--scroll-visual-pad-t": `${FEATURE_SCROLL_PATH_VISUAL_PAD.top}px`,
    "--scroll-visual-pad-r": `${FEATURE_SCROLL_PATH_VISUAL_PAD.right}px`,
    "--scroll-visual-pad-b": `${FEATURE_SCROLL_PATH_VISUAL_PAD.bottom}px`,
    "--scroll-visual-pad-l": `${FEATURE_SCROLL_PATH_VISUAL_PAD.left}px`,
  };
}

function ScrollPathFeatureVisual({ feature, isActive }) {
  const sizeMap = getFeatureScrollPathMockupSize(feature.mockupKey);
  const displaySize = useMockupDisplaySize(sizeMap);

  return (
    <FeatureVisual
      feature={feature}
      layout="scrollPath"
      displaySize={displaySize}
      playAnimations={isActive}
    />
  );
}

export function FeatureScrollPathSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const visibilityRef = useRef(new Map());

  const setStepRef = useCallback((index) => {
    return (node) => {
      stepRefs.current[index] = node;
    };
  }, []);

  useEffect(() => {
    const visibility = visibilityRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.stepIndex);
          visibility.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestIndex = 0;
        let bestRatio = -1;

        FEATURES.forEach((_, index) => {
          const ratio = visibility.get(index) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        setActiveIndex(bestIndex);
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    stepRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = useCallback((index) => {
    const node = stepRefs.current[index];
    if (!node) return;
    node.style.scrollMarginTop = `${LANDING_STICKY_HEADER_PX + 24}px`;
    node.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section
      className="relative z-20 overflow-x-clip py-20 sm:py-28"
      style={{
        marginTop: -HERO_SECTION_OVERLAP_PX,
        borderTopLeftRadius: HERO_SECTION_TOP_RADIUS_PX,
        borderTopRightRadius: HERO_SECTION_TOP_RADIUS_PX,
        backgroundColor: LANDING_WHITE_SECTION_BG,
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
          className="feature-scroll-path-track mt-14 sm:mt-16"
          style={{
            "--scroll-step-gap": "4rem",
          }}
        >
          {FEATURES.map((feature, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isMuted = !isActive;

            return (
              <article
                key={feature.key}
                ref={setStepRef(index)}
                data-step-index={index}
                id={`feature-${feature.key}`}
                aria-labelledby={`feature-title-${feature.key}`}
                className={`feature-scroll-step${isMuted ? " is-muted" : " is-active"}`}
                style={{
                  ...scrollPathVisualStyle(feature),
                }}
              >
                <div className="feature-scroll-node-col">
                  <div
                    aria-hidden
                    className={`feature-scroll-line-segment feature-scroll-line-above${
                      isPast || isActive ? " is-filled" : ""
                    }`}
                  />

                  <button
                    type="button"
                    className={`feature-scroll-node${isPast ? " is-past" : ""}${isActive ? " is-active" : ""}`}
                    aria-label={`Go to ${feature.title}`}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => scrollToStep(index)}
                  >
                    {formatStepNumber(index)}
                  </button>

                  {index < FEATURES.length - 1 ? (
                    <div
                      aria-hidden
                      className={`feature-scroll-line-segment feature-scroll-line-below${
                        isPast ? " is-filled" : ""
                      }`}
                    />
                  ) : (
                    <div aria-hidden className="feature-scroll-line-segment feature-scroll-line-below" />
                  )}
                </div>

                <div className="feature-scroll-step-body">
                  <div className="feature-scroll-step-inner">
                    <div className="feature-scroll-step-copy">
                      <h3
                        id={`feature-title-${feature.key}`}
                        className={`text-xl font-semibold leading-tight transition-colors sm:text-2xl ${
                          isActive ? "text-[#183278]" : "text-[#3C4C78]"
                        }`}
                        style={SERIF}
                      >
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#3C4C78]">{feature.blurb}</p>
                    </div>

                    <div className="feature-scroll-step-visual-col">
                      <div className="feature-scroll-step-visual">
                        <ScrollPathFeatureVisual feature={feature} isActive={isActive} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
