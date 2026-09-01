import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { ventures } from "@/lib/content/ventures";

const featured = ventures.filter((venture) => venture.division === "technology");

/**
 * Cognita and Mindora, given real prominence near the top of the homepage
 * instead of a one-line mention at the bottom (that mention — `VenturesStrip`
 * — stays exactly as it is; this section doesn't replace it, it precedes it).
 *
 * Sits directly after `TrustStrip` and before `ServicesBento`, deliberately
 * not between `Hero` and `TrustStrip` — `TrustStrip`'s own comment documents
 * that it is meant to sit immediately under the hero, and that stays true.
 *
 * Every field rendered here — tagline, full description, audience — already
 * exists on `Venture` (`lib/content/ventures.ts`), authored for the
 * `/solutions` hub cards. Filtering to `division === "technology"` reuses
 * that content as-is rather than writing a third copy of it.
 */
export function FeaturedVentures() {
  return (
    <section className="on-dark bg-navy-900 py-16 text-white lg:py-20">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="text-eyebrow font-semibold text-orange-400 uppercase">
            Also from 4M
          </p>
          <h2 className="mt-3 text-h2 text-white">
            Technology built by the same team you trust with your cargo
          </h2>
          <p className="mt-4 text-lead text-white/65">
            Two products, built and run by 4M Global Services — a closer look
            at what each one does.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((venture) => (
            <RevealItem
              key={venture.href}
              small
              className={`${venture.accentClass} h-full`}
            >
              <Link
                href={venture.href}
                className="group flex h-full flex-col rounded-panel border border-navy-700 bg-navy-850 p-7 transition-[transform,border-color,background-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-navy-600 hover:bg-navy-800 motion-reduce:hover:translate-y-0 lg:p-9"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-btn bg-white/10 text-[var(--brand-accent-on-dark)]">
                  <venture.icon aria-hidden className="size-6" />
                </span>

                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {venture.name}
                </h3>
                <p className="mt-1.5 font-display text-base text-[var(--brand-accent-on-dark)]">
                  {venture.tagline}
                </p>

                <p className="mt-4 flex-1 leading-relaxed text-white/65">
                  {venture.description}
                </p>

                <p className="mt-5 text-sm text-white/45">{venture.audience}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-white">
                  Explore {venture.name}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
