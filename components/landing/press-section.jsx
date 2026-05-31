import { LogoChip } from "@/components/landing/placeholders";

export function PressSection() {
  return (
    <section className="bg-[#F9FAFF] py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 rounded-2xl border border-[#183278]/10 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#3166F7]">As seen in</p>
            <p className="mt-2 max-w-md text-sm text-[#3C4C78]">
              Featured by the publications healthcare leaders read.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LogoChip>CNBC</LogoChip>
            <LogoChip>Forbes</LogoChip>
            <LogoChip>Wall Street Journal</LogoChip>
          </div>
          <div className="rounded-xl border border-dashed border-[#3166F7]/40 bg-[#F9FAFF] px-4 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#3166F7]">Awarded</p>
            <p className="mt-1 text-sm font-semibold text-[#183278]">CB Insights Digital 50</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  9) Pricing — 4 tier cards + Monthly/Annual toggle            */
/*     Toggle flips prices on tiers that have an annual price.   */
/* ============================================================ */
