"use client";

import { AppLink } from "@/components/landing/app-link";
import { SERIF } from "@/components/landing/constants";

export function FinalCtaSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F9FAFF] py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl" style={SERIF}>
          Free yourself for
          <br />
          <span className="text-[#3166F7]">better things</span>
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AppLink
            href="/signup"
            className="inline-flex justify-center rounded-xl bg-[#183278] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#14285F]"
          >
            Try for free
          </AppLink>
          <AppLink
            href="/login"
            className="inline-flex justify-center rounded-xl border border-[#183278]/20 bg-white px-7 py-4 text-base font-semibold text-[#183278] transition hover:border-[#183278]/35"
          >
            Book a demo
          </AppLink>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Composition                                                  */
/* ============================================================ */
