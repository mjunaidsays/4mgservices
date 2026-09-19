import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";

import { DemoForm } from "@/components/forms/demo-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import {
  CognitaDetails,
  CognitaNavigation,
  CognitaOverview,
  CognitaPainPoints,
  CognitaWorkflow,
} from "@/components/sections/cognita-factsheet";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Cognita Campus OS — school management system",
  description:
    "Cognita Campus OS is a multi-tenant school management platform with role-based access control, automated fee recovery, exam lifecycle management and parent portals.",
  alternates: { canonical: "/solutions/cognita" },
};

export default function CognitaPage() {
  return (
    <div className="brand-cognita">
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: "Cognita Campus OS",
            description:
              "Multi-tenant school management SaaS with role-based access control, fee automation, exam lifecycle management and parent portals.",
            category: "BusinessApplication",
            url: "/solutions/cognita",
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: "Cognita Campus OS", href: "/solutions/cognita" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Cognita Campus OS"
        title="Your entire institution, in one command centre"
        lead="A comprehensive, multi-tenant operating system for modern schools, colleges and university networks — built on granular role-based access control."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
        ]}
      >
        <a
          href="#demo"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-[var(--brand-accent)] px-8 text-base font-medium text-white shadow-e1 transition-colors duration-160 hover:bg-[var(--brand-accent-hover)]"
        >
          <GraduationCap aria-hidden className="size-5" />
          Book a 20-minute demo
        </a>
      </PageHero>

      <CognitaNavigation />
      <CognitaOverview />
      <CognitaPainPoints />
      <CognitaWorkflow />
      <CognitaDetails />

      {/* Demo */}
      <section id="demo" className="section-y bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              See it in action
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              A 20-minute guided demonstration
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              We would welcome the opportunity to show you and your leadership
              team a brief walkthrough, tailored specifically to the operational
              goals and structure of your institution.
            </p>
            <ul className="mt-7 space-y-3 text-ink-700">
              <li>Shaped around your campuses, not a generic tour</li>
              <li>Your leadership team welcome to join</li>
              <li>No obligation and no sales script</li>
            </ul>
          </Reveal>

          <DemoForm />
        </div>
      </section>
    </div>
  );
}
