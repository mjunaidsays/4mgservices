/**
 * Imagery extracted from the company's own logistics profile document and
 * converted to WebP. Dimensions are recorded so every `next/image` can reserve
 * its space and contribute nothing to CLS.
 *
 * TODO(owner): replace these with photographs of 4M's actual operations, team
 * and facilities. Authentic imagery is an E-E-A-T signal; these are the stock
 * frames already used in the profile deck.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const images = {
  hero: {
    src: "/images/hero-freight.webp",
    width: 1187,
    height: 1618,
    alt: "Container ship, cargo aircraft and delivery truck moving freight at dusk",
  },
  warehouseAisle: {
    src: "/images/warehouse-aisle.webp",
    width: 1100,
    height: 1863,
    alt: "Worker walking between tall racking aisles in a distribution warehouse",
  },
  warehouseRacking: {
    src: "/images/warehouse-racking.webp",
    width: 1237,
    height: 730,
    alt: "Pallets of boxed goods stacked on warehouse racking",
  },
  cargoBoxes: {
    src: "/images/cargo-boxes.webp",
    width: 1230,
    height: 1798,
    alt: "Stacked cardboard cargo cartons in a storage facility",
  },
  forklift: {
    src: "/images/forklift-operator.webp",
    width: 886,
    height: 970,
    alt: "Forklift operator in a high-visibility vest moving a pallet in a warehouse",
  },
  documents: {
    src: "/images/shipping-documents.webp",
    width: 1148,
    height: 623,
    alt: "Hands checking shipping labels and customs paperwork on a parcel",
  },
  courier: {
    src: "/images/courier-delivery.webp",
    width: 1109,
    height: 654,
    alt: "Courier lifting a parcel from a delivery van",
  },
  vanLoading: {
    src: "/images/van-loading.webp",
    width: 1018,
    height: 1487,
    alt: "Driver loading boxes into the back of a delivery van",
  },
  teamLoading: {
    src: "/images/team-loading.webp",
    width: 710,
    height: 776,
    alt: "Two logistics workers loading cartons into a van together",
  },
  inventoryScan: {
    src: "/images/inventory-scan.webp",
    width: 1040,
    height: 565,
    alt: "Warehouse operative scanning stock with a barcode reader and tablet",
  },
  parcelHandover: {
    src: "/images/parcel-handover.webp",
    width: 1224,
    height: 664,
    alt: "A parcel being handed from a courier to a customer",
  },
  distributionVan: {
    src: "/images/distribution-van.webp",
    width: 1189,
    height: 645,
    alt: "Drivers loading a distribution van at the kerbside",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
