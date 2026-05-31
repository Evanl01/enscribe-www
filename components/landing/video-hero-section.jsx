"use client";

import { AppLink } from "@/components/landing/app-link";
import { SERIF } from "@/components/landing/constants";

/** Full-bleed video backdrop styled to feel like a real <video> autoplay. */
function HeroVideoBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B1A47]">
      {/* Faux video poster — replace with <video autoPlay muted loop playsInline poster="…" /> */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,157,249,0.45),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(49,102,247,0.40),transparent_55%),linear-gradient(135deg,#0B1A47_0%,#14285F_55%,#183278_100%)]"
        aria-hidden
      />

      {/* Subtle grain / scanline accent for "video" feel */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />

      {/* Center play affordance — placeholder hint that this is the hero video */}
      <button
        type="button"
        aria-label="Play product video"
        className="group absolute right-[8%] top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_25px_60px_rgba(11,26,71,0.55)] transition hover:scale-105 md:flex md:h-24 md:w-24 lg:h-28 lg:w-28"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-10 w-10 fill-[#183278]" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      {/* Faux progress bar bottom-right */}
      <div className="absolute bottom-6 right-6 hidden items-center gap-3 rounded-lg bg-black/35 px-3 py-2 backdrop-blur md:flex">
        <span className="h-1.5 w-40 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-[38%] rounded-full bg-white/80" />
        </span>
        <span className="text-[10px] font-medium text-white/80">0:34 / 1:28</span>
      </div>

      {/* Readability gradient — darker on the left so the copy pops */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,52,0.85)_0%,rgba(8,18,52,0.65)_38%,rgba(8,18,52,0.25)_65%,rgba(8,18,52,0.05)_100%)]"
        aria-hidden
      />

      {/* Spec tag — describes the asset we want to ship */}
      <div className="absolute left-6 top-6 rounded-md border border-white/15 bg-[#0B1A47]/70 px-3 py-2 backdrop-blur">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C9DF9]">Hero video</p>
        <p className="mt-0.5 max-w-xs text-[11px] leading-snug text-white/80">
          Looping 60–90s product demo: clinician finishes a visit, opens EnScribe, the note appears,
          one-click push to EHR. Muted, autoplay, with a reduce-motion poster.
        </p>
      </div>
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
              EnScribe frees up time in your day so you can care about what matters most – Your patients.
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
