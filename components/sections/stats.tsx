import { CountUp } from "@/components/motion/count-up";
import { RevealItem, Stagger } from "@/components/motion/reveal";

/**
 * Every figure here is verifiable from the company's own service offering.
 *
 * TODO(owner): supply real performance numbers — years in business, shipments
 * handled, countries served, on-time percentage — and swap them in. Nothing is
 * invented in the meantime.
 */
const stats = [
  { value: 6, suffix: "", label: "Logistics services", detail: "Sea, air, customs, perishables, warehousing and door-to-door" },
  { value: 4, suffix: "", label: "Industries served", detail: "E-commerce, retail, manufacturing and healthcare" },
  { value: 2, suffix: "", label: "Operating markets", detail: "UAE and Pakistan, with partners worldwide" },
  { value: 1, suffix: "", label: "Point of contact", detail: "One accountable team from enquiry to delivery" },
];

export function Stats() {
  return (
    <section className="on-dark bg-navy-950 py-16 text-white lg:py-20">
      <div className="container-site">
        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label} small>
              <p className="font-display text-[3rem] leading-none font-semibold text-orange-500">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-medium text-white">{stat.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                {stat.detail}
              </p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
