import { SERIF } from "@/components/landing/constants";
import { LogoChip } from "@/components/landing/placeholders";

export function SmallPracticesSection() {
  const rowA = [
    "Behavioral Health Solutions",
    "Camarena Health",
    "Community Health Centers",
    "Fulton County Health",
    "Vista Community Clinic",
    "Entira Family Clinics",
    "Family Health Services",
    "Full Circle Health",
  ];
  const rowB = [
    "Guam Regional Medical City",
    "Healthy Minds",
    "Neighborhood Health",
    "University of Virginia",
    "Tanner Clinic",
    "North Country Healthcare",
    "Orlando Health",
    "The Iowa Clinic",
  ];

  return (
    <section className="bg-[#F9FAFF] py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-4xl font-semibold leading-[1] tracking-tight sm:text-6xl"
            style={SERIF}
          >
            Made for <span className="text-[#3166F7]">small practices</span>
          </h2>
          <p className="mt-5 text-[#3C4C78] leading-relaxed">
            You might not recognize the clinics we work with — that&apos;s on purpose. EnScribe is
            built to bring focus back to community care, one local clinic at a time.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-4 overflow-hidden">
        {[
          { row: rowA, dir: "marquee-l" },
          { row: rowB, dir: "marquee-r" },
        ].map(({ row, dir }, idx) => (
          <div key={idx} className="relative overflow-hidden">
            <div className={`flex w-max gap-3 ${dir}`}>
              {[...row, ...row, ...row].map((name, i) => (
                <LogoChip key={`${idx}-${i}`}>{name}</LogoChip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  4) Three big quote panels — full-bleed alternating layout    */
/* ============================================================ */
