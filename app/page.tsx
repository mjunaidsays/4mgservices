import type { Metadata } from "next";

import { Advantages } from "@/components/sections/advantages";
import { CtaBand } from "@/components/sections/cta-band";
import { FeaturedVentures } from "@/components/sections/featured-ventures";
import { Hero } from "@/components/sections/hero";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Journey } from "@/components/sections/journey";
import { ServicesBento } from "@/components/sections/services-bento";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VenturesStrip } from "@/components/sections/ventures-strip";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Logistics, Transport & Customs Clearance`,
  description:
    "UAE and Pakistan based freight forwarding and customs clearance. Sea and air freight, import and export management, perishables clearance, warehousing and door-to-door cargo delivery.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <TrustStrip />
      <FeaturedVentures />
      <ServicesBento />
      <Journey />
      <Advantages />
      <Stats />
      <IndustriesGrid />
      <WhyChooseUs />
      <Testimonials />
      <VenturesStrip />
      <CtaBand />
    </>
  );
}