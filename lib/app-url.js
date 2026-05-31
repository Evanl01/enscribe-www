const DEFAULT_APP_URL = "https://app.enscribe.online";

/** Base URL for the Vite product app (login, signup, etc.). */
export function getAppUrl() {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL;
  return base.replace(/\/$/, "");
}

/** Absolute URL to a path on the product app. */
export function appPath(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getAppUrl()}${normalized}`;
}
