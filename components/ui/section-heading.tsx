import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Colour treatment for the section it sits in. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  /** Rendered to the right of the heading on wide screens (usually a CTA). */
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow && (
          <p
            className={cn(
              "text-eyebrow font-semibold uppercase",
              dark ? "text-accent-dark" : "text-accent",
            )}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "text-h2",
            eyebrow && "mt-3",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>

        {lead && (
          <p
            className={cn(
              "mt-4 text-lead",
              dark ? "text-white/65" : "text-ink-600",
            )}
          >
            {lead}
          </p>
        )}
      </Reveal>

      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}
