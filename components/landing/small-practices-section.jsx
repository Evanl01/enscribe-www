import { SERIF } from "@/components/landing/constants";

const SPECIALTIES = [
  "Cardiology",
  "Critical Care",
  "Dentistry",
  "Dermatology",
  "Emergency Medicine",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Hospitalist",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Orthopedic Surgery",
  "Palliative Medicine",
  "Pediatrics",
  "Physical Therapy",
  "Podiatry",
  "Psychiatry",
  "Rheumatology",
  "Urology",
  "Wound Care",
];

const CHIP_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  fontSize: "0.8125rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
};

const CHIP_NEUTRAL_STYLE = {
  ...CHIP_STYLE,
  backgroundColor: "#ffffff",
  border: "1px solid rgba(24, 50, 120, 0.14)",
  color: "#183278",
  boxShadow: "0 2px 8px rgba(11, 26, 71, 0.08)",
};

const CHIP_ACCENT_STYLE = {
  ...CHIP_STYLE,
  backgroundColor: "rgba(49, 102, 247, 0.16)",
  color: "#183278",
  boxShadow: "inset 0 0 0 1px rgba(49, 102, 247, 0.3)",
};

const CHIP_CLOUD_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  columnGap: "1rem",
  rowGap: "0.75rem",
};

function SpecialtyChip({ children, highlighted }) {
  return (
    <span style={highlighted ? CHIP_ACCENT_STYLE : CHIP_NEUTRAL_STYLE}>{children}</span>
  );
}

export function SmallPracticesSection() {
  return (
    <section className="bg-[#F9FAFF] py-20" aria-label="Clinical specialties">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2
            className="mx-auto max-w-5xl text-4xl font-semibold leading-[1] tracking-tight sm:text-6xl"
            style={SERIF}
          >
            Customized to support clinicians across{" "}
            <span className="text-[#3166F7]">all specialties</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-[#3C4C78] leading-relaxed">
            EnScribe supports clinical workflows across medical, dental, surgical, and procedural
            specialties. We help care teams reduce documentation load, improve coordination, and
            deliver better care at scale.
          </p>
        </div>

        <div className="mt-12" style={CHIP_CLOUD_STYLE}>
          {SPECIALTIES.map((name, i) => (
            <SpecialtyChip key={name} highlighted={i % 2 === 0}>
              {name}
            </SpecialtyChip>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  4) Three big quote panels — full-bleed alternating layout    */
/* ============================================================ */
