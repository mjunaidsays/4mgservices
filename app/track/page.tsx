import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";

import { TrackForm } from "@/components/forms/track-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { images } from "@/lib/content/images";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Track a shipment",
  description:
    "Request a status update on your 4M Global Services shipment, or check directly with the carrier.",
  alternates: { canonical: "/track" },
};

/**
 * Public carrier trackers. These let a customer self-serve immediately when
 * they already hold a carrier reference, instead of waiting on us.
 */
const carriers = [
  { name: "Maersk", href: "https://www.maersk.com/tracking" },
  { name: "MSC", href: "https://www.msc.com/en/track-a-shipment" },
  { name: "CMA CGM", href: "https://www.cma-cgm.com/ebusiness/tracking" },
  { name: "Hapag-Lloyd", href: "https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html" },
  { name: "Emirates SkyCargo", href: "https://www.skycargo.com/track-shipment/" },
  { name: "Qatar Airways Cargo", href: "https://www.qrcargo.com/s/track-shipment" },
];

export default function TrackPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Track a shipment", href: "/track" },
        ])}
      />

      <PageHero
        eyebrow="Shipment status"
        title="Track a shipment"
        lead="Send us your reference and we will come back with where your cargo is and what happens next."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.cargoBoxes}
      />

      <section className="section-y bg-mist-50">
        <div className="container-site grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <TrackForm />
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="flex gap-4 rounded-card border border-mist-200 bg-white p-6">
                <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <h2 className="font-semibold text-ink-900">
                    How tracking works with us
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                    Rather than a self-service portal, a person checks your
                    shipment against the carrier and the customs position, and
                    tells you what it actually means for your delivery date. If
                    it is urgent,{" "}
                    <a
                      href={whatsappLink(
                        "Hello, I'd like an update on my shipment.",
                      )}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-medium text-accent underline underline-offset-4"
                    >
                      message us on WhatsApp
                    </a>{" "}
                    or call {siteConfig.contact.phone}.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-card border border-mist-200 bg-white p-6">
                <h2 className="font-semibold text-ink-900">
                  Already have a carrier reference?
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  If you hold a container or air waybill number, these trackers
                  give you the carrier&apos;s own position straight away.
                </p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {carriers.map((carrier) => (
                    <li key={carrier.name}>
                      <a
                        href={carrier.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex min-h-11 items-center justify-between gap-2 rounded-btn border border-mist-200 px-3.5 text-[0.9375rem] text-ink-700 transition-colors duration-160 hover:border-ink-400 hover:text-accent"
                      >
                        {carrier.name}
                        <ExternalLink aria-hidden className="size-3.5 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
