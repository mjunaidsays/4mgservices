import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Message pre-filled into WhatsApp. Keep it specific to the page. */
  whatsappMessage?: string;
};

/**
 * The closing call to action.
 *
 * Deliberately navy rather than a solid orange panel: white text on bright
 * orange measures 2.85:1, well under WCAG AA, and darkening the orange far
 * enough to fix it loses the very vividness that made the panel worth having.
 * Navy keeps the orange at full strength where it belongs — on the button.
 */
export function CtaBand({
  title = "Partner with us to move your business forward",
  description = "Tell us what you are shipping and where it needs to be. We will come back with routing options and an honest rate.",
  primaryLabel = "Get a Quote",
  primaryHref = "/quote",
  whatsappMessage = `Hello ${siteConfig.contact.person}, I'd like to discuss a shipment with 4M Global Services.`,
}: CtaBandProps) {
  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="on-dark relative isolate overflow-hidden rounded-panel bg-navy-950 px-6 py-12 text-white md:px-12 lg:px-16 lg:py-16">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />
            {/* Warm bloom, kept well behind the text. */}
            <div
              aria-hidden
              className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-orange-500/20 blur-3xl"
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-h2 text-white">{title}</h2>
                <p className="mt-4 text-lead text-white/70">{description}</p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild size="lg">
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>

                <Button asChild variant="outlineLight" size="lg">
                  <a
                    href={whatsappLink(whatsappMessage)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MessageCircle aria-hidden />
                    WhatsApp us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
