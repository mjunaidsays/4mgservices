"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { riseIn, riseInSmall, staggerParent, VIEWPORT } from "@/lib/motion";

/**
 * Motion components are declared once at module scope, never built during
 * render — a component created inside render is a new type on every pass and
 * would remount its subtree, losing state and restarting animations.
 *
 * Add a tag here if a section needs one; keeping the set explicit is the point.
 */
const MOTION = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
} as const;

export type RevealTag = keyof typeof MOTION;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element — `li`, `article`, `section`, etc. */
  as?: RevealTag;
  /** Seconds to wait before the reveal starts. Use sparingly. */
  delay?: number;
  /** Shorter travel, for items inside an already-revealed block. */
  small?: boolean;
};

/**
 * Scroll-triggered entrance. Fires once, slightly before the element is fully
 * in view. Only `opacity` and `transform` animate, so the element occupies its
 * final space from first paint and contributes nothing to CLS.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay,
  small = false,
}: RevealProps) {
  const Component = MOTION[as];
  const variants: Variants = small ? riseInSmall : riseIn;

  return (
    <Component
      data-reveal=""
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers its `RevealItem` children. Cap lists at six visible items so the
 * last one never feels like it is lagging behind the scroll.
 */
export function Stagger({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay" | "small">) {
  const Component = MOTION[as];

  return (
    <Component
      data-reveal=""
      className={cn(className)}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

/** A child of `Stagger`. Inherits the parent's timing — no viewport of its own. */
export function RevealItem({
  children,
  className,
  as = "div",
  small = false,
}: Omit<RevealProps, "delay">) {
  const Component = MOTION[as];

  return (
    <Component data-reveal="" className={cn(className)} variants={small ? riseInSmall : riseIn}>
      {children}
    </Component>
  );
}
