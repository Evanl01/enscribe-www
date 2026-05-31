import { BetaOnly } from "@/components/beta-only";
import { BetaOnlyFallback } from "@/components/landing/beta-only-fallback";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata = {
  title: "EnScribe — Landing preview",
  robots: { index: false, follow: false },
};

export default function LandingPageRoute() {
  return (
    <BetaOnly fallback={<BetaOnlyFallback />}>
      <LandingPage />
    </BetaOnly>
  );
}
