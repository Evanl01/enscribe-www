import { SERIF, QUOTES_TESTIMONIALS_BG_STYLE } from "@/components/landing/constants";
import { PortraitPlaceholder } from "@/components/landing/placeholders";

export function TestimonialsSection() {
  const cards = [
    {
      quote:
        "Goodbye to the avalanche of charts! EnScribe is a game-changer, costs a fraction of what others charge, with no real training needed.",
      name: "Dr. Maryam Zarei",
      role: "Allergy / Immunology",
    },
    {
      quote: "EnScribe has truly freed me from hours of writing notes!",
      name: "Julie Bailey",
      role: "Therapist",
    },
    {
      quote:
        "I get to go home to my family earlier each night thanks to EnScribe, and my patients get face-to-face contact with me.",
      name: "Dr. Dave James",
      role: "Naturopathic Physician",
    },
  ];

  return (
    <section className="relative py-24" style={QUOTES_TESTIMONIALS_BG_STYLE}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          style={SERIF}
        >
          Trusted <span className="text-[#3166F7]">by providers</span>
          <br />
          and their teams
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <figure
              key={c.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-[#183278]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <blockquote className="text-lg leading-snug text-[#183278]" style={SERIF}>
                “{c.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#183278]/8 pt-4">
                <PortraitPlaceholder size="h-11 w-11" label={`${c.name} portrait`} />
                <div>
                  <p className="text-sm font-semibold text-[#183278]">{c.name}</p>
                  <p className="text-xs text-[#4B5D99]">{c.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  7) Stats band — dark surface, oversized numbers              */
/* ============================================================ */
