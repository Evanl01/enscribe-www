const TRUTHY = new Set(["1", "true", "yes"]);

/**
 * Whether beta-only UI should be visible (from NEXT_PUBLIC_BETA_ONLY).
 * @returns {boolean}
 */
export function isBetaOnlyEnabled() {
  const raw = process.env.NEXT_PUBLIC_BETA_ONLY;
  if (raw == null || raw === "") return false;
  return TRUTHY.has(String(raw).trim().toLowerCase());
}
