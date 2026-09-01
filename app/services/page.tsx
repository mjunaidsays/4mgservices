import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { Advantages } from "@/components/sections/advantages";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Journey } from "@/components/sections/journey";
import { ServicesBento } from "@/components/sections/services-bento";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/content/images";
import { ventures } from "@/lib/content/ventures";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freight forwarding, customs clearance, perishables clearance, warehousing and door-to-door cargo delivery from 4M Global Services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />

      <PageHero
        eyebrow="What we do"
        title="Logistics, transport and customs clearance"
        lead="We take great pride in being a worldwide provider of cargo shipping services, with flexible options covering customs brokerage and air, land and sea transportation."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.warehouseRacking}
      />

      <ServicesBento />
      <TrustStrip />
      <Journey />
      <Advantages />
      <Stats />
      <IndustriesGrid />
      <WhyChooseUs />
      <Testimonials />

      <section className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Also from 4M"
            title="Beyond logistics: technology and design"
            lead="Alongside logistics, we build and operate a technology and interiors division of our own."
          />

          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {ventures.map((venture) => (
              <RevealItem key={venture.href} small className="h-full">
                <Link
                  href={venture.href}
                  className="group flex h-full flex-col rounded-card border border-mist-200 bg-white p-7 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                >
                  <h3 className="text-h3 text-ink-900">{venture.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-600">
                    {venture.shortDescription}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Learn more
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
