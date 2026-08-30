import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { images, type SiteImage } from "@/lib/content/images";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento grid.
 *
 * Two cards run double-width so the six services plus the closing CTA fill
 * exactly three rows of three — an even block rather than a trailing gap.
 * Perishables clearance gets one of the wide cells because it is the genuine
 * differentiator: most forwarders in this bracket won't touch time-critical
 * cold-chain work.
 */

const WIDE: Record<string, SiteImage> = {
  "perishables-clearance": images.forklift,
  "door-to-door-delivery": images.courier,
};

export function ServicesBento() {
  return (
    <section className="section-y bg-mist-50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our services"
          title="A worldwide provider of cargo shipping services"
          lead="Specialised solutions matched to each client's requirements, covering customs brokerage and air, land and sea transportation."
          action={
            <Button asChild variant="outline">
              <Link href="/services">All services</Link>
            </Button>
          }
        />

        <Stagger className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const image = WIDE[service.slug];
            const wide = Boolean(image);

            return (
              <RevealItem
                key={service.slug}
                small
                className={cn(wide && "md:col-span-2")}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-card",
                    "border border-mist-200 bg-white p-6 shadow-e1",
                    "transition-[transform,box-shadow,border-color] duration-160 ease-out-quart",
                    "hover:-translate-y-1 hover:border-transparent hover:shadow-e2",
                    "motion-reduce:hover:translate-y-0",
                    wide && "md:flex-row md:items-center md:gap-8 md:p-8",
                  )}
                >
                  <div className={cn(wide && "md:flex-1")}>
                    <span className="inline-flex size-11 items-center justify-center rounded-btn bg-[var(--brand-accent-tint)] text-accent">
                      <service.icon aria-hidden className="size-5" />
                    </span>

                    <h3 className="mt-5 text-h3 text-ink-900">
                      {service.shortName}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {service.summary}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Learn more
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </div>

                  {image && (
                    <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[14px] md:mt-0 md:aspect-[4/3] md:w-56 lg:w-72">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 288px"
                        className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </div>
                  )}
                </Link>
              </RevealItem>
            );
          })}

          {/* Fills the grid and catches anyone who cannot place their shipment. */}
          <RevealItem small>
            <Link
              href="/quote"
              className="group flex h-full flex-col justify-between rounded-card bg-navy-950 p-6 text-white transition-[transform,background-color] duration-160 ease-out-quart hover:-translate-y-1 hover:bg-navy-900 motion-reduce:hover:translate-y-0"
            >
              <div>
                <h3 className="text-h3 text-white">
                  Not sure what you need?
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/65">
                  Tell us what you are shipping and where it has to be. We will
                  work out the rest.
                </p>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-orange-400">
                Get a quote
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-160 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </RevealItem>
        </Stagger>
      </div>
    </section>
  );
}
