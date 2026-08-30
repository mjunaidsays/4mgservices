import { Quote } from "lucide-react";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content/testimonials";

/**
 * Renders nothing until real testimonials exist. An empty section is better
 * than a fabricated one — invented praise is the fastest way to lose the trust
 * the rest of the page is working to build.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-y bg-mist-50">
      <div className="container-site">
        <SectionHeading
          eyebrow="In their words"
          title="What our customers say"
        />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.name} small className="h-full">
              <figure className="flex h-full flex-col rounded-card border border-mist-200 bg-white p-6 shadow-e1">
                <Quote aria-hidden className="size-6 text-accent" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-700">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-mist-200 pt-4">
                  <span className="block font-semibold text-ink-900">
                    {testimonial.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-600">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
