"use client";

import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { VideoHeroSection } from "@/components/landing/video-hero-section";
import { FeatureScrollPathSection } from "@/components/landing/feature-scroll-path-section";
import { SmallPracticesSection } from "@/components/landing/small-practices-section";
import { ClinicianQuoteBands } from "@/components/landing/clinician-quote-bands";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { StatsSection } from "@/components/landing/stats-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { BetaOnly } from "@/components/beta-only";
import { LandingBetaWip } from "@/components/landing/landing-beta-wip";
import {
  LANDING_FEATURES_ANCHOR_ID,
  LANDING_FEATURES_SCROLL_LIFT_PX,
} from "@/components/landing/constants";

/** Copy of landing-page.jsx with FeatureScrollPathSection instead of FeatureAccordionSection. */
export function LandingPage2() {
  return (
    <div className="min-h-screen bg-[#F9FAFF] text-[#183278] antialiased">
      <LandingHeader />
      <main className="relative">
        {/* h-screen wrapper limits sticky hero to the first viewport — stops video bleeding into later sections */}
        <div className="relative z-0 h-screen w-full shrink-0">
          <VideoHeroSection />
        </div>
        {/* No bg on wrapper — hero must show through features section rounded top corners */}
        <div className="relative isolate z-[1]">
          <span
            id={LANDING_FEATURES_ANCHOR_ID}
            aria-hidden
            className="pointer-events-none absolute left-0"
            style={{
              top: -LANDING_FEATURES_SCROLL_LIFT_PX,
              width: 0,
              height: 0,
            }}
          />
          <FeatureScrollPathSection />
          <SmallPracticesSection />
          <BetaOnly>
            <>
              <ClinicianQuoteBands />
              <TestimonialsSection />
            </>
          </BetaOnly>
          <StatsSection />
          <PricingSection />
          <FinalCtaSection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
