import { ArrowDown, MessageCircle } from "lucide-react";
import Link from "next/link";

import { RouteLine } from "@/components/sections/route-line";
import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const highlights = [
  "Logistics & Freight",
  "Interior Design",
  "Campus Software",
  "Kids' Learning",
];

/**
 * The H1 is deliberately *not* animated: it is the likely LCP element, and
 * fading it in from zero opacity would delay the largest paint. The motion
 * lives in the supporting content and the route line drawing itself behind.
 *
 * No photograph background — this hero now introduces all four businesses,
 * not logistics alone, so it stays on the abstract route-line + grid texture
 * rather than a freight-specific image.
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />

      <RouteLine className="absolute inset-x-0 top-1/2 -z-10 h-auto w-full -translate-y-1/2 text-orange-500/35" />

      <div className="container-site relative pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <Reveal small>
            <p className="text-eyebrow font-semibold text-orange-400 uppercase">
              Logistics &middot; Technology &middot; Design
            </p>
          </Reveal>

          <h1 className="mt-5 text-hero text-white">
            Built to Move Your World Forward
          </h1>

          <Reveal small delay={0.1}>
            <p className="mt-6 max-w-2xl text-lead text-white/70">
              4M Global Services is a group of four businesses — logistics,
              interior design, campus software and kids&apos; learning — each
              run by its own dedicated team of specialists.
            </p>
          </Reveal>

          <Reveal small delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#businesses">
                  Explore our businesses
                  <ArrowDown aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link href="/contact">
                  <MessageCircle aria-hidden />
                  Contact us
                </Link>
              </Button>
            </div>
          </Reveal>

          <Stagger as="ul" className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((item) => (
              <RevealItem
                as="li"
                small
                key={item}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-orange-500"
                />
                {item}
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
