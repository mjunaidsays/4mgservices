"use client";

import { AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

/**
 * Errors are announced through an `aria-live` region so screen-reader users
 * learn a submission failed without having to hunt for the message.
 */
export function FormError({ message }: { message?: string }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {message && (
        <p className="flex items-start gap-2.5 rounded-btn border border-red-500/25 bg-red-500/5 p-4 text-[0.9375rem] text-red-500">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * Success state. Gives a reference, an honest response window and a one-tap
 * WhatsApp follow-up — the fastest channel in this market.
 */
export function FormSuccess({
  reference,
  title = "Thank you — we have your enquiry",
  description,
  whatsappMessage,
}: {
  reference?: string;
  title?: string;
  description?: string;
  whatsappMessage?: string;
}) {
  return (
    <div
      role="status"
      className="rounded-panel border border-mist-200 bg-white p-7 text-center shadow-e1 lg:p-10"
    >
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-teal-400/15 text-teal-400">
        <CheckCircle2 aria-hidden className="size-7" />
      </span>

      <h2 className="mt-5 text-h3 text-ink-900">{title}</h2>

      <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-600">
        {description ??
          `It has gone straight to our team. You can expect a reply within ${siteConfig.quoteResponseWindow}.`}
      </p>

      {reference && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-btn bg-mist-50 px-4 py-2.5 text-sm text-ink-700">
          Your reference
          <strong className="font-display tracking-wide text-ink-900">
            {reference}
          </strong>
        </p>
      )}

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild>
          <a
            href={whatsappLink(
              whatsappMessage ??
                `Hello, I've just submitted an enquiry${reference ? ` (ref ${reference})` : ""} through your website.`,
            )}
            target="_blank"
            rel="noreferrer noopener"
          >
            <MessageCircle aria-hidden />
            Follow up on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={`tel:${siteConfig.contact.phoneE164}`}>
            Call {siteConfig.contact.phone}
          </a>
        </Button>
      </div>
    </div>
  );
}
