import Image from "next/image";
import { AiScribeFeatureMockup } from "@/components/landing/ambient-scribe-mockup";
import { BillingSuggestionsFeatureMockup } from "@/components/landing/billing-suggestions-mockup";
import { NoteEhrPushFeatureMockup } from "@/components/landing/note-ehr-push-mockup";
import { VisitPrepFeatureMockup } from "@/components/landing/visit-prep-mockup";

/** Real product screenshot — centered in a branded frame (portrait phone assets). */
export function FeatureScreenshot({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className = "",
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A7AF5] via-[#3166F7] to-[#0B1A47] shadow-[0_30px_70px_rgba(11,26,71,0.25)] ${className}`}
    >
      <div
        className={`relative flex w-full items-center justify-center ${aspect} px-6 py-8 sm:px-10 sm:py-10`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_55%)]"
          aria-hidden
        />
        <Image
          src={src}
          alt={alt}
          width={740}
          height={1478}
          className="relative z-10 h-full max-h-full w-auto max-w-[min(72%,300px)] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
        />
      </div>
    </figure>
  );
}

/** Code mockup frame — inline aspect-ratio so the box never collapses (all children are absolute). */
export function FeatureMockup({ alt, ratio = "4 / 3", className = "", children }) {
  return (
    <figure className={`relative m-0 w-full p-0 ${className}`} aria-label={alt}>
      <div className="relative m-0 w-full p-0" style={{ aspectRatio: ratio }}>
        <div className="pointer-events-none absolute inset-0 m-0 p-0">{children}</div>
      </div>
    </figure>
  );
}

/** Mockup frame sized by content — no fixed aspect ratio. */
export function FeatureMockupNatural({ alt, className = "", children }) {
  return (
    <figure className={`relative m-0 w-full p-0 ${className}`} aria-label={alt}>
      {children}
    </figure>
  );
}

export function FeatureVisual({ feature, aspect, className = "" }) {
  if (feature.media === "mockup" && feature.mockupKey === "ambientScribe") {
    return (
      <FeatureMockup
        key={feature.key}
        alt={feature.imageAlt ?? feature.title}
        ratio={feature.mockupAspect ?? "25 / 18"}
        className={className}
      >
        <AiScribeFeatureMockup />
      </FeatureMockup>
    );
  }

  if (feature.media === "mockup" && feature.mockupKey === "billingSuggestions") {
    return (
      <FeatureMockupNatural
        key={feature.key}
        alt={feature.imageAlt ?? feature.title}
        className={className}
      >
        <BillingSuggestionsFeatureMockup />
      </FeatureMockupNatural>
    );
  }

  if (feature.media === "mockup" && feature.mockupKey === "visitPrep") {
    return (
      <FeatureMockupNatural
        key={feature.key}
        alt={feature.imageAlt ?? feature.title}
        className={className}
      >
        <VisitPrepFeatureMockup />
      </FeatureMockupNatural>
    );
  }

  if (feature.media === "mockup" && feature.mockupKey === "noteEhrPush") {
    return (
      <FeatureMockupNatural
        key={feature.key}
        alt={feature.imageAlt ?? feature.title}
        className={className}
      >
        <NoteEhrPushFeatureMockup />
      </FeatureMockupNatural>
    );
  }

  if (feature.imageSrc) {
    return (
      <FeatureScreenshot
        key={feature.key}
        src={feature.imageSrc}
        alt={feature.imageAlt ?? feature.title}
        aspect={aspect}
        className={className}
      />
    );
  }

  if (feature.media === "video") {
    return (
      <VideoPlaceholder
        key={feature.key}
        aspect={aspect}
        label={feature.label}
        spec={feature.spec}
        className={className}
      />
    );
  }

  return (
    <VisualPlaceholder
      key={feature.key}
      aspect={aspect}
      label={feature.label}
      spec={feature.spec}
      className={className}
    />
  );
}

/** Image placeholder — dashed frame + caption describing the asset to commission. */
export function VisualPlaceholder({
  aspect = "aspect-[4/3]",
  label,
  spec,
  className = "",
  children,
  tone = "light",
}) {
  const toneClasses =
    tone === "dark"
      ? "border-white/25 bg-white/5"
      : "border-[#7C9DF9]/55 bg-gradient-to-br from-[#F9FAFF] to-[#7C9DF9]/12";
  const captionClasses =
    tone === "dark"
      ? "border-white/10 bg-[#14285F]/95 [&_p:first-child]:text-[#7C9DF9] [&_p]:text-white/85"
      : "border-[#183278]/10 bg-white/92 [&_p:first-child]:text-[#3166F7] [&_p]:text-[#3C4C78]";

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-dashed ${toneClasses} ${className}`}
    >
      <div className={`relative flex w-full flex-col items-center justify-center ${aspect} p-6`}>
        {children ?? (
          <svg
            className={`h-14 w-14 ${tone === "dark" ? "text-white/30" : "text-[#4B5D99]/35"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
        {label ? (
          <figcaption
            className={`absolute inset-x-0 bottom-0 border-t px-4 py-3 backdrop-blur-sm ${captionClasses}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider">{label}</p>
            {spec ? <p className="mt-0.5 text-xs leading-snug">{spec}</p> : null}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/** Video placeholder — looks like a real video with controls + play affordance. */
export function VideoPlaceholder({
  aspect = "aspect-video",
  label = "Hero video",
  spec,
  className = "",
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-[#183278]/10 bg-[#0B1A47] shadow-[0_30px_70px_rgba(11,26,71,0.35)] ${className}`}
    >
      <div className={`relative w-full ${aspect}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(124,157,249,0.45),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(49,102,247,0.35),transparent_55%)]" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-white/70">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          </div>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
            Live demo
          </span>
        </div>
        <button
          type="button"
          aria-label="Play product video"
          className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl backdrop-blur transition group-hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-[#183278]" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-lg bg-black/30 px-3 py-2 backdrop-blur">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <span className="block h-full w-[38%] rounded-full bg-white/80" />
          </span>
          <span className="text-[10px] font-medium text-white/80">0:34 / 1:28</span>
        </div>
        {label ? (
          <figcaption className="absolute left-4 top-12 rounded-md bg-[#0B1A47]/85 px-3 py-2 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C9DF9]">
              {label}
            </p>
            {spec ? <p className="mt-0.5 text-xs leading-snug text-white/85">{spec}</p> : null}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

export function PortraitPlaceholder({ size = "h-16 w-16", label }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-[#7C9DF9]/55 bg-gradient-to-br from-[#F9FAFF] to-[#7C9DF9]/15 text-[10px] font-semibold uppercase tracking-wider text-[#3166F7] ${size}`}
      aria-label={label ?? "Portrait placeholder"}
    >
      <span className="px-1 text-center">Portrait</span>
    </div>
  );
}

export function LogoChip({ children, className = "" }) {
  return (
    <span
      className={`inline-flex h-10 min-w-[140px] items-center justify-center whitespace-nowrap rounded-md border border-dashed border-[#7C9DF9]/45 bg-white px-4 text-xs font-semibold uppercase tracking-wider text-[#4B5D99] ${className}`}
    >
      {children}
    </span>
  );
}
