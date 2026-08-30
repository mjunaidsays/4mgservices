import { Globe2, Headset, ShieldCheck, Timer } from "lucide-react";

import { RevealItem, Stagger } from "@/components/motion/reveal";

const points = [
  {
    icon: Globe2,
    title: "UAE & Pakistan based",
    detail: "With carrier and agent partners worldwide.",
  },
  {
    icon: Timer,
    title: "On-time guarantee",
    detail: "Deadlines treated as commitments, not estimates.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    detail: "Competitive rates with no hidden charges.",
  },
  {
    icon: Headset,
    title: "One point of contact",
    detail: "A named person accountable for your shipment.",
  },
];

/**
 * The trust layer sits immediately under the hero, because every top-performing
 * logistics site answers "can I rely on these people?" before it sells anything.
 */
export function TrustStrip() {
  return (
    <section className="border-b border-mist-200 bg-white">
      <div className="container-site py-10 lg:py-12">
        <Stagger className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <RevealItem key={point.title} small className="flex gap-3.5">
              <point.icon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-accent"
              />
              <div>
                <p className="text-[0.9375rem] font-semibold text-ink-900">
                  {point.title}
                </p>
                <p className="mt-1 text-sm text-ink-600">{point.detail}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>

        {/* TODO(owner): client logo row goes here once logos are supplied. */}
      </div>
    </section>
  );
}
