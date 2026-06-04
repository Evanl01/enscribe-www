import { BetaOnly } from "@/components/beta-only";
import { BetaOnlyFallback } from "@/components/landing/beta-only-fallback";
import { LandingPage2 } from "@/components/landing/landing-page-2";

export const metadata = {
  title: "EnScribe — Landing preview",
  robots: { index: false, follow: false },
};

export default function LandingPage2Route() {
  return (
    <>
      <link rel="preload" as="image" href="/videos/hero-poster.webp" type="image/webp" />
      <BetaOnly fallback={<BetaOnlyFallback />}>
        <LandingPage2 />
      </BetaOnly>
    </>
  );
}
