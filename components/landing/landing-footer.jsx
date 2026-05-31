export function LandingFooter() {
  return (
    <footer className="border-t border-[#183278]/10 bg-[#183278] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="text-center text-xs text-white/55">
          © {new Date().getFullYear()} EnScribe. For licensed healthcare professionals.
        </p>
      </div>
    </footer>
  );
}
