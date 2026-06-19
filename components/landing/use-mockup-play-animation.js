"use client";

import { useEffect, useState } from "react";

/**
 * Typing animation for landing mockups.
 * Omit playAnimations to run on mount (accordion). Pass playAnimations to gate on scroll-path focus.
 */
export function useMockupTypingAnimation({
  animateTyping = true,
  playAnimations,
  fullLength,
  intervalMs,
}) {
  const gated = playAnimations !== undefined;

  const [typedChars, setTypedChars] = useState(() => {
    if (!animateTyping) return fullLength;
    if (gated && !playAnimations) return fullLength;
    return 0;
  });

  useEffect(() => {
    if (!animateTyping) {
      setTypedChars(fullLength);
      return;
    }

    if (gated && !playAnimations) {
      setTypedChars(fullLength);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedChars(fullLength);
      return;
    }

    setTypedChars(0);
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setTypedChars(count);
      if (count >= fullLength) window.clearInterval(id);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [animateTyping, gated, playAnimations, fullLength, intervalMs]);

  return typedChars;
}

/** Pulse / emphasis animation — same playAnimations contract as typing. */
export function useMockupPulseAnimation({
  animate = true,
  playAnimations,
  delayMs = 0,
}) {
  const gated = playAnimations !== undefined;
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!animate) {
      setActive(false);
      return;
    }

    if (gated && !playAnimations) {
      setActive(false);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    setActive(false);
    const id = window.setTimeout(() => setActive(true), delayMs);
    return () => window.clearTimeout(id);
  }, [animate, gated, playAnimations, delayMs]);

  return active;
}
