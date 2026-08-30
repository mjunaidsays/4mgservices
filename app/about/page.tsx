import type { Metadata } from "next";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { CountUp } from "@/components/motion/count-up";
import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/content/images";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About us",
  description:
    "4M Global Services is a UAE and Pakistan based shipping and logistics company simplifying international trade for businesses of all sizes.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Global reach, local expertise",
    detail:
      "Strong partnerships with carriers and agents worldwide, run by people who know these lanes first-hand.",
  },
  {
    title: "Transparent pricing",
    detail: "Competitive, honest rates. No hidden charges at destination.",
  },
  {
    title: "End-to-end support",
    detail: "From pickup to delivery, we handle everything.",
  },
  {
    title: "Timely and secure",
    detail: "We prioritise safety and on-time delivery, every shipment.",
  },
  {
    title: "Customer-first approach",
    detail: "Dedicated support for every shipment, whatever its size.",
  },
];

const capabilities = [
  "Sea Freight & Air Freight",
  "Import & Export Management",
  "Customs Clearance & Documentation",
  "Warehousing & Distribution",
  "Door-to-Door Cargo Services",
  "3PL Documentation",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          ...localBusinessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Who we are"
        title="Your trusted partner in global logistics"
        lead="We are a UAE and Pakistan based shipping and logistics company committed to simplifying international trade for businesses of all sizes."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.teamLoading}
      />

      {/* Story */}
      <section className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-panel">
              <Image
                src={images.warehouseAisle.src}
                alt={images.warehouseAisle.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-eyebrow font-semibold text-accent uppercase">
                About us
              </p>
              <h2 className="mt-3 text-h2 text-ink-900">
                We don&apos;t just move shipments — we move businesses forward
              </h2>
            </Reveal>

            <Reveal small delay={0.08}>
              <div className="mt-6 space-y-5 leading-relaxed text-ink-600">
                <p>
                  In today&apos;s fast-paced global economy, you need a logistics
                  partner who understands urgency, precision and reliability.
                  With a strong global network and deep industry expertise, we
                  offer comprehensive solutions across sea and air freight,
                  import and export management, customs clearance, warehousing
                  and door-to-door cargo.
                </p>
                <p>
                  Whether you are an SME looking to expand internationally or a
                  large enterprise managing complex supply chains, our
                  experienced team ensures hassle-free operations from origin to
                  destination.
                </p>
                <p className="font-display text-lg font-medium text-ink-900">
                  Our mission is to provide reliable, cost-effective and
                  transparent logistics services, with a focus on customer
                  satisfaction and operational excellence.
                </p>
              </div>
            </Reveal>

            <Stagger className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <RevealItem
                  key={capability}
                  small
                  className="flex items-center gap-3 text-[0.9375rem] text-ink-700"
                >
                  <Check
                    aria-hidden
                    className="size-4 shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  {capability}
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="on-dark bg-navy-950 py-16 text-white lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <p className="text-eyebrow font-semibold text-orange-400 uppercase">
              Our promise
            </p>
            <p className="mt-4 font-display text-h3 text-white">
              Your cargo, our responsibility.
            </p>
            <p className="mt-3 text-white/55">{siteConfig.motto}</p>
          </Reveal>

          <Stagger className="grid gap-8 sm:grid-cols-3 lg:col-span-2">
            <RevealItem small>
              <p className="font-display text-[2.5rem] leading-none font-semibold text-orange-500">
                <CountUp value={6} />
              </p>
              <p className="mt-2 text-sm text-white/60">Logistics services</p>
            </RevealItem>
            <RevealItem small>
              <p className="font-display text-[2.5rem] leading-none font-semibold text-orange-500">
                <CountUp value={4} />
              </p>
              <p className="mt-2 text-sm text-white/60">Industries served</p>
            </RevealItem>
            <RevealItem small>
              <p className="font-display text-[2.5rem] leading-none font-semibold text-orange-500">
                <CountUp value={2} />
              </p>
              <p className="mt-2 text-sm text-white/60">Operating markets</p>
            </RevealItem>
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why choose 4M"
            title="What we hold ourselves to"
          />

          <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <RevealItem key={value.title} small>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-600">
                  {value.detail}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Leadership + offices */}
      <section className="section-y bg-mist-50">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-h2 text-ink-900">Talk to us directly</h2>
            <p className="mt-4 text-lead text-ink-600">
              You will not be routed through a call centre. Enquiries reach the
              person accountable for them.
            </p>

            <div className="mt-8 rounded-panel border border-mist-200 bg-white p-7 shadow-e1">
              <p className="font-display text-xl font-semibold text-ink-900">
                {siteConfig.contact.person}
              </p>
              <p className="mt-1 text-ink-600">{siteConfig.contact.role}</p>

              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="flex items-center gap-3 text-ink-700 transition-colors duration-160 hover:text-accent"
                >
                  <Phone aria-hidden className="size-4 text-accent" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-ink-700 transition-colors duration-160 hover:text-accent"
                >
                  <Mail aria-hidden className="size-4 text-accent" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-h2 text-ink-900">Where we are</h2>
            <p className="mt-4 text-lead text-ink-600">
              Two operating markets, one network of carriers and agents
              worldwide.
            </p>

            <div className="mt-8 space-y-4">
              {siteConfig.offices.map((office) => (
                <div
                  key={office.id}
                  className="flex gap-4 rounded-card border border-mist-200 bg-white p-6"
                >
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                  <address className="not-italic">
                    <span className="font-display text-lg font-semibold text-ink-900">
                      {office.country}
                    </span>
                    <span className="mt-1 block text-ink-600">
                      {office.addressLines.join(", ")}
                    </span>
                  </address>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
