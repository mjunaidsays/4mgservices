import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { images } from "@/lib/content/images";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Speak to 4M Global Services about freight, customs clearance, warehousing or delivery. Call, WhatsApp, email, or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          ...localBusinessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact us"
        title="For more information"
        lead="Partner with us to move your business forward. Tell us what you need and the right person will come back to you — not a call centre."
        crumbs={[{ name: "Home", href: "/" }]}
        image={images.inventoryScan}
      />

      <section className="section-y bg-mist-50">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Direct channels first — many visitors never want the form. */}
          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-panel border border-mist-200 bg-white p-7 shadow-e1">
                <p className="text-eyebrow font-semibold text-accent uppercase">
                  Talk to us
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-ink-900">
                  {siteConfig.contact.person}
                </p>
                <p className="mt-1 text-ink-600">{siteConfig.contact.role}</p>

                <div className="mt-6 space-y-4">
                  <a
                    href={whatsappLink(
                      `Hello ${siteConfig.contact.person}, I'd like to enquire about your services.`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3.5 rounded-btn bg-[#25D366]/10 p-3.5 transition-colors duration-160 hover:bg-[#25D366]/20"
                  >
                    <MessageCircle aria-hidden className="size-5 text-[#128C7E]" />
                    <span>
                      <span className="block font-medium text-ink-900">
                        WhatsApp
                      </span>
                      <span className="text-sm text-ink-600">
                        Usually the fastest way to reach us
                      </span>
                    </span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phoneE164}`}
                    className="flex items-center gap-3.5 p-3.5 transition-colors duration-160 hover:text-accent"
                  >
                    <Phone aria-hidden className="size-5 text-accent" />
                    <span>
                      <span className="block font-medium text-ink-900">
                        {siteConfig.contact.phone}
                      </span>
                      <span className="text-sm text-ink-600">Call us</span>
                    </span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3.5 p-3.5 transition-colors duration-160 hover:text-accent"
                  >
                    <Mail aria-hidden className="size-5 text-accent" />
                    <span>
                      <span className="block font-medium break-all text-ink-900">
                        {siteConfig.contact.email}
                      </span>
                      <span className="text-sm text-ink-600">Email us</span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-4">
                {siteConfig.offices.map((office) => (
                  <div
                    key={office.id}
                    className="flex gap-4 rounded-card border border-mist-200 bg-white p-6"
                  >
                    <MapPin
                      aria-hidden
                      className="mt-0.5 size-5 shrink-0 text-accent"
                    />
                    <address className="not-italic">
                      <span className="font-display text-lg font-semibold text-ink-900">
                        {office.country}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] text-ink-600">
                        {office.addressLines.join(", ")}
                      </span>
                    </address>
                  </div>
                ))}
              </div>
            </Reveal>
          </aside>

          <div>
            <Reveal>
              <h2 className="text-h2 text-ink-900">Send us a message</h2>
              <p className="mt-3 text-lead text-ink-600">
                For a priced quote, the{" "}
                <a
                  href="/quote"
                  className="font-medium text-accent underline underline-offset-4"
                >
                  quote request form
                </a>{" "}
                collects what we need in three quick steps.
              </p>
            </Reveal>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
