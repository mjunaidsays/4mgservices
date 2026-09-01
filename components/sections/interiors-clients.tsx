import Image from "next/image";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { interiorsClientLogos } from "@/lib/content/interiors";

/**
 * The client-logo wall. No quotes are attributed — the source profile
 * includes logos but no written testimonials, so this is framed as reach
 * rather than putting words in anyone's mouth.
 */
export function InteriorsClients() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="Customer satisfaction"
          title="Trusted across FMCG, retail, telecom and education"
          lead="A selection of the organisations 4M Interiors has designed and built for."
          align="center"
        />

        {/* 15 logos — exactly 3 rows of 5 at the desktop breakpoint. */}
        <Stagger className="mt-12 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5">
          {interiorsClientLogos.map((logo) => (
            <RevealItem key={logo.name} small className="mx-auto w-full max-w-28">
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-accent bg-white shadow-e1 transition-shadow duration-160 hover:shadow-e2">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
