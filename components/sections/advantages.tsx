import {
  BarChart3,
  CalendarClock,
  Globe,
  Lock,
  Radar,
  Timer,
} from "lucide-react";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** The six key advantages named in the company profile. */
const advantages = [
  {
    icon: Timer,
    title: "On-time Guarantee",
    detail:
      "Schedules are commitments. If something moves, you hear it from us first.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Delivery",
    detail:
      "Routing, mode and timing shaped around your deadline and your budget.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    detail:
      "Decisions based on lane performance and cost, not guesswork.",
  },
  {
    icon: Radar,
    title: "Real-time Tracking",
    detail:
      "Milestone updates at collection, departure, arrival, clearance and delivery.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    detail:
      "Strong partnerships with carriers and agents across the world.",
  },
  {
    icon: Lock,
    title: "Secured Handling",
    detail:
      "Cargo condition recorded at every handover, with controlled access throughout.",
  },
];

export function Advantages() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="Key advantages"
          title="We serve with care, on time, without failure"
          lead="The things our customers tell us matter most — and the ones we measure ourselves against."
        />

        <Stagger className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <RevealItem key={advantage.title} small>
              <div className="flex size-12 items-center justify-center rounded-btn border border-mist-200 bg-mist-50 text-accent">
                <advantage.icon aria-hidden className="size-5" />
              </div>
              <h3 className="mt-5 text-h3 text-ink-900">{advantage.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-600">
                {advantage.detail}
              </p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
