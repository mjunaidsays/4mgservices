"use client";

import { motion } from "motion/react";

import { drawLine } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A shipping route that draws itself in behind the hero — one of the site's
 * three signature motion moments.
 *
 * Purely decorative, so it is hidden from assistive technology. Under reduced
 * motion `MotionConfig` resolves the draw instantly and the line simply appears.
 */
export function RouteLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      className={cn(className)}
    >
      <motion.path
        d="M-40 330 C 180 330, 250 120, 470 130 S 760 300, 960 210 S 1240 40, 1500 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 14"
        variants={drawLine}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M-40 250 C 220 250, 320 60, 560 70 S 900 240, 1120 150 S 1320 60, 1500 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
        variants={drawLine}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      />
    </svg>
  );
}
