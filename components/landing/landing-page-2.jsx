"use client";

import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { VideoHeroSection } from "@/components/landing/video-hero-section";
import { FeatureAccordionSection } from "@/components/landing/feature-accordion-section";
import { SmallPracticesSection } from "@/components/landing/small-practices-section";
import { ClinicianQuoteBands } from "@/components/landing/clinician-quote-bands";
import { FounderStorySection } from "@/components/landing/founder-story-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { StatsSection } from "@/components/landing/stats-section";
import { PressSection } from "@/components/landing/press-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";

export function LandingPage2() {
  return (
    <div className="min-h-screen bg-[#F9FAFF] text-[#183278] antialiased">
      <LandingHeader />
      <main className="relative">
        <VideoHeroSection />
        <div className="relative z-10">
          <FeatureAccordionSection />
          <SmallPracticesSection />
          <ClinicianQuoteBands />
          <FounderStorySection />
          <TestimonialsSection />
          <StatsSection />
          <PressSection />
          <PricingSection />
          <FinalCtaSection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
