import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The 4M Global Services logo.
 *
 * Both assets are cut from the company's official artwork
 * (`public/brand/logo.jpeg`) with a luminance key: the source is a bright
 * white/grey lockup on a flat navy background with almost nothing in
 * between the two, so turning luminance into an alpha channel removes the
 * navy cleanly with no visible edge, on any of the site's navy surfaces,
 * instead of shipping the artwork as an opaque rectangle.
 *
 *   - `logo-lockup.png` — the full mark + wordmark + tagline
 *   - `logo-mark.png`   — just the globe emblem, for spots too narrow for
 *                         the full lockup (the mobile drawer's icon bar)
 */
const LOCKUP_WIDTH = 1441;
const LOCKUP_HEIGHT = 630;
const MARK_WIDTH = 427;
const MARK_HEIGHT = 443;

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt=""
      width={MARK_WIDTH}
      height={MARK_HEIGHT}
      className={cn("h-9 w-auto shrink-0", className)}
    />
  );
}

type LogoProps = {
  className?: string;
  /** Show only the emblem instead of the full lockup (mobile, compact bars). */
  markOnly?: boolean;
};

export function Logo({ className, markOnly = false }: LogoProps) {
  if (markOnly) {
    return <LogoMark className={className} />;
  }

  return (
    <Image
      src="/brand/logo-lockup.png"
      alt="4M Global Services"
      width={LOCKUP_WIDTH}
      height={LOCKUP_HEIGHT}
      priority
      className={cn("h-16 w-auto shrink-0", className)}
    />
  );
}
