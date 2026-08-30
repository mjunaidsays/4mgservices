import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/ui/faq";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getIndustry, industries } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustry(slug);

  if (!industry) return {};

  return {
    title: `${industry.name} logistics`,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryPage(
  props: PageProps<"/industries/[slug]">,
) {
  const { slug } = await props.params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  const relatedServices = industry.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined);

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(industry.faqs),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Industries", href: "/industries" },
            { name: industry.name, href: `/industries/${industry.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Industry ${industry.number}`}
        title={`${industry.name} logistics`}
        lead={industry.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ]}
        image={industry.image}
      >
        <Button asChild size="lg">
          <Link href="/quote">
            Request a quote
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      {/* Challenges */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="The problem"
            title={`What goes wrong in ${industry.name.toLowerCase()} supply chains`}
          />

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {industry.challenges.map((challenge) => (
              <RevealItem
                key={challenge.title}
                small
                className="rounded-card border border-mist-200 bg-mist-50 p-6"
              >
                <AlertTriangle aria-hidden className="size-5 text-orange-500" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                  {challenge.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                  {challenge.description}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How we help */}
      <section className="on-dark section-y bg-navy-900 bg-grid-dark text-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-orange-400 uppercase">
              How we help
            </p>
            <h2 className="mt-3 text-h2 text-white">
              What we do differently for {industry.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-lead text-white/65">
              The same six services, applied with this sector&apos;s deadlines
              and risks in mind.
            </p>
          </Reveal>

          <Stagger as="ul" className="space-y-4">
            {industry.howWeHelp.map((item) => (
              <RevealItem
                as="li"
                small
                key={item}
                className="flex gap-4 rounded-card border border-navy-700 bg-navy-850 p-5"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-orange-500/15 text-orange-400">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                <span className="leading-relaxed text-white/80">{item}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Relevant services */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Services"
            title={`Most used by ${industry.name.toLowerCase()} customers`}
          />

          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {relatedServices.map((service) => (
              <RevealItem key={service.slug} small className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-card border border-mist-200 bg-white p-6 shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-btn bg-[var(--brand-accent-tint)] text-accent">
                    <service.icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                    {service.shortName}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                    {service.summary}
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

      {/* FAQ */}
      <section className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            className="mb-10"
          />
          <Reveal>
            <Faq items={industry.faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={`Moving cargo for ${industry.name.toLowerCase()}?`}
        whatsappMessage={`Hello, I'd like to discuss ${industry.name.toLowerCase()} logistics with 4M Global Services.`}
      />
    </>
  );
}
