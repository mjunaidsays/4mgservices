import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught this project's custom scales.
 *
 * Out of the box it cannot tell `text-h2` (a font size) from `text-ink-900`
 * (a colour) — both are unknown `text-*` classes, so it assumes they conflict
 * and silently drops the first. That is how headings end up at body size.
 * Registering the names in the right class groups fixes it for good.
 */
const FONT_SIZES = ["hero", "h1", "h2", "h3", "lead", "eyebrow"];

const TEXT_COLORS = [
  "navy-950",
  "navy-900",
  "navy-850",
  "navy-800",
  "navy-700",
  "navy-600",
  "orange-600",
  "orange-500",
  "orange-400",
  "orange-300",
  "orange-100",
  "ink-900",
  "ink-700",
  "ink-600",
  "ink-400",
  "mist-200",
  "mist-100",
  "mist-50",
  "teal-400",
  "red-500",
  "cognita-600",
  "cognita-500",
  "cognita-100",
  "mindora-600",
  "mindora-500",
  "mindora-400",
  "mindora-100",
  "mnd-700",
  "mnd-600",
  "mnd-500",
  "mnd-100",
  "accent",
  "accent-dark",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
      "text-color": [{ text: TEXT_COLORS }],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts left-to-right. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build an absolute URL against the site origin (for canonicals and JSON-LD). */
export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.4mgservices.com";
  return new URL(path, base).toString();
}

/** Short, human-friendly reference for a form submission, e.g. `4MG-8KD2P1`. */
export function referenceCode(prefix = "4MG") {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${prefix}-${out}`;
}

export function formatDate(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
