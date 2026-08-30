import type { Metadata } from "next";

import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms on which 4M Global Services provides this website and the information published on it.",
  alternates: { canonical: "/terms" },
};

/* TODO(owner): these cover the website only. Your trading terms — liability
   limits, Incoterms handling, insurance, payment and the standard trading
   conditions you operate under — should be drafted by a lawyer and either
   linked here or published as a separate document. */

const lastUpdated = "August 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        lead={`The terms on which we provide this website. Last updated ${lastUpdated}.`}
        crumbs={[{ name: "Home", href: "/" }]}
      />

      <section className="section-y bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-[68ch] space-y-8 text-ink-700">
            <div>
              <h2 className="text-h3 text-ink-900">About this website</h2>
              <p className="mt-3 leading-relaxed">
                This website is operated by {siteConfig.name}. By using it you
                accept these terms. If you do not accept them, please do not use
                the site.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Information on this site</h2>
              <p className="mt-3 leading-relaxed">
                We publish descriptions of our services in good faith and keep
                them current. They are general information, not advice for a
                specific shipment. Customs requirements, permits, transit times
                and duties vary by commodity, route and date, and we confirm the
                position for your consignment before you commit to anything.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Quotations</h2>
              <p className="mt-3 leading-relaxed">
                Nothing on this website is a binding offer. A quotation is only
                given in writing, in response to a specific enquiry, and is
                valid for the period and on the conditions stated in it.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Provision of services</h2>
              <p className="mt-3 leading-relaxed">
                Logistics services are provided under the separate terms agreed
                for each engagement, together with the standard trading
                conditions that apply to that work. Those terms govern the
                service; this page governs the website.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Links to other sites</h2>
              <p className="mt-3 leading-relaxed">
                Where we link to carrier tracking tools or other third-party
                sites, we do so for convenience. We do not control them and are
                not responsible for their content or availability.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Intellectual property</h2>
              <p className="mt-3 leading-relaxed">
                The content, branding and design of this website belong to{" "}
                {siteConfig.name} unless stated otherwise. You may read, share
                and quote from it with attribution; please do not republish it
                wholesale as your own.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Changes</h2>
              <p className="mt-3 leading-relaxed">
                We may update these terms from time to time. The date at the top
                of this page shows when they were last revised.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about these terms can go to{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-accent underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
