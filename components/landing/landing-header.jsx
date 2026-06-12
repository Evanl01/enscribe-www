"use client";

import Image from "next/image";
import Link from "next/link";
import { AppLink } from "@/components/landing/app-link";
import { LANDING_TRY_FOR_FREE_HREF } from "@/components/landing/constants";

const LOGO_SRC = "/enscribe-icon.svg";

export function LandingHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[#183278]/10 bg-[#F9FAFF]"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(11, 26, 71, 0.08), 0 12px 28px -4px rgba(11, 26, 71, 0.18)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex h-full items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7]"
          aria-label="EnScribe home"
        >
          <Image
            src={LOGO_SRC}
            alt="EnScribe"
            width={300}
            height={64}
            className="h-full w-auto max-w-[300px] object-contain object-left"
            priority
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Primary">
          <AppLink
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#3C4C78] transition hover:text-[#183278] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7]"
          >
            Log in
          </AppLink>
          <Link
            href={LANDING_TRY_FOR_FREE_HREF}
            className="rounded-lg bg-[#3166F7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2751C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3166F7] focus-visible:ring-offset-2"
          >
            Try for free
          </Link>
        </nav>
      </div>
    </header>
  );
}
