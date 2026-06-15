"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  BILLING_CANVAS,
  BILLING_LAYOUT,
  BillingSuggestionsMockup,
} from "@/components/landing/billing-suggestions-mockup";
import {
  DOCS_CANVAS,
  DOCS_LAYOUT,
  GenerateDocumentsPanel,
} from "@/components/landing/generate-documents-mockup";
import { computeContainedScale } from "@/components/landing/mockup-scale";

/** Composite layout footprint width — layout box for panel positioning. */
export const CODING_LETTERS_FEATURE_LAYOUT_WIDTH = DOCS_CANVAS.width;

const DOCS_STACK_HEIGHT = DOCS_CANVAS.height + DOCS_LAYOUT.paddingBottom;

const FEATURE_FOOTPRINT_HEIGHT = Math.max(
  DOCS_LAYOUT.top + DOCS_STACK_HEIGHT,
  BILLING_LAYOUT.offsetY + BILLING_CANVAS.height,
);

/** Layout box — panel positions only; shadows overflow into accordion padding. */
const FEATURE_LAYOUT = {
  width: CODING_LETTERS_FEATURE_LAYOUT_WIDTH,
  height: FEATURE_FOOTPRINT_HEIGHT,
};

const FEATURE_LAYOUT_FOOTPRINT = {
  width: CODING_LETTERS_FEATURE_LAYOUT_WIDTH + Math.max(0, BILLING_LAYOUT.offsetX),
  height: FEATURE_FOOTPRINT_HEIGHT,
};

/** Composite design canvas (width × height) — derived from panels, offsets, and overlap. */
export const CODING_LETTERS_CANVAS = {
  width: FEATURE_LAYOUT_FOOTPRINT.width,
  height: FEATURE_LAYOUT_FOOTPRINT.height,
};

/** Max rendered width when used outside the accordion contain slot. */
export const CODING_LETTERS_MAX_WIDTH = BILLING_CANVAS.width + 40;

/** Billing + generate-documents overlay for the Coding & letters accordion visual. */
export function CodingLettersFeatureMockup({ className = "", fit }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const contain = fit === "contain";

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      setScale(
        contain
          ? computeContainedScale(rect, FEATURE_LAYOUT_FOOTPRINT)
          : Math.min(rect.width, CODING_LETTERS_MAX_WIDTH) / FEATURE_LAYOUT_FOOTPRINT.width,
      );
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contain]);

  const scaledWidth = Math.ceil(FEATURE_LAYOUT_FOOTPRINT.width * scale);
  const scaledHeight = Math.ceil(FEATURE_LAYOUT_FOOTPRINT.height * scale);

  const viewport = (
    <div
      className="relative m-0 overflow-visible p-0"
      style={{
        width: scaledWidth,
        height: scaledHeight,
        flexShrink: 0,
      }}
    >
      <div
        className="absolute left-0 top-0 m-0 p-0"
        style={{
          width: FEATURE_LAYOUT_FOOTPRINT.width,
          height: FEATURE_LAYOUT_FOOTPRINT.height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative overflow-visible"
          style={{ width: FEATURE_LAYOUT.width, height: FEATURE_LAYOUT.height }}
        >
          <div
            className="absolute"
            style={{
              left: DOCS_LAYOUT.left,
              top: DOCS_LAYOUT.top,
              paddingBottom: DOCS_LAYOUT.paddingBottom,
              zIndex: 1,
            }}
          >
            <GenerateDocumentsPanel />
          </div>

          <div
            className="absolute"
            style={{
              top: BILLING_LAYOUT.offsetY,
              right: -BILLING_LAYOUT.offsetX,
              zIndex: 2,
            }}
          >
            <BillingSuggestionsMockup />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`m-0 h-full w-full p-0 ${contain ? "flex items-start justify-end" : "relative"} ${className}`.trim()}
      style={
        contain
          ? undefined
          : {
              maxWidth: CODING_LETTERS_MAX_WIDTH,
              width: scaledWidth,
              height: scaledHeight,
            }
      }
    >
      {viewport}
    </div>
  );
}
