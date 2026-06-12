"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AppLink } from "@/components/landing/app-link";
import {
  HERO_SECTION_OVERLAP_PX,
  LANDING_FEATURES_ANCHOR_ID,
  LANDING_STICKY_HEADER_PX,
  LANDING_TRY_FOR_FREE_HREF,
  SERIF,
} from "@/components/landing/constants";

const POSTER = "/videos/hero-poster-4k.webp";
const DESKTOP_MP4 = "/videos/hero-desktop-4k.mp4";
const DESKTOP_WEBM = "/videos/hero-desktop-4k.webm";
const MOBILE_MP4 = "/videos/hero-mobile-4k.mp4";
const MD_MEDIA = "(min-width: 768px)";

/** Fixed width = widest label ("Book a demo"); both CTAs match. */
const CTA_CLASS =
  "inline-flex w-[12.5rem] items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold";

const HERO_OVERLAP = HERO_SECTION_OVERLAP_PX;
/** Clears feature-section overlap + scroll pill. */
const HERO_BOTTOM_INSET = `calc(${HERO_OVERLAP}px + 5% + 2.5rem)`;

function subscribeMd(cb) {
  const mq = window.matchMedia(MD_MEDIA);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMdSnapshot() {
  return window.matchMedia(MD_MEDIA).matches;
}

function useIsMdUp() {
  return useSyncExternalStore(subscribeMd, getMdSnapshot, () => false);
}

function scrollToFeaturesAnchor(event) {
  event.preventDefault();

  const target = document.getElementById(LANDING_FEATURES_ANCHOR_ID);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top =
    target.getBoundingClientRect().top + window.scrollY - LANDING_STICKY_HEADER_PX;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });

  history.replaceState(null, "", `#${LANDING_FEATURES_ANCHOR_ID}`);
}

function HeroCtaButtons() {
  return (
    <>
      <Link
        href={LANDING_TRY_FOR_FREE_HREF}
        className={`${CTA_CLASS} bg-[#3166F7] text-white shadow-[0_12px_32px_rgba(49,102,247,0.45)] transition hover:bg-[#2751C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A47]`}
        style={{ width: "12.5rem" }}
      >
        Try for free
      </Link>
      <AppLink
        href="/login"
        className={`${CTA_CLASS} border border-white/30 bg-white/10 text-white backdrop-blur transition hover:border-white/55 hover:bg-white/15`}
        style={{ width: "12.5rem" }}
      >
        Book a demo
      </AppLink>
    </>
  );
}

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
          <source src={MOBILE_MP4} media="(max-width: 767px)" type="video/mp4" />
          <source src={DESKTOP_WEBM} type="video/webm" />
          <source src={DESKTOP_MP4} type="video/mp4" />
        </video>
      ) : null}

      {/* Dark scrim — inline styles (Tailwind arbitrary bg was not applying) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,18,52,0.88) 0%, rgba(8,18,52,0.68) 38%, rgba(8,18,52,0.42) 65%, rgba(8,18,52,0.15) 100%), rgba(8,18,52,0.01)",
        }}
        aria-hidden
      />
    </div>
  );
}

function HeroTrustBadges() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-medium tracking-wide text-white/90">
        HIPAA Compliant · SOC 2 Type II
      </p>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-8 w-8 rounded-full border-2 border-[#0B1A47] bg-gradient-to-br from-[#7C9DF9] to-[#3166F7]"
            />
          ))}
        </div>
        <p className="text-sm text-white/85">
          <span className="text-white/65">Loved by </span>
          <span className="font-semibold text-white" style={SERIF}>
            26k+ Clinicians
          </span>
        </p>
      </div>
    </div>
  );
}

export function VideoHeroSection() {
  const isMdUp = useIsMdUp();

  return (
    <section
      className="relative h-screen min-h-[640px] w-full"
      style={{ position: "sticky", top: 0, zIndex: 0 }}
      aria-label="EnScribe hero"
    >
      <HeroVideoBackdrop />

      {/* Left overlay — headline top, trust bottom (md+) */}
      <div
        className="absolute flex flex-col justify-between"
        style={{
          zIndex: 10,
          top: "9%",
          left: "8%",
          right: isMdUp ? "42%" : "8%",
          bottom: HERO_BOTTOM_INSET,
        }}
      >
        <div
          className="text-white"
          style={{
            alignSelf: "flex-start",
            minWidth: 0,
            maxWidth: isMdUp ? "36rem" : "17rem",
          }}
        >
          <h1
            className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ ...SERIF, maxWidth: "100%" }}
          >
            Generate charts,
            <br />
            with <span className="text-[#7C9DF9]">one click.</span>
          </h1>
          <p
            className="mt-5 text-lg leading-relaxed text-white/85"
            style={{ maxWidth: "100%" }}
          >
            EnScribe frees up time in your day so you can care about what matters most – Your patients.
          </p>
        </div>

        {isMdUp ? <HeroTrustBadges /> : null}
      </div>

      {/* CTAs — mobile: bottom-left; md+: bottom-right */}
      <div
        className="absolute flex w-[12.5rem] flex-col gap-3"
        style={{
          zIndex: 10,
          left: isMdUp ? undefined : "8%",
          right: isMdUp ? "6%" : undefined,
          bottom: HERO_BOTTOM_INSET,
          alignItems: isMdUp ? "stretch" : "flex-start",
        }}
      >
        <HeroCtaButtons />
      </div>

      {/* Scroll hint */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ zIndex: 10, bottom: HERO_OVERLAP + 16 }}
      >
        <a
          href={`#${LANDING_FEATURES_ANCHOR_ID}`}
          onClick={scrollToFeaturesAnchor}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur transition hover:border-white/40 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A47]"
        >
          Scroll to explore
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
