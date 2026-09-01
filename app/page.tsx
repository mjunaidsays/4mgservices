import type { Metadata } from "next";

import { BusinessLines } from "@/components/sections/business-lines";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Logistics, Interior Design, Campus Software & Kids' Learning`,
  description:
    "4M Global Services is a UAE and Pakistan based group running four businesses — freight forwarding and customs clearance, interior design and fit-out, campus management software, and a kids' learning app — each run by its own dedicated, specialist team.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <BusinessLines />
      <CtaBand
        title="Four businesses. Four expert teams."
        description="4M Global Services runs logistics, interior design, campus software and kids' learning — each through its own dedicated, specialist team. Whatever brought you here, we'd like to hear from you."
        primaryLabel="Contact us"
        primaryHref="/contact"
      />
    </>
  );
}
