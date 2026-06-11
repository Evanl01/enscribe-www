import { PRICING_TIERS, SERIF } from "@/components/landing/constants";
import { AppLink } from "@/components/landing/app-link";

export function PricingSection() {
  return (
    <section
      className="border-t border-[#183278]/8 bg-[#F9FAFF] py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
            Join the growing community of over 26,000 providers using
            EnScribe to revolutionize the way they document patient visits
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRICING_TIERS.map((t) => {
            const cadence = t.price === "Custom" ? "" : "/mo";
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
                  <span
                    className="text-4xl font-semibold text-[#183278]"
                    style={SERIF}
                  >
                    {t.price}
                  </span>
                  {cadence ? (
                    <span className="text-sm font-medium text-[#4B5D99]">
                      {cadence}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#3C4C78]">
                  {t.blurb}
                </p>
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
