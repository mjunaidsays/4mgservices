import { track } from "@vercel/analytics";

export type AnalyticsProperties = Record<string, string | number | boolean | null>;

/**
 * Thin wrapper around Vercel Analytics' `track()`.
 *
 * Custom events are best-effort telemetry, not application logic — a
 * tracking failure (blocked script, ad blocker, offline) must never throw or
 * interrupt the interaction it's observing, so failures are swallowed here
 * rather than surfaced.
 */
export function trackEvent(name: string, properties?: AnalyticsProperties): void {
  try {
    track(name, properties);
  } catch {
    // Best-effort only.
  }
}
