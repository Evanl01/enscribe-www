/** Scale mockup content to fit within a container (width + height). */
export function computeContainedScale(
  container,
  content,
  maxWidth = Infinity,
) {
  const { width: containerW, height: containerH } = container;
  const { width: contentW, height: contentH } = content;

  if (contentW <= 0) return 1;

  const targetW = Math.min(containerW, maxWidth);
  const widthScale = targetW / contentW;

  if (containerH <= 0 || contentH <= 0) return widthScale;

  return Math.min(widthScale, containerH / contentH);
}

/**
 * Room for card box-shadow — matches `0 18px 40px` tokens (offset-y 18 + blur 40).
 * 48px was too small and shadows were clipped inside the viewport.
 */
export const MOCKUP_SHADOW_BLEED_PX = 64;

/** Bleed only on right/bottom — content stays pinned top-left. */
export const MOCKUP_SHADOW_BLEED_TOP_LEFT = {
  top: 0,
  left: 0,
  right: MOCKUP_SHADOW_BLEED_PX,
  bottom: MOCKUP_SHADOW_BLEED_PX,
};

/**
 * Expand a layout footprint so shadows fit inside the scaled viewport without clipping.
 * Pass a number for uniform bleed, or edge insets (e.g. MOCKUP_SHADOW_BLEED_TOP_LEFT).
 */
export function expandFootprintWithShadowBleed(
  footprint,
  bleed = MOCKUP_SHADOW_BLEED_PX,
) {
  const edges =
    typeof bleed === "number"
      ? { top: bleed, right: bleed, bottom: bleed, left: bleed }
      : bleed;

  return {
    width: footprint.width + edges.left + edges.right,
    height: footprint.height + edges.top + edges.bottom,
    bleed: edges,
  };
}

/** Layout footprint + viewport sized for shadow bleed (scale to viewport). */
export function mockupViewports(
  layout,
  bleed = MOCKUP_SHADOW_BLEED_TOP_LEFT,
) {
  const viewport = expandFootprintWithShadowBleed(layout, bleed);
  return { layout, viewport };
}
