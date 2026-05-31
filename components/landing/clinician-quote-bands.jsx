import { SERIF } from "@/components/landing/constants";
import { PortraitPlaceholder, VisualPlaceholder } from "@/components/landing/placeholders";

export function ClinicianQuoteBands() {
  const bands = [
    {
      kicker: "Designed and trained by clinicians",
      quote:
        "I’ve used several AI based scribe programs and this is by far the best of the bunch!",
      name: "Dr. Ramy Mansour",
      role: "Gastroenterology",
      bg: "bg-white",
    },
    {
      kicker: "Enhanced scribe accuracy",
      quote:
        "It feels as though I have a personal scribe in the background capturing the details.",
      name: "Nadine A Smith",
      role: "PMHNP-BC",
      bg: "bg-[#F9FAFF]",
    },
    {
      kicker: "US-based human support",
      quote:
        "The EnScribe team has been quick to address my issues and expedient in solving them. I really appreciate them!",
      name: "Kathleen McCoy",
      role: "NP",
      bg: "bg-white",
    },
  ];

  return (
    <section aria-label="Clinician quotes">
      {bands.map((b, i) => (
        <div key={b.kicker} className={`${b.bg} border-t border-[#183278]/8`}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-xs font-bold uppercase tracking-wider text-[#3166F7]">
                {b.kicker}
              </p>
              <blockquote
                className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl"
                style={SERIF}
              >
                “{b.quote}”
              </blockquote>
              <div className="mt-7 flex items-center gap-3">
                <PortraitPlaceholder label={`${b.name} portrait`} />
                <div>
                  <p className="text-sm font-semibold text-[#183278]">{b.name}</p>
                  <p className="text-xs text-[#4B5D99]">{b.role}</p>
                </div>
              </div>
            </div>
            <VisualPlaceholder
              aspect="aspect-[4/3]"
              label={`Clinician photo ${i + 1}`}
              spec="Editorial portrait of clinician in their environment (exam room, charting nook, virtual visit). Natural light, anonymized screens."
              className={i % 2 === 1 ? "lg:order-1" : ""}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

/* ============================================================ */
/*  5) Founder story — portrait + signed letter                  */
/* ============================================================ */
