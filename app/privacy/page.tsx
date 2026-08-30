import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How 4M Global Services collects, uses and protects the information you provide through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/* TODO(owner): have this reviewed against the data protection law that applies
   in your operating jurisdictions (UAE and Pakistan) before launch. It reflects
   what this website actually does, but it is not legal advice. */

const lastUpdated = "August 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead={`How we handle the information you share with us. Last updated ${lastUpdated}.`}
        crumbs={[{ name: "Home", href: "/" }]}
      />

      <section className="section-y bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-[68ch] space-y-8 text-ink-700">
            <div>
              <h2 className="text-h3 text-ink-900">What we collect</h2>
              <p className="mt-3 leading-relaxed">
                We collect only what you choose to send us through the forms on
                this site: your name, company, email address, phone number and
                the details of the shipment or enquiry you are asking about. We
                do not ask for payment details, identity documents or any other
                sensitive information through this website.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Why we collect it</h2>
              <p className="mt-3 leading-relaxed">
                We use your information for one purpose: to respond to your
                enquiry and, if you become a customer, to arrange and manage
                your shipments. We do not sell it, rent it, or share it with
                third parties for their own marketing.
              </p>
              <p className="mt-3 leading-relaxed">
                Where we need to involve a carrier, agent or customs authority to
                complete work you have asked us to do, we share only the
                information that work requires.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">How long we keep it</h2>
              <p className="mt-3 leading-relaxed">
                Enquiries that do not lead to a booking are kept only as long as
                is useful for following up. Records relating to actual shipments
                are kept for as long as commercial and customs record-keeping
                obligations require.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Cookies and analytics</h2>
              <p className="mt-3 leading-relaxed">
                This site does not use advertising or tracking cookies. We use
                privacy-friendly analytics to understand which pages are useful
                and how quickly the site loads. These measurements are
                aggregated and are not used to identify individual visitors.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Email</h2>
              <p className="mt-3 leading-relaxed">
                Form submissions are delivered to us by email through a
                third-party email service acting on our instructions. Your
                message is transmitted to that provider solely so it can reach
                our inbox.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Your choices</h2>
              <p className="mt-3 leading-relaxed">
                You can ask us at any time what information we hold about you,
                ask us to correct it, or ask us to delete it. Write to{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-accent underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>{" "}
                and we will action it.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about this policy can go to{" "}
                {siteConfig.contact.person} at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-accent underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>{" "}
                or {siteConfig.contact.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
