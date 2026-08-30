import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language. Three tiers and nothing outside them:
 *
 *   1. micro        120–200ms  buttons, links, inputs, card hover
 *   2. reveal       500–700ms  scroll-triggered entrances
 *   3. scroll-linked           parallax, sticky journey, counters, progress
 *
 * Rules: animate `transform` and `opacity` only, reserve final layout space so
 * nothing shifts (CLS), and never animate the LCP element's opacity from 0.
 * Keep the durations here in sync with the tokens in `app/globals.css`.
 */

/** cubic-bezier(0.22, 1, 0.36, 1) — the site's signature "settle". */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const DURATION = {
  micro: 0.16,
  fast: 0.28,
  reveal: 0.6,
  slow: 0.9,
} as const;

/** 70ms between siblings, so a six-item grid finishes inside half a second. */
export const STAGGER = 0.07;

/** Default viewport config for scroll reveals — fire once, slightly early. */
export const VIEWPORT = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;

export const revealTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASE_OUT_EXPO,
};

export const microTransition: Transition = {
  duration: DURATION.micro,
  ease: EASE_OUT_QUART,
};

/* -------------------------------------------------------------------------- */
/* Variants                                                                    */
/* -------------------------------------------------------------------------- */

/** Rise and fade. The workhorse for section content. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Smaller travel, for items inside an already-revealed block. */
export const riseInSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: revealTransition },
};

/** Parent that staggers its children. Children use `riseIn`/`riseInSmall`. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
};

/** Per-word hero headline entrance. Slightly quicker stagger than grids. */
export const headlineParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const headlineWord: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** SVG route line that draws itself in behind the hero. */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: EASE_OUT_EXPO },
      opacity: { duration: 0.3 },
    },
  },
};
