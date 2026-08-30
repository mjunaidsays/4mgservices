"use client";

import { Images, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { interiorsProjects, type InteriorsProject } from "@/lib/content/interiors";
import { cn } from "@/lib/utils";

/** Given the wide bento cell — the strongest, most varied project photography. */
const FEATURED = new Set([
  "coca-cola-engineering-office",
  "leos-workshop-tns-beaconhouse",
  "national-foods-faisalabad",
]);

export function InteriorsGallery() {
  const [active, setActive] = useState<InteriorsProject | null>(null);

  return (
    <section id="work" className="section-y bg-mist-50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our work"
          title="Projects delivered, not just rendered"
          lead="A selection of the spaces MND Interiors has designed and built — click a project to see the full set."
        />

        <Stagger className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {interiorsProjects.map((project) => {
            const wide = FEATURED.has(project.slug);
            const cover = project.images[0];

            return (
              <RevealItem
                key={project.slug}
                small
                className={cn(wide && "md:col-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className={cn(
                    "group relative flex h-full w-full flex-col overflow-hidden rounded-card text-left",
                    "border border-mist-200 bg-white shadow-e1",
                    "transition-[transform,box-shadow,border-color] duration-160 ease-out-quart",
                    "hover:-translate-y-1 hover:border-transparent hover:shadow-e2",
                    "motion-reduce:hover:translate-y-0",
                  )}
                >
                  {cover && (
                    <div
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden",
                        wide && "md:aspect-[16/9]",
                      )}
                    >
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes={wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                        className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0 to-transparent"
                      />
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <Images aria-hidden className="size-3.5" />
                        {project.images.length}
                      </span>
                      {project.category && (
                        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink-900">
                          {project.category}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-600">
                        <MapPin aria-hidden className="size-3.5 shrink-0" />
                        {project.location}
                      </p>
                    )}
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                      {project.summary}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-mist-100 pt-4">
                      {project.clientLogo ? (
                        <Image
                          src={project.clientLogo.src}
                          alt={project.clientLogo.name}
                          width={project.clientLogo.width}
                          height={project.clientLogo.height}
                          className="h-6 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-sm font-medium text-ink-600">
                          {project.client}
                        </span>
                      )}
                      {(project.worth || project.area) && (
                        <span className="text-xs text-ink-400">
                          {[project.area, project.worth].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>

      {active && (
        <Lightbox
          images={active.images}
          startIndex={0}
          open={Boolean(active)}
          onOpenChange={(next) => {
            if (!next) setActive(null);
          }}
          title={active.title}
        />
      )}
    </section>
  );
}
