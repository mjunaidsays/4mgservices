import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";
import { ventures } from "@/lib/content/ventures";

/**
 * One restrained strip. Technology and Interiors are real and worth knowing
 * about, but the homepage belongs to logistics — so this states the fact and
 * gets out of the way.
 */
export function VenturesStrip() {
  return (
    <section className="on-dark bg-navy-900 py-16 text-white lg:py-20">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="text-eyebrow font-semibold text-white/60 uppercase">
            Also from 4M
          </p>
          <h2 className="mt-3 text-h3 text-white">
            Beyond logistics: technology and design
          </h2>
        </Reveal>

        <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture) => (
            <RevealItem key={venture.href} small className="h-full">
              <Link
                href={venture.href}
                className="group flex h-full gap-5 rounded-card border border-navy-700 bg-navy-850 p-6 transition-[transform,border-color,background-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-navy-600 hover:bg-navy-800 motion-reduce:hover:translate-y-0"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-btn bg-white/10 text-white">
                  <venture.icon aria-hidden className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                    {venture.name}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-white/50 transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-white/60">
                    {venture.shortDescription}
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
