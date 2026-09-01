"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Mail, Phone, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  interiorsNav,
  logisticsNav,
  mainNav,
  siteConfig,
  technologyNav,
} from "@/lib/site-config";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Full-height drawer. Radix handles focus trapping, scroll locking and the
 * Escape key, so the whole menu stays keyboard-complete without custom code.
 */
export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="on-dark fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-navy-950 text-white shadow-e3 outline-none data-[state=open]:animate-slide-in-right"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>

          <div className="flex h-20 shrink-0 items-center justify-between border-b border-navy-800 px-5">
            <Logo markOnly />
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-btn text-white transition-colors duration-160 hover:bg-white/10"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-6" />
            </Dialog.Close>
          </div>

          {/* Closing on navigation belongs to the click that navigates, not to
              a pathname effect — the drawer is the thing being dismissed. */}
          <nav
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-6"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) {
                onOpenChange(false);
              }
            }}
          >
            <MenuGroup title="Logistics" items={logisticsNav} accent />
            <MenuGroup title="Technology" items={technologyNav} />
            <MenuGroup title="Interiors" items={interiorsNav} />

            <p className="mt-8 text-eyebrow font-semibold text-white/60 uppercase">
              Company
            </p>
            <ul className="mt-3 space-y-0.5">
              {mainNav
                .filter((item) => item.label !== "Services")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-btn px-3 py-3 text-[0.9375rem] text-white/85 transition-colors duration-160 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div
            className="shrink-0 space-y-3 border-t border-navy-800 px-5 py-5"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) {
                onOpenChange(false);
              }
            }}
          >
            <Button asChild size="md" className="w-full">
              <Link href="/quote">Get a Quote</Link>
            </Button>

            <div className="flex flex-col gap-1 pt-2 text-sm">
              <a
                href={`tel:${siteConfig.contact.phoneE164}`}
                className="inline-flex items-center gap-2 py-1.5 text-white/75 hover:text-white"
              >
                <Phone aria-hidden className="size-4" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 py-1.5 text-white/75 hover:text-white"
              >
                <Mail aria-hidden className="size-4" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuGroup({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: { label: string; href: string; description?: string }[];
  accent?: boolean;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <p
        className={
          accent
            ? "text-eyebrow font-semibold text-orange-400 uppercase"
            : "text-eyebrow font-semibold text-white/60 uppercase"
        }
      >
        {title}
      </p>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-btn px-3 py-3 text-[0.9375rem] text-white/85 transition-colors duration-160 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
