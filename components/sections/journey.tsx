"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { images, type SiteImage } from "@/lib/content/images";
import { cn } from "@/lib/utils";

type Stage = {
  title: string;
  description: string;
  image: SiteImage;
};

const stages: Stage[] = [
  {
    title: "Enquiry",
    description:
      "You tell us the cargo, the route and the deadline. No account setup, no long forms — just the details we need to price it properly.",
    image: images.documents,
  },
  {
    title: "Quote",
    description:
      "We come back with routing options and a rate that includes freight, duties and handling. Competitive and honest, with no hidden charges.",
    image: images.inventoryScan,
  },
  {
    title: "Collection",
    description:
      "We arrange pickup from your supplier, factory or warehouse, and handle the export formalities at origin.",
    image: images.vanLoading,
  },
  {
    title: "Customs",
    description:
      "Documents are checked and lodged before arrival, so clearance starts the moment the cargo lands rather than days afterwards.",
    image: images.forklift,
  },
  {
    title: "Freight",
    description:
      "Your shipment moves by sea, air or road on our carrier network — with a status update at each milestone, so you never have to chase.",
    image: images.warehouseRacking,
  },
  {
    title: "Delivery",
    description:
      "Final-mile delivery to the destination address, with proof of delivery. One provider accountable from the first mile to the last.",
    image: images.parcelHandover,
  },
];

/**
 * Sticky scrollytelling. The claim "transparent, end-to-end" is easy to assert
 * and boring to read — this shows the six stages instead, advancing the sticky
 * panel as each block scrolls through.
 *
 * On small screens the sticky column is dropped and the stages simply stack, so
 * the content works identically without the effect.
 */
export function Journey() {
  const [active, setActive] = useState(0);

  return (
    <section className="on-dark section-y relative bg-navy-900 bg-grid-dark text-white">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-eyebrow font-semibold text-orange-400 uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-h2 text-white">
            Six stages, one point of responsibility
          </h2>
          <p className="mt-4 text-lead text-white/65">
            From first enquiry to final delivery, the same team owns your
            shipment. Here is exactly what happens in between.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky progress panel — desktop only. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <ol className="space-y-1">
                {stages.map((stage, index) => {
                  const isActive = index === active;
                  return (
                    <li key={stage.title}>
                      <div
                        className={cn(
                          "flex items-center gap-4 rounded-btn px-3 py-3 transition-colors duration-300",
                          isActive ? "bg-white/[0.06]" : "bg-transparent",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-300",
                            isActive
                              ? "bg-orange-500 text-navy-950"
                              : "bg-white/10 text-white/50",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-lg transition-colors duration-300",
                            isActive ? "text-white" : "text-white/60",
                          )}
                        >
                          {stage.title}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-orange-500"
                  animate={{
                    width: `${((active + 1) / stages.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                />
              </div>
            </div>
          </div>

          <ol className="space-y-14 lg:space-y-28">
            {stages.map((stage, index) => (
              <StageBlock
                key={stage.title}
                stage={stage}
                index={index}
                onActive={setActive}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StageBlock({
  stage,
  index,
  onActive,
}: {
  stage: Stage;
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // A tight band across the middle of the viewport decides which stage is
  // "current", so the sticky panel changes at a predictable scroll position.
  const inBand = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inBand) onActive(index);
  }, [inBand, index, onActive]);

  return (
    <motion.li
      ref={ref}
      data-reveal=""
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="overflow-hidden rounded-panel border border-navy-700 bg-navy-850"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={stage.image.src}
          alt={stage.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-850 via-navy-850/30 to-transparent"
        />
        <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-orange-500 text-sm font-semibold text-navy-950 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="p-6 lg:p-8">
        <h3 className="text-h3 text-white">{stage.title}</h3>
        <p className="mt-3 text-white/65">{stage.description}</p>
      </div>
    </motion.li>
  );
}
