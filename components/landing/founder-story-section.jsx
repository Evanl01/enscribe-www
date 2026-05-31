import { SERIF } from "@/components/landing/constants";
import { VisualPlaceholder } from "@/components/landing/placeholders";

export function FounderStorySection() {
  return (
    <section className="border-y border-[#183278]/8 bg-[#F9FAFF] py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
        <VisualPlaceholder
          aspect="aspect-[4/5]"
          label="Founder portrait"
          spec="Warm, candid photo (founder + spouse, or co-founders together). Avoid corporate headshots."
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#3166F7]">Built with love</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl" style={SERIF}>
            For the clinicians we love.
          </h2>
          <p className="mt-5 text-[#3C4C78] leading-relaxed">
            EnScribe was built for (and with the help of) clinicians watching their colleagues
            chart at night for too many years. We&apos;re not designed to make you more productive,
            make you more money, or make you a better clinician.
          </p>
          <p className="mt-3 text-[#3C4C78] leading-relaxed">
            Our only goal is to build tools that make clinicians happier.
          </p>
          <p className="mt-6 text-sm font-semibold text-[#183278]">
            The EnScribe Team
            <span className="ml-2 font-normal text-[#4B5D99]">· Founders</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  6) Testimonial card grid                                     */
/* ============================================================ */
