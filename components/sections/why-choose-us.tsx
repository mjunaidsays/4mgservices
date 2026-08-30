import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content/images";

/** The five "why choose us" points, verbatim in substance from the profile. */
const reasons = [
  {
    title: "Global reach, local expertise",
    detail:
      "Strong partnerships with carriers and agents worldwide, run by people who know the UAE and Pakistan lanes first-hand.",
  },
  {
    title: "Transparent pricing",
    detail:
      "Competitive, honest rates. What we quote is what you pay — no hidden charges appearing at destination.",
  },
  {
    title: "End-to-end support",
    detail:
      "From pickup to delivery we handle everything, so nothing falls into the gap between two providers.",
  },
  {
    title: "Timely and secure",
    detail:
      "We prioritise safety and on-time delivery, and we tell you early when something changes.",
  },
  {
    title: "Customer-first approach",
    detail:
      "Dedicated support for every shipment, whatever its size. Your cargo, our responsibility.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-last lg:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-panel">
              <Image
                src={images.warehouseAisle.src}
                alt={images.warehouseAisle.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>

            {/* Overlapping quote card, lifted from the company profile. */}
            <div className="relative -mt-12 ml-6 max-w-sm rounded-card bg-navy-950 p-6 text-white shadow-e3 lg:-mt-16 lg:ml-10">
              <p className="font-display text-lg leading-snug">
                &ldquo;We don&apos;t just move shipments — we move businesses
                forward.&rdquo;
              </p>
              <p className="mt-3 text-sm text-white/55">
                Navigating together, innovating forever.
              </p>
            </div>
          </Reveal>

          <div>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              Why choose 4M
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              A logistics partner that understands urgency
            </h2>
            <p className="mt-4 text-lead text-ink-600">
              Whether you are an SME expanding internationally or an enterprise
              managing a complex supply chain, our team keeps operations
              hassle-free from origin to destination.
            </p>

            <Stagger as="ul" className="mt-8 space-y-5">
              {reasons.map((reason) => (
                <RevealItem
                  as="li"
                  small
                  key={reason.title}
                  className="flex gap-4"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--brand-accent-tint)] text-accent">
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink-900">
                      {reason.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-600">
                      {reason.detail}
                    </span>
                  </span>
                </RevealItem>
              ))}
            </Stagger>

            <Reveal small className="mt-9">
              <Button asChild variant="outline">
                <Link href="/about">More about us</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
