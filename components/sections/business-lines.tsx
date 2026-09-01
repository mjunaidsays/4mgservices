import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/content/images";
import { interiorsProjects } from "@/lib/content/interiors";
import { ventures } from "@/lib/content/ventures";
import { cn } from "@/lib/utils";

/**
 * The four businesses, presented as equals — logistics plus the three
 * ventures from `ventures.ts`. Logistics is deliberately not added to that
 * array: `ventures.ts` is consumed unfiltered by `/solutions`, `/services`'s
 * own "Also from 4M" section and elsewhere, and a self-referential
 * "Logistics" entry would leak into all of them. So it is hand-built here,
 * once, and combined with `ventures` purely for rendering.
 */

type BusinessCard = {
  slug: string;
  name: string;
  href: string;
  tagline: string;
  description: string;
  audience: string;
  /** Sub-brand accent override; logistics has none and inherits the site default. */
  accentClass?: string;
  cover: ReactNode;
};

function PhotoCover({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

/** Mindora's artwork is a glow on solid white — framed as a tile, not keyed out. */
function LogoCover() {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-white">
      <Image
        src="/brand/mindora-logo.png"
        alt="Mindora"
        width={320}
        height={320}
        className="h-32 w-auto lg:h-40"
      />
    </div>
  );
}

/**
 * Cognita has no real logo or product screenshot anywhere in the project —
 * a confirmed, standing gap (see `CLAUDE.md` §5). Rather than fabricate a
 * screenshot, it gets a large, deliberate icon treatment on its own tinted
 * panel, sized to match the other cards' photo covers exactly.
 */
function IconCover({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-[var(--brand-accent-tint)]">
      <Icon aria-hidden className="size-16 text-accent lg:size-20" />
    </div>
  );
}

const interiorsCoverImage = interiorsProjects.find(
  (project) => project.slug === "united-industries",
)?.images[0];

const logisticsCard: BusinessCard = {
  slug: "logistics",
  name: "Logistics",
  href: "/services",
  tagline: "Fast. Reliable. Everywhere.",
  description:
    "Sea and air freight, customs clearance, warehousing and door-to-door cargo — handled end to end by one accountable team, across the UAE, Pakistan and worldwide.",
  audience: "For importers, exporters and enterprise supply chains",
  cover: (
    <PhotoCover
      src={images.warehouseRacking.src}
      alt={images.warehouseRacking.alt}
      priority
    />
  ),
};

const ventureCards: BusinessCard[] = ventures.map((venture) => ({
  slug: venture.slug,
  name: venture.name,
  href: venture.href,
  tagline: venture.tagline,
  description: venture.description,
  audience: venture.audience,
  accentClass: venture.accentClass,
  cover:
    venture.slug === "mindora" ? (
      <LogoCover />
    ) : venture.slug === "4m-interiors" && interiorsCoverImage ? (
      <PhotoCover
        src={interiorsCoverImage.src}
        alt={interiorsCoverImage.alt}
      />
    ) : venture.slug === "cognita" ? (
      <PhotoCover
        src={images.cognitaClassroom.src}
        alt={images.cognitaClassroom.alt}
      />
    ) : (
      <IconCover icon={venture.icon} />
    ),
}));

function CardBody({ card }: { card: BusinessCard }) {
  return (
    <>
      <h3 className="text-h3 text-ink-900">{card.name}</h3>
      <p className="mt-1.5 font-display text-base text-accent">
        {card.tagline}
      </p>
      <p className="mt-4 flex-1 leading-relaxed text-ink-600">
        {card.description}
      </p>
      <p className="mt-5 text-sm text-ink-400">{card.audience}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-accent">
        Explore {card.name}
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </span>
    </>
  );
}

export function BusinessLines() {
  return (
    <section id="businesses" className="section-y bg-white scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we do"
          title="Four businesses, four dedicated teams"
          lead="Logistics is where we started. Interior design, campus software and kids' learning are where we've grown — each run with the same accountability."
        />

        <Stagger className="mt-12 grid gap-5">
          <RevealItem small className="h-full">
            <Link
              href={logisticsCard.href}
              className="group flex h-full flex-col overflow-hidden rounded-panel border border-mist-200 bg-white shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0 lg:flex-row lg:items-stretch"
            >
              <div className="lg:w-1/2">{logisticsCard.cover}</div>
              <div className="flex flex-1 flex-col p-7 lg:p-10">
                <CardBody card={logisticsCard} />
              </div>
            </Link>
          </RevealItem>

          <div className="grid gap-5 sm:grid-cols-3">
            {ventureCards.map((card) => (
              <RevealItem
                key={card.href}
                small
                className={cn(card.accentClass, "h-full")}
              >
                <Link
                  href={card.href}
                  className="group flex h-full flex-col overflow-hidden rounded-panel border border-mist-200 bg-white shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                >
                  {card.cover}
                  <div className="flex flex-1 flex-col p-7">
                    <CardBody card={card} />
                  </div>
                </Link>
              </RevealItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
