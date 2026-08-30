"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { SiteImage } from "@/lib/content/images";

type LightboxProps = {
  images: SiteImage[];
  /** Index to open on. */
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Shown above the caption, e.g. the project title. */
  title?: string;
};

/**
 * A generic image lightbox — not tied to interiors — built on
 * `@radix-ui/react-dialog`, the same primitive already used for the mobile
 * nav drawer. Radix handles focus trapping, scroll locking, `Escape`, and
 * returning focus to the trigger on close, so none of that is reimplemented
 * here.
 */
export function Lightbox({
  images,
  startIndex,
  open,
  onOpenChange,
  title,
}: LightboxProps) {
  // The parent unmounts this component on close (see `InteriorsGallery`), so
  // every mount already starts at the right index — no resync effect needed.
  const [index, setIndex] = useState(startIndex);

  const image = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () => setIndex((current) => (current + 1) % images.length);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-navy-950/90 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-[70] flex flex-col outline-none data-[state=open]:animate-scale-in"
          aria-describedby={undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") goPrev();
            if (event.key === "ArrowRight") goNext();
          }}
        >
          <Dialog.Title className="sr-only">
            {title ? `${title} — image viewer` : "Image viewer"}
          </Dialog.Title>

          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-sm text-white/70 tabular-nums">
              {hasMultiple ? `${index + 1} / ${images.length}` : null}
            </p>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-btn text-white transition-colors duration-160 hover:bg-white/10"
              aria-label="Close image viewer"
            >
              <X aria-hidden className="size-6" />
            </Dialog.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            {hasMultiple && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-160 hover:bg-white/20 sm:left-4"
                aria-label="Previous image"
              >
                <ChevronLeft aria-hidden className="size-6" />
              </button>
            )}

            {image && (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="90vw"
                className="max-h-[70vh] w-auto max-w-full animate-fade-in rounded-lg object-contain sm:max-h-[78vh]"
                priority
              />
            )}

            {hasMultiple && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-160 hover:bg-white/20 sm:right-4"
                aria-label="Next image"
              >
                <ChevronRight aria-hidden className="size-6" />
              </button>
            )}
          </div>

          {image?.alt && (
            <p className="px-6 pb-6 text-center text-sm text-white/60">
              {image.alt}
            </p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
