import { BetaOnly } from "@/components/beta-only";
import { BetaOnlyFallback } from "@/components/landing/beta-only-fallback";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata = {
  title: "EnScribe — Landing preview",
  robots: { index: false, follow: false },
};

export default function LandingPageRoute() {
  return (
    <>
      <link rel="preload" as="image" href="/videos/hero-poster-4k.webp" type="image/webp" />
      <BetaOnly fallback={<BetaOnlyFallback />}>
        <LandingPage />
      </BetaOnly>
    </>
  );
}
