import { BetaOnly } from "@/components/beta-only";
import { BetaOnlyFallback } from "@/components/landing/beta-only-fallback";
import { LandingPage2 } from "@/components/landing/landing-page-2";

export const metadata = {
  title: "EnScribe — Landing preview",
  robots: { index: false, follow: false },
};

export default function LandingPage2Route() {
  return (
    <BetaOnly fallback={<BetaOnlyFallback />}>
      <LandingPage2 />
    </BetaOnly>
  );
}
