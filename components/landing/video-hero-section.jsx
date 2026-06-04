"use client";

import { useEffect, useRef, useState } from "react";
import { AppLink } from "@/components/landing/app-link";
import { SERIF } from "@/components/landing/constants";

const POSTER = "/videos/hero-poster.webp";
const DESKTOP_MP4 = "/videos/hero-desktop.mp4";
const DESKTOP_WEBM = "/videos/hero-desktop.webm";
const MOBILE_MP4 = "/videos/hero-mobile.mp4";

/** Toggle to compare raw iMovie export vs processed encodes. Revert before shipping. */
const USE_RAW_SOURCE_FOR_TEST = true;
const RAW_SOURCE_MP4 = "/videos/hero-source-test.mp4";

function shouldLoadVideo() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  return true;
}

/** Full-bleed looping hero video — poster first, deferred load for LCP. */
function HeroVideoBackdrop() {
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    if (!shouldLoadVideo()) return;

    const start = () => setLoadVideo(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }

    const timer = setTimeout(start, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;
    void videoRef.current.play().catch(() => {});
  }, [loadVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B1A47]">
      <img
        src={POSTER}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {loadVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          onCanPlay={() => setVideoVisible(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          {USE_RAW_SOURCE_FOR_TEST ? (
            <source src={RAW_SOURCE_MP4} type="video/mp4" />
          ) : (
            <>
              <source src={MOBILE_MP4} media="(max-width: 767px)" type="video/mp4" />
              <source src={DESKTOP_WEBM} type="video/webm" />
              <source src={DESKTOP_MP4} type="video/mp4" />
            </>
          )}
        </video>
      ) : null}

      {/* Readability gradient — darker on the left so the copy pops */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,52,0.85)_0%,rgba(8,18,52,0.65)_38%,rgba(8,18,52,0.25)_65%,rgba(8,18,52,0.05)_100%)]"
        aria-hidden
      />
    </div>
  );
}

export function VideoHeroSection() {
  return (
    <section
      className="relative h-screen min-h-[640px] w-full"
      style={{ position: "sticky", top: 0, zIndex: 0 }}
      aria-label="EnScribe hero"
    >
      <HeroVideoBackdrop />

      {/* Copy overlaid on the LEFT */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C9DF9]" aria-hidden />
              HIPAA Compliant · SOC 2 Type II
            </p>
            <h1
              className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
              style={SERIF}
            >
              Generate charts,
              <br />
              with <span className="text-[#7C9DF9]">one click.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              EnScribe frees up time in your day so you can care about what matters most – Your patients.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <AppLink
                href="/signup"
                className="inline-flex justify-center rounded-xl bg-[#3166F7] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_32px_rgba(49,102,247,0.45)] transition hover:bg-[#2751C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A47]"
              >
                Try for free
              </AppLink>
              <AppLink
                href="/login"
                className="inline-flex justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-white/55 hover:bg-white/15"
              >
                Book a demo
              </AppLink>
            </div>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
              <div className="flex -space-x-2" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-[#0B1A47] bg-gradient-to-br from-[#7C9DF9] to-[#3166F7]"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white/70">Loved by</p>
                <p className="text-lg font-bold leading-none text-white" style={SERIF}>
                  26k+ Clinicians
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
          Scroll to explore
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </section>
  );
}
