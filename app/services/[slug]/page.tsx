import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/ui/faq";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/content/images";
import { getService, services } from "@/lib/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";

/** Every service is known at build time, so all six prerender as static pages. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | 4M Global Services`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

/** Rotating hero imagery so the six service pages don't look identical. */
const heroImages = {
  "sea-air-freight": images.cargoBoxes,
  "import-export-management": images.distributionVan,
  "customs-clearance": images.documents,
  "perishables-clearance": images.forklift,
  "warehousing-distribution": images.warehouseRacking,
  "door-to-door-delivery": images.courier,
} as const;

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);

  if (!service) notFound();

  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item) => item !== undefined);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.summary,
            slug: service.slug,
          }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.shortName, href: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.name}
        lead={service.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        image={heroImages[service.slug as keyof typeof heroImages]}
      >
        <Button asChild size="lg">
          <Link href={`/quote?service=${service.slug}`}>
            Request a quote
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      {/* What's included */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="What's included"
            title={`Everything covered under ${service.shortName.toLowerCase()}`}
          />

          <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <RevealItem key={item.title} small>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--brand-accent-tint)] text-accent">
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Who it's for + documents */}
      <section className="section-y bg-mist-50">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-h2 text-ink-900">Who this is for</h2>
            <ul className="mt-7 space-y-4">
              {service.whoFor.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="rounded-panel border border-mist-200 bg-white p-7 shadow-e1 lg:p-9">
              <div className="flex items-center gap-3">
                <FileText aria-hidden className="size-5 text-accent" />
                <h2 className="text-h3 text-ink-900">Documents you&apos;ll need</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {service.documents.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-center gap-3 border-b border-mist-100 pb-3 text-[0.9375rem] text-ink-700 last:border-0 last:pb-0"
                  >
                    <Check
                      aria-hidden
                      className="size-4 shrink-0 text-accent"
                      strokeWidth={2.5}
                    />
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-400">
                Requirements vary by commodity and route. We confirm the exact
                list for your shipment before booking.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="on-dark section-y bg-navy-900 bg-grid-dark text-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="The process, step by step"
            tone="dark"
          />

          <Stagger
            as="ol"
            className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {service.process.map((step, index) => (
              <RevealItem
                as="li"
                small
                key={step.title}
                className="rounded-card border border-navy-700 bg-navy-850 p-6"
              >
                <span className="font-display text-sm font-semibold text-orange-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-h3 text-white">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-white/60">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            className="mb-10"
          />
          <Reveal>
            <Faq items={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-mist-50 py-16 lg:py-20">
          <div className="container-site">
            <h2 className="text-h3 text-ink-900">Related services</h2>

            <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <RevealItem key={item.slug} small className="h-full">
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-card border border-mist-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {item.shortName}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.summary}
                    </p>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-4 size-5 text-accent transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand
        title={`Need ${service.shortName.toLowerCase()}?`}
        whatsappMessage={`Hello, I'd like to enquire about ${service.name}.`}
      />
    </>
  );
}
