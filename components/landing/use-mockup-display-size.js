"use client";

import { useEffect, useState } from "react";

function pickDisplaySize(sizeMap, lg) {
  if (lg) {
    return {
      width: sizeMap.widthLg ?? sizeMap.width,
      height: sizeMap.heightLg ?? sizeMap.height,
    };
  }
  return { width: sizeMap.width, height: sizeMap.height };
}

/** Picks mobile vs lg width/height from a FEATURE_SCROLL_PATH_MOCKUP_SIZES entry. */
export function useMockupDisplaySize(sizeMap, breakpointPx = 1024) {
  const [displaySize, setDisplaySize] = useState(() => pickDisplaySize(sizeMap, false));

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const update = () => setDisplaySize(pickDisplaySize(sizeMap, mq.matches));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [sizeMap, breakpointPx]);

  return displaySize;
}
