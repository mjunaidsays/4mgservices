import type { Metadata } from "next";
import {
  Building2,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FileStack,
  Hammer,
  Home,
  Landmark,
  PenTool,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { InteriorsForm } from "@/components/forms/interiors-form";
import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { InteriorsClients } from "@/components/sections/interiors-clients";
import { InteriorsGallery } from "@/components/sections/interiors-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { interiorsProcess, interiorsProjects } from "@/lib/content/interiors";
import { breadcrumbJsonLd, interiorsBusinessJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "MND Interiors — interior design, architecture & fit-out",
  description:
    "MND Interiors designs and builds offices, retail, industrial and institutional spaces for 4M Global Services clients — from client brief through to execution.",
  alternates: { canonical: "/solutions/mnd-interiors" },
};

const projectTypeCards = [
  { icon: Home, name: "Residential", detail: "Homes and living spaces designed around how you actually use them." },
  { icon: Building2, name: "Commercial", detail: "Offices, showrooms and retail fit-outs built to carry a brand." },
  { icon: Factory, name: "Industrial", detail: "Plant floors, storage sheds and staff facilities, built for durability." },
  { icon: Landmark, name: "Institutional", detail: "Schools and campus spaces designed for how children actually learn." },
  { icon: FileStack, name: "Documents & Conservation", detail: "Documentation and conservation work for existing structures." },
];

const processIcons = [ClipboardList, PenTool, Ruler, FileStack, Hammer];

const projectCategoryCount = new Set(
  interiorsProjects.map((project) => project.category),
).size;

const stats = [
  {
    value: interiorsProjects.length,
    suffix: "",
    label: "Projects delivered",
    detail: "Corporate, retail, institutional and industrial spaces, start to finish.",
  },
  {
    value: 20000,
    suffix: "+",
    label: "Sq ft of built space",
    detail: "Combined area across the four projects with a stated size — the true total is larger.",
  },
  {
    value: new Date().getFullYear() - 2019,
    suffix: "",
    label: "Years operating",
    detail: "Handling interior, architecture and construction projects since 2019.",
  },
  {
    value: projectCategoryCount,
    suffix: "",
    label: "Project categories",
    detail: "Corporate office, industrial and institutional work delivered to date.",
  },
];

export default function MndInteriorsPage() {
  const heroImage = interiorsProjects[0]?.images[0];

  return (
    <div className="brand-mnd">
      <JsonLd
        data={[
          interiorsBusinessJsonLd({
            name: "MND Interiors",
            description:
              "Interior design, architecture and fit-out for offices, retail, industrial and institutional spaces.",
            url: "/solutions/mnd-interiors",
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: "MND Interiors", href: "/solutions/mnd-interiors" },
          ]),
        ]}
      />

      {/* Hero — a bespoke two-column layout (matching Mindora's own logo
          treatment) rather than the shared PageHero, so the real MND mark can
          sit alongside the copy instead of only appearing as text. */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
        {heroImage && (
          <>
            <div className="absolute inset-0 -z-20">
              <Image
                src={heroImage.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-20"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/92 to-navy-900/80"
            />
          </>
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />

        <div className="container-site pt-32 pb-20 md:pt-40 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span aria-hidden>/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/solutions" className="hover:text-white">
                  Solutions
                </Link>
                <span aria-hidden>/</span>
              </li>
              <li aria-current="page" className="text-white/80">
                MND Interiors
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal small>
                <p className="text-eyebrow font-semibold text-accent-dark uppercase">
                  MND Interiors
                </p>
              </Reveal>

              <h1 className="mt-4 text-h1 text-white">
                We convert your dreams into realities
              </h1>

              <Reveal small delay={0.1}>
                <p className="mt-6 max-w-xl text-lead text-white/70">
                  4M Global Services&apos; interior design, architecture and
                  fit-out division — handling residential, commercial,
                  industrial and institutional projects since 2019, from the
                  first client brief through to execution on site.
                </p>
              </Reveal>

              <Reveal small delay={0.18}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-[var(--brand-accent)] px-8 text-base font-medium text-white shadow-e1 transition-colors duration-160 hover:bg-[var(--brand-accent-hover)]"
                  >
                    <Ruler aria-hidden className="size-5" />
                    See our work
                  </a>
                  <a
                    href="#consult"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-white/25 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-colors duration-160 hover:border-white/60 hover:bg-white/10"
                  >
                    Request a consultation
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="justify-self-center" delay={0.1}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-125 rounded-full bg-mnd-500/20 blur-3xl"
                />
                {/* The real MND Interiors mark, background keyed out — it sits
                    directly on the hero rather than boxed in a card, since its
                    own gold and charcoal already read cleanly on navy. */}
                <Image
                  src="/brand/mnd-logo.png"
                  alt="MND Interiors — we convert your dreams into realities"
                  width={1534}
                  height={721}
                  priority
                  className="h-auto w-64 sm:w-80 lg:w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About & expertise */}
      <section className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              About us
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              Interior, architecture and construction, under one team
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              MND was established in 2019 and has successfully handled various
              architectural and construction projects of different scales and
              requirements. The company deals with a blend of projects related
              to interior, architecture, engineering and construction services.
            </p>
            <p className="mt-4 leading-relaxed text-ink-600">
              Our interior designers work collaboratively to provide
              innovative design solutions that are iconic. We provide a
              complete interior design service which speaks quality and suits
              your requirements — room interior, house interior and office
              interior design. Our services range from office interior design
              to shop interior design, academic and hotel buildings, showrooms
              and restaurant interior design.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {projectTypeCards.map((type) => (
              <RevealItem
                key={type.name}
                small
                className="rounded-card border border-mist-200 bg-mist-50 p-6"
              >
                <span className="grid size-11 place-items-center rounded-btn bg-[var(--brand-accent-tint)] text-accent">
                  <type.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                  {type.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {type.detail}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="on-dark section-y bg-navy-900 bg-grid-dark text-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our process"
            title="Five phases, from brief to handover"
            tone="dark"
          />

          <Stagger as="ol" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {interiorsProcess.map((phase, index) => {
              const Icon = processIcons[index] ?? ClipboardCheck;
              return (
                <RevealItem
                  as="li"
                  small
                  key={phase.phase}
                  className="rounded-card border border-navy-700 bg-navy-850 p-6"
                >
                  <span className="grid size-11 place-items-center rounded-btn bg-white/10 text-[var(--brand-accent-on-dark)]">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="mt-4 block font-display text-sm font-semibold text-white/45 tabular-nums">
                    Phase {phase.phase}
                  </span>
                  <h3 className="mt-1 text-h3 text-white">{phase.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                    {phase.description}
                  </p>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-site">
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label} small>
                <p className="font-display text-[3rem] leading-none font-semibold text-accent">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 font-medium text-ink-900">{stat.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {stat.detail}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Our Work — project gallery with lightbox */}
      <InteriorsGallery />

      {/* Customer Satisfaction — client logo wall */}
      <InteriorsClients />

      {/* Consultation form */}
      <section id="consult" className="section-y bg-mist-50">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              Get started
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              Request a design consultation
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              Tell us about the space and what you have in mind. We will come
              back with next steps shaped around your project, not a generic
              pitch.
            </p>
            <ul className="mt-7 space-y-3 text-ink-700">
              <li>Shaped around your space and your brief</li>
              <li>No obligation and no sales script</li>
              <li>Same team from concept through to execution</li>
            </ul>
          </Reveal>

          <InteriorsForm />
        </div>
      </section>
    </div>
  );
}
