"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  /** Rendered before the number, e.g. `+`. */
  prefix?: string;
  /** Rendered after the number, e.g. `+`, `%`, `k`. */
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final figure is rendered on the server, so it is correct with JavaScript
 * disabled and shown immediately under reduced motion. The animation writes to
 * the DOM node directly rather than through React state — sixty renders a
 * second to change one number would be wasteful, and `tabular-nums` keeps the
 * width fixed so the surrounding layout never shifts.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView || prefersReduced) return;

    const node = numberRef.current;
    if (!node) return;

    const format = (input: number) =>
      input.toLocaleString("en-GB", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [inView, prefersReduced, value, duration, decimals]);

  const formatted = value.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={numberRef}>{formatted}</span>
      {suffix}
    </span>
  );
}
