import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/lib/content/industries";

export function IndustriesGrid() {
  return (
    <section className="section-y bg-mist-50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Industries we serve"
          title="We provide for everyone"
          lead="Different sectors fail in different ways. We plan around the failure modes that matter to yours."
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <RevealItem key={industry.slug} small className="h-full">
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-card border border-mist-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
              >
                <span className="font-display text-2xl font-semibold text-mist-200 transition-colors duration-160 group-hover:text-accent">
                  {industry.number}
                </span>
                <h3 className="mt-4 text-h3 text-ink-900">{industry.name}</h3>
                <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {industry.summary}
                </p>
                <ArrowUpRight
                  aria-hidden
                  className="mt-5 size-5 text-accent transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
