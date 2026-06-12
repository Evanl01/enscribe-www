import Image from "next/image";
import Link from "next/link";
import { AppLink } from "@/components/landing/app-link";
import { LandingHeader } from "@/components/landing/landing-header";

export function LandingPage2() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <LandingHeader />
      <main className="flex flex-1 flex-col bg-[#183278] px-8 py-10 text-white sm:px-12 sm:py-14">
        <div className="flex flex-1 flex-col justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-lg text-2xl font-semibold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="EnScribe home"
          >
            <Image
              src="/enscribe-icon.svg"
              alt="EnScribe logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg bg-white p-1 ring-1 ring-white/20"
              priority
            />
            <span>EnScribe</span>
          </Link>
          <h1 className="mt-10 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            AI documentation for
            <br />
            modern healthcare teams.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/80">
            Secure, efficient clinical note workflows designed for providers and
            staff.
          </p>
        </div>

        <nav
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          aria-label="Primary"
        >
          <AppLink
            href="/login"
            className="rounded-xl border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Log in
          </AppLink>
          <AppLink
            href="/signup"
            className="rounded-xl bg-[#3166F7] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#2751C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#183278]"
          >
            Try for free
          </AppLink>
        </nav>
      </main>
    </div>
  );
}
