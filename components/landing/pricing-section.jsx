"use client";

import { useState } from "react";
import { PRICING_TIERS, SERIF } from "@/components/landing/constants";
import { AppLink } from "@/components/landing/app-link";

export function PricingSection() {
  const [period, setPeriod] = useState("monthly");

  return (
    <section className="border-t border-[#183278]/8 bg-[#F9FAFF] py-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2
              id="pricing-heading"
              className="text-4xl font-semibold leading-[1] tracking-tight sm:text-6xl"
              style={SERIF}
            >
              Priced to help you
              <br />
              <span className="text-[#3166F7]">care</span>
            </h2>
            <p className="mt-5 text-[#3C4C78]">
              With EnScribe, small and midsized clinics get the technology and support of big orgs
              without the big overhead.
            </p>
          </div>

          {/* Monthly / Annual toggle */}
          <div
            role="tablist"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-[#183278]/15 bg-white p-1 shadow-sm"
          >
            {[
              { id: "monthly", label: "Monthly" },
              { id: "annual", label: "Annually" },
            ].map((p) => {
              const isActive = period === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPeriod(p.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] ${
                    isActive
                      ? "bg-[#183278] text-white shadow"
                      : "text-[#3C4C78] hover:text-[#183278]"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((t) => {
            const price = period === "annual" ? t.annual : t.monthly;
            const cadence = price === "Custom" ? "" : "/mo";
            const showAnnualNote = period === "annual" && t.monthly !== t.annual && t.annual !== "Custom";
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition ${
                  t.highlight
                    ? "border-[#3166F7] bg-white shadow-[0_24px_50px_rgba(49,102,247,0.18)]"
                    : "border-[#183278]/10 bg-white shadow-sm"
                }`}
              >
                {t.highlight ? (
                  <span className="absolute -top-3 left-6 inline-flex rounded-full bg-[#3166F7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                ) : null}
                <p className="text-sm font-semibold text-[#4B5D99]">{t.name}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-[#183278]" style={SERIF}>
                    {price}
                  </span>
                  {cadence ? (
                    <span className="text-sm font-medium text-[#4B5D99]">{cadence}</span>
                  ) : null}
                </p>
                {showAnnualNote ? (
                  <p className="mt-1 text-xs font-medium text-[#3166F7]">
                    Billed annually · save vs. monthly
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-[#3C4C78]">{t.blurb}</p>
                <AppLink
                  href={t.href}
                  className={`mt-6 inline-flex justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2 ${
                    t.highlight
                      ? "bg-[#3166F7] text-white hover:bg-[#2751C4]"
                      : "border border-[#183278]/15 bg-white text-[#183278] hover:border-[#183278]/35"
                  }`}
                >
                  {t.cta}
                </AppLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  10) Final CTA                                                */
/* ============================================================ */
