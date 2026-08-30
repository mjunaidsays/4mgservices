import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Colours come from `--brand-accent`, which the nearest `.brand-*` wrapper sets.
 * That is how one button serves the corporate, Cognita and Mindora palettes.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-btn",
    "font-medium whitespace-nowrap select-none",
    // 44px minimum touch target.
    "min-h-11",
    "transition-[transform,background-color,color,border-color,box-shadow]",
    "duration-160 ease-out-quart",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:size-[1.125em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Uses the strong accent: white on bright orange is only 2.85:1.
        primary:
          "bg-[var(--brand-accent-strong)] text-[var(--brand-accent-contrast)] shadow-e1 hover:bg-[var(--brand-accent-strong-hover)] hover:shadow-e2",
        solid:
          "bg-navy-900 text-white hover:bg-navy-800 shadow-e1 hover:shadow-e2",
        outline:
          "border border-mist-200 bg-white text-ink-900 hover:border-ink-400 hover:bg-mist-50",
        /** For use on navy sections. */
        outlineLight:
          "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10",
        ghost: "text-ink-900 hover:bg-mist-100",
        ghostLight: "text-white/80 hover:bg-white/10 hover:text-white",
        link: "min-h-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element instead of a `button` — use for `Link`. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
