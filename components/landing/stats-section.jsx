import { SERIF } from "@/components/landing/constants";

export function StatsSection() {
  const stats = [
    { value: "32,589,627", label: "patient visits transcribed in 2025" },
    { value: "5.9 million", label: "hours returned to clinicians each year" },
    { value: "26,000+", label: "happy clinicians" },
    { value: "1,300+", label: "clinics and growing" },
  ];
  return (
    <section className="bg-[#183278] py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-semibold leading-tight sm:text-4xl" style={SERIF}>
              {s.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  8) Press strip — "As seen in" + award badge                  */
/* ============================================================ */
