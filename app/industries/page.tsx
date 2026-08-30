import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { images } from "@/lib/content/images";
import { industries } from "@/lib/content/industries";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Industries we serve",
  description:
    "Logistics for e-commerce, retail, manufacturing and healthcare — planned around the failure modes that matter to each sector.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ])}
      />

      <PageHero
        eyebrow="Industries we serve"
        title="We provide for everyone"
        lead="We serve with great care, on time, with excellent service. Different sectors fail in different ways — we plan around the ones that matter to yours."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.cargoBoxes}
      />

      <section className="section-y bg-white">
        <div className="container-site">
          <Stagger className="grid gap-4 md:grid-cols-2">
            {industries.map((industry) => (
              <RevealItem key={industry.slug} small className="h-full">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-mist-200 bg-white shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={industry.image.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 620px"
                      className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-display text-sm font-semibold text-accent tabular-nums">
                      {industry.number}
                    </span>
                    <h2 className="mt-2 text-h3 text-ink-900">
                      {industry.name}
                    </h2>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-600">
                      {industry.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      How we help
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </div>
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
