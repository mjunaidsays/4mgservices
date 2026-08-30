import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import type { SiteImage } from "@/lib/content/images";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  /** Trail excluding the current page — the title is appended automatically. */
  crumbs?: Crumb[];
  image?: SiteImage;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Shared dark hero for every inner page. Keeping every page dark at the top is
 * what lets the fixed header stay white throughout without a colour swap.
 *
 * As with the homepage, the H1 is not animated — it is the LCP candidate.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  image,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "on-dark relative isolate overflow-hidden bg-navy-950 text-white",
        className,
      )}
    >
      {image ? (
        <>
          <div className="absolute inset-0 -z-20">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-25"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/90 to-navy-900/75"
          />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />
      )}

      <div className="container-site pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/50">
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-160 hover:text-white"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden>/</span>
                </li>
              ))}
              <li aria-current="page" className="text-white/80">
                {title}
              </li>
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal small>
              <p className="text-eyebrow font-semibold text-accent-dark uppercase">
                {eyebrow}
              </p>
            </Reveal>
          )}

          <h1 className={cn("text-h1 text-white", eyebrow && "mt-4")}>
            {title}
          </h1>

          {lead && (
            <Reveal small delay={0.08}>
              <p className="mt-5 text-lead text-white/70">{lead}</p>
            </Reveal>
          )}

          {children && (
            <Reveal small delay={0.15}>
              <div className="mt-8">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
