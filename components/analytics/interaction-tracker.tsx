"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/analytics";

const MAX_LABEL_LENGTH = 100;

function truncate(value: string, max: number): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > max ? `${normalized.slice(0, max - 1)}…` : normalized;
}

function labelFor(el: Element): string {
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return truncate(ariaLabel, MAX_LABEL_LENGTH);
  if (el.textContent?.trim()) return truncate(el.textContent, MAX_LABEL_LENGTH);
  return el.tagName.toLowerCase();
}

/**
 * Sitewide interaction telemetry, mounted once in the root layout.
 *
 * Rather than wiring `track()` into every button and link across the app
 * (high risk of missing one, or subtly changing an onClick prop somewhere),
 * this observes the DOM generically: a single delegated click listener finds
 * the nearest link/button ancestor of whatever was clicked, and a single
 * IntersectionObserver watches every `<section>` inside `<main>`. Neither
 * calls `preventDefault`/`stopPropagation` or mutates anything, so existing
 * behaviour — navigation, form submission, WhatsApp links — is untouched.
 * New buttons, links and sections are covered automatically as the site
 * grows, with no per-component changes required.
 *
 * Opt an element (and its descendants) out of tracking with `data-no-track`.
 */
export function InteractionTracker() {
  const pathname = usePathname();
  const seenSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const interactive = event.target.closest<HTMLElement>("a, button");
      if (!interactive || interactive.closest("[data-no-track]")) return;

      const isLink = interactive.tagName === "A";
      const href = isLink ? interactive.getAttribute("href") : null;
      const label = labelFor(interactive);

      trackEvent(isLink ? "Link Click" : "Button Click", {
        target: href ? `${label} → ${href}` : label,
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    seenSections.current = new Set();

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const el = entry.target as HTMLElement;
          if (el.closest("[data-no-track]")) continue;

          const heading = el.querySelector("h1, h2, h3")?.textContent?.trim();
          const label = heading || el.id;
          if (!label || seenSections.current.has(label)) continue;

          seenSections.current.add(label);
          trackEvent("Section View", {
            section: truncate(label, MAX_LABEL_LENGTH),
            path: window.location.pathname,
          });
        }
      },
      { threshold: 0.3 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
