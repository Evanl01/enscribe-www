import { isBetaOnlyEnabled } from "@/lib/beta-only";

/**
 * Renders `children` only when `NEXT_PUBLIC_BETA_ONLY` is enabled.
 * Otherwise renders `fallback` (default: nothing).
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.fallback=null]
 */
export function BetaOnly({ children, fallback = null }) {
  if (!isBetaOnlyEnabled()) {
    return fallback;
  }
  return children;
}
