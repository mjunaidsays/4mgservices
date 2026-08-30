"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Scroll-linked reading progress. One of the four places scroll-linked motion
 * is used at all.
 *
 * `scaleX` on a fixed bar animates on the compositor and cannot shift layout.
 * Decorative, so it is hidden from assistive technology.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[var(--brand-accent)]"
    />
  );
}
