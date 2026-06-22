"use client";

import { AppLink } from "@/components/landing/app-link";
import {
  LANDING_BOOK_DEMO_MAILTO,
  LANDING_TRY_FOR_FREE_HREF,
  SERIF,
} from "@/components/landing/constants";

export function FinalCtaSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F9FAFF] py-24">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="font-semibold tracking-tight" style={SERIF}>
          <span className="text-5xl text-[#3166F7] sm:text-6xl">EnScribe.</span>
          <br />
          <span className="text-4xl sm:text-5xl">Say Goodbye to After-Hours Charting.</span>
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AppLink
            href={LANDING_TRY_FOR_FREE_HREF}
            className="inline-flex justify-center rounded-xl bg-[#183278] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#14285F]"
          >
            Try for free
          </AppLink>
          <a
            href={LANDING_BOOK_DEMO_MAILTO}
            className="inline-flex justify-center rounded-xl border border-[#183278]/20 bg-white px-7 py-4 text-base font-semibold text-[#183278] transition hover:border-[#183278]/35"
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Composition                                                  */
/* ============================================================ */
