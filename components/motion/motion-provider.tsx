"use client";

import { MotionConfig } from "motion/react";
import { useEffect } from "react";

/**
 * Root motion context.
 *
 * `reducedMotion="user"` makes every Motion component honour the OS setting
 * automatically — transform and opacity animations resolve instantly instead of
 * being skipped, so content is never hidden behind an animation.
 *
 * Lenis smooth scrolling is deliberately gated: desktop pointers only, off on
 * touch (where native momentum is better) and off under reduced motion. It is a
 * 3KB nicety, not a requirement — if it ever fights a sticky section, remove it.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reduced.matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    // Loaded lazily so touch and reduced-motion visitors never download it.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
