"use client";

import { useEffect, useState } from "react";
import { MOBILE_WIP_ENABLED } from "@/components/landing/constants";

const MOBILE_MAX_WIDTH_PX = 1023;

/**
 * MOBILE-WIP — blocks mobile/tablet testers until layout is ready.
 * To ship mobile: set MOBILE_WIP_ENABLED = false in constants.js (or remove this component).
 */
export function MobileWipGate() {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (!MOBILE_WIP_ENABLED) return;

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const update = () => setShowGate(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!MOBILE_WIP_ENABLED || !showGate) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="mobile-wip-title"
      aria-describedby="mobile-wip-desc"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          backgroundColor: "#183278",
          padding: "0.5rem 1rem",
          textAlign: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#ffffff",
        }}
        aria-hidden
      >
        Testers — mobile not ready
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(249, 250, 255, 0.97)",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#3166F7",
          }}
        >
          Preview only
        </p>
        <h2
          id="mobile-wip-title"
          style={{
            marginTop: "0.75rem",
            maxWidth: "20rem",
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.25,
            color: "#183278",
          }}
        >
          Mobile experience is not ready yet
        </h2>
        <p
          id="mobile-wip-desc"
          style={{
            marginTop: "1rem",
            maxWidth: "20rem",
            fontSize: "0.875rem",
            lineHeight: 1.625,
            color: "#3C4C78",
          }}
        >
          Please open this page on a desktop browser to view the landing page. Mobile layout
          work is still in progress.
        </p>
        <p
          style={{
            marginTop: "2rem",
            borderRadius: "0.5rem",
            border: "1px dashed rgba(49, 102, 247, 0.4)",
            backgroundColor: "#ffffff",
            padding: "0.75rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#4B5D99",
          }}
        >
          Devs: set <strong style={{ color: "#183278" }}>MOBILE_WIP_ENABLED</strong> to{" "}
          <strong style={{ color: "#183278" }}>false</strong> in{" "}
          <strong style={{ color: "#183278" }}>constants.js</strong>
        </p>
      </div>
    </div>
  );
}
