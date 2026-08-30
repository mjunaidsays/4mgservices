import { ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RouteLine } from "@/components/sections/route-line";
import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content/images";

const highlights = [
  "Sea & air freight",
  "Customs clearance",
  "Warehousing",
  "Door-to-door",
];

/**
 * The H1 is deliberately *not* animated: it is the likely LCP element, and
 * fading it in from zero opacity would delay the largest paint. The motion
 * lives in the supporting content and the route line drawing itself behind.
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Photograph, dimmed hard so headline contrast never depends on the image. */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={images.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/92 to-navy-900/80"
      />

      <RouteLine className="absolute inset-x-0 top-1/2 -z-10 h-auto w-full -translate-y-1/2 text-orange-500/35" />

      <div className="container-site relative pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-32">
        <div className="max-w-3xl">
          <Reveal small>
            <p className="text-eyebrow font-semibold text-orange-400 uppercase">
              UAE &amp; Pakistan &middot; Worldwide network
            </p>
          </Reveal>

          <h1 className="mt-5 text-hero text-white">Delivering with Precision</h1>

          <Reveal small delay={0.1}>
            <p className="mt-6 max-w-2xl text-lead text-white/70">
              Sea and air freight, customs clearance, warehousing and
              door-to-door cargo — handled end to end by one accountable team.
              We don&apos;t just move shipments, we move businesses forward.
            </p>
          </Reveal>

          <Reveal small delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/quote">
                  Get a Quote
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link href="/track">
                  <Package aria-hidden />
                  Track a Shipment
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
