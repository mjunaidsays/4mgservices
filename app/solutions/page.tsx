import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { ventures } from "@/lib/content/ventures";

export const metadata: Metadata = {
  title: "Technology & interiors",
  description:
    "Alongside logistics, 4M Global Services builds Cognita Campus OS and Mindora for schools and children, and designs and fits out spaces through 4M Interiors.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
        ])}
      />

      <PageHero
        eyebrow="Beyond logistics"
        title="Technology and design, built by 4M"
        lead="The same standards we apply to a shipment — reliability, transparency, and someone accountable — applied to the businesses we build alongside it."
        crumbs={[{ name: "Home", href: "/" }]}
      />

      <section className="section-y bg-white">
        <div className="container-site">
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {ventures.map((venture) => (
              <RevealItem
                key={venture.href}
                small
                className={`${venture.accentClass} h-full`}
              >
                <Link
                  href={venture.href}
                  className="group flex h-full flex-col rounded-panel border border-mist-200 bg-white p-8 shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0 lg:p-10"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-btn bg-[var(--brand-accent-tint)] text-accent">
                    <venture.icon aria-hidden className="size-6" />
                  </span>

                  <h2 className="mt-6 text-h2 text-ink-900">{venture.name}</h2>
                  <p className="mt-2 font-display text-lg text-accent">
                    {venture.tagline}
                  </p>

                  <p className="mt-5 flex-1 leading-relaxed text-ink-600">
                    {venture.description}
                  </p>

                  <p className="mt-6 text-sm font-medium text-ink-400">
                    {venture.audience}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent">
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

      <CtaBand
        title="Looking for logistics instead?"
        description="Sea and air freight, customs clearance, warehousing and door-to-door delivery across the UAE, Pakistan and worldwide."
        primaryLabel="See our services"
        primaryHref="/services"
      />
    </>
  );
}
