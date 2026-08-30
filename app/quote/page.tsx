import type { Metadata } from "next";
import { Clock, MessageCircle, ShieldCheck } from "lucide-react";

import { QuoteWizard } from "@/components/forms/quote-wizard";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { images } from "@/lib/content/images";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Request a freight, customs clearance or warehousing quote from 4M Global Services. Three short steps, and an honest rate with no hidden charges.",
  alternates: { canonical: "/quote" },
};

const assurances = [
  {
    icon: Clock,
    title: `A reply within ${siteConfig.quoteResponseWindow}`,
    detail:
      "Quotes are priced by a person, not a calculator — but you will not be left waiting.",
  },
  {
    icon: ShieldCheck,
    title: "No hidden charges",
    detail:
      "Freight, duties and handling are set out in the quote, not added at destination.",
  },
  {
    icon: MessageCircle,
    title: "Prefer to talk?",
    detail: "WhatsApp us and we will take the details that way instead.",
  },
];

export default async function QuotePage(props: PageProps<"/quote">) {
  const search = await props.searchParams;
  const service = typeof search.service === "string" ? search.service : "";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Get a quote", href: "/quote" },
        ])}
      />

      <PageHero
        eyebrow="Request a quote"
        title="Tell us what you're shipping"
        lead="Three short steps. We come back with routing options and a rate that includes everything — no surprises at destination."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.distributionVan}
      />

      <section className="section-y bg-mist-50">
        <div className="container-site grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <QuoteWizard service={service} />
          </div>

          <aside className="space-y-8">
            <Reveal>
              <div className="space-y-7">
                {assurances.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-btn bg-white text-accent shadow-e1">
                      <item.icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-ink-900">
                        {item.title}
                      </h2>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-card border border-mist-200 bg-white p-6">
                <p className="font-display text-lg font-semibold text-ink-900">
                  Urgent shipment?
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  Perishables and time-critical cargo are worked ahead of
                  general freight. Call or message us directly.
                </p>

                <div className="mt-5 space-y-2">
                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="block font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={whatsappLink(
                      "Hello, I have an urgent shipment I'd like to discuss.",
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
