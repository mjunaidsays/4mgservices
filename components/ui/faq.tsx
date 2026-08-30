"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import type { ServiceFaq } from "@/lib/content/services";

/**
 * FAQ accordion.
 *
 * Two jobs: it answers real questions for readers, and it feeds `FAQPage`
 * structured data — which answer engines lean on when deciding what to cite.
 * Question phrasing is therefore written the way people actually ask.
 */
export function Faq({ items }: { items: ServiceFaq[] }) {
  if (items.length === 0) return null;

  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-mist-200 border-y border-mist-200">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-160 hover:text-accent">
              <span className="font-display text-lg font-medium text-ink-900 group-hover:text-accent">
                {item.question}
              </span>
              <Plus
                aria-hidden
                className="mt-1 size-5 shrink-0 text-accent transition-transform duration-300 ease-out-quart group-data-[state=open]:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-3xl pb-6 leading-relaxed text-ink-600">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
