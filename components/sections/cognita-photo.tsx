import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Illustrative education photography, not Cognita customers or product screens.
 * Downloaded 2026-09-19 under https://www.pexels.com/license/.
 * Local WebP files avoid runtime requests to stock-photo services.
 * Keep these additions separate so individual photos can be swapped or removed.
 */
const photos = {
  classroom: {
    src: "/images/cognita/classroom.webp",
    width: 1600,
    height: 1067,
    alt: "A teacher guiding students working together on laptops in a classroom",
    photographer: "Max Fischer",
    source: "https://www.pexels.com/photo/a-two-girls-using-laptop-with-classmates-5212695/",
  },
  library: {
    src: "/images/cognita/library.webp",
    width: 1400,
    height: 933,
    alt: "Sunlit study tables in front of library shelves filled with books",
    photographer: "Karina Lysenko",
    source: "https://www.pexels.com/photo/library-shelves-full-of-books-19572098/",
  },
  collaboration: {
    src: "/images/cognita/collaboration.webp",
    width: 1400,
    height: 933,
    alt: "Three students sharing a laptop and notebook during an outdoor study session",
    photographer: "Keira Burton",
    source: "https://www.pexels.com/photo/multiethnic-group-of-young-people-studying-with-notebook-and-laptop-6147210/",
  },
} as const;

export function CognitaPhoto({
  name,
  className,
}: {
  name: keyof typeof photos;
  className?: string;
}) {
  const photo = photos[name];

  return (
    <figure className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-panel border border-mist-200 bg-mist-100 shadow-e2">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
