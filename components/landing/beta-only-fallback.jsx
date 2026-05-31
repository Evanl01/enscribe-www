import Link from "next/link";

export function BetaOnlyFallback() {
  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center text-[#3C4C78]">
      <p className="text-base">
        This page is not available in the current web experience.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-[#183278] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#14285F]"
      >
        Go to home
      </Link>
    </div>
  );
}
