import { images, type SiteImage } from "@/lib/content/images";

/**
 * The four industries named in the company profile.
 *
 * Content describes sector-specific logistics problems and how the service
 * lines address them. No client names, volumes or case results are claimed.
 */

export type Industry = {
  slug: string;
  number: string;
  name: string;
  /** One line, used on cards and in the nav. */
  summary: string;
  /** Answers "what is this page about" in the first 40 words — AEO. */
  intro: string;
  image: SiteImage;
  challenges: { title: string; description: string }[];
  howWeHelp: string[];
  /** Service slugs most relevant to this sector. */
  services: string[];
  faqs: { question: string; answer: string }[];
};

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    number: "01",
    name: "E-commerce",
    summary:
      "Fast-moving parcel and pallet volumes, with the documentation discipline cross-border selling demands.",
    intro:
      "E-commerce logistics means moving many small consignments quickly and predictably. 4M Global Services handles the inbound freight, customs clearance, storage and final-mile delivery that online sellers depend on to keep promises made at checkout.",
    image: images.parcelHandover,
    challenges: [
      {
        title: "Delivery promises made before the stock lands",
        description:
          "Customers are quoted a delivery date at checkout. A shipment held at customs turns a marketing promise into a refund.",
      },
      {
        title: "Many small consignments, many documents",
        description:
          "High order counts multiply the paperwork. One incorrect declaration can hold an entire consolidated shipment.",
      },
      {
        title: "Demand that spikes without warning",
        description:
          "Campaigns and seasons create volume you cannot warehouse for year-round.",
      },
    ],
    howWeHelp: [
      "Consolidated inbound freight from multiple suppliers into one shipment",
      "Pre-arrival document checks so clearance starts the moment cargo lands",
      "Flexible warehousing that absorbs seasonal peaks without a long lease",
      "Pick, pack and dispatch against your orders as they arrive",
      "Door-to-door delivery with proof of delivery at the end of it",
    ],
    services: [
      "sea-air-freight",
      "warehousing-distribution",
      "door-to-door-delivery",
    ],
    faqs: [
      {
        question: "Can you ship directly to a marketplace fulfilment centre?",
        answer:
          "Yes. Tell us the destination facility and its booking requirements when you request a quote, and we will route and label the consignment to meet them.",
      },
      {
        question: "Can you handle stock during a seasonal peak?",
        answer:
          "Yes. Short-term warehousing exists precisely for this — you take space for the weeks you need it rather than committing to a year-round lease.",
      },
    ],
  },

  {
    slug: "retail",
    number: "02",
    name: "Retail",
    summary:
      "Season-critical replenishment, consolidated shipments and predictable landed costs.",
    intro:
      "Retail logistics is governed by the calendar. Stock that arrives after a season starts has already lost most of its value, so we plan retail lanes around the shelf date rather than the shipping date.",
    image: images.warehouseRacking,
    challenges: [
      {
        title: "A deadline set by the season, not the supplier",
        description:
          "Late stock is discounted stock. The cost of a delay is measured in margin, not freight.",
      },
      {
        title: "Multiple suppliers, one delivery window",
        description:
          "Goods come from several sources and need to arrive as one coherent delivery.",
      },
      {
        title: "Landed cost that has to be known in advance",
        description:
          "Retail pricing is set months ahead. Surprise duties and charges break the model.",
      },
    ],
    howWeHelp: [
      "Consolidation of multiple suppliers into a single planned shipment",
      "Landed cost — freight, duties and handling — set out before you commit",
      "Mode chosen against the shelf date, with air used where sea would arrive too late",
      "Storage near the port so deliveries can be staged into stores",
      "Milestone updates so buying teams can plan around real dates",
    ],
    services: [
      "import-export-management",
      "sea-air-freight",
      "warehousing-distribution",
    ],
    faqs: [
      {
        question: "Can you consolidate stock from several suppliers?",
        answer:
          "Yes. Consolidation is one of the most effective ways to reduce both cost and handling — multiple suppliers are combined into one shipment, with one set of documents and one arrival to plan around.",
      },
      {
        question: "How do I know the landed cost before I commit?",
        answer:
          "We set out freight, duties and handling in the quote rather than presenting them as extras at destination. Transparent pricing with no hidden charges is one of our core commitments.",
      },
    ],
  },

  {
    slug: "manufacturing",
    number: "03",
    name: "Manufacturing",
    summary:
      "Raw materials, components and machinery moved on schedules production can rely on.",
    intro:
      "Manufacturing logistics is about protecting the production line. Late components stop a factory, so inbound freight for manufacturers is planned around the schedule the line runs to.",
    image: images.forklift,
    challenges: [
      {
        title: "A stopped line costs more than the freight",
        description:
          "When a component is late, the loss is idle plant and labour, not the shipping bill.",
      },
      {
        title: "Machinery and oversized cargo",
        description:
          "Heavy or out-of-gauge equipment needs planning that standard container freight does not.",
      },
      {
        title: "Buffer stock has to live somewhere",
        description:
          "Holding safety stock on the factory floor consumes space the line needs.",
      },
    ],
    howWeHelp: [
      "Inbound freight planned against your production schedule",
      "Routing and mode selected to protect the line, not just the freight budget",
      "Customs clearance handled ahead of arrival to avoid border delays",
      "Buffer stock held close to the port and released as the line needs it",
      "Export handling for finished goods leaving the plant",
    ],
    services: [
      "sea-air-freight",
      "customs-clearance",
      "warehousing-distribution",
    ],
    faqs: [
      {
        question: "Can you handle machinery and oversized cargo?",
        answer:
          "Tell us the dimensions, weight and lifting requirements when you enquire. Out-of-gauge cargo needs specific equipment and routing, so we plan and price it individually rather than treating it as standard freight.",
      },
      {
        question: "Can you hold buffer stock for us?",
        answer:
          "Yes. Warehousing near the port lets you keep safety stock off the factory floor and release it against the production schedule.",
      },
    ],
  },

  {
    slug: "healthcare",
    number: "04",
    name: "Healthcare",
    summary:
      "Temperature-sensitive and regulated cargo handled with chain-of-custody discipline.",
    intro:
      "Healthcare logistics carries two constraints at once: the cold chain and the regulator. Pharmaceuticals and medical goods must stay within temperature and arrive with a documented, unbroken chain of custody.",
    image: images.documents,
    challenges: [
      {
        title: "A broken cold chain destroys the product",
        description:
          "Temperature excursions can render a consignment unusable, regardless of whether it arrives on time.",
      },
      {
        title: "Regulatory approval on top of customs",
        description:
          "Drug and health authorities add approvals beyond the standard customs entry — each one a possible delay.",
      },
      {
        title: "Documentation that has to survive an audit",
        description:
          "Chain of custody must be evidenced, not asserted.",
      },
    ],
    howWeHelp: [
      "Cold-chain continuity maintained through the clearance window",
      "Pre-arrival lodgement of customs and health documentation",
      "Coordination with drug regulatory and health authorities",
      "Inspections attended in person to keep reefers connected and delays short",
      "Condition and handover recorded at every stage",
    ],
    services: [
      "perishables-clearance",
      "customs-clearance",
      "door-to-door-delivery",
    ],
    faqs: [
      {
        question: "Do you handle temperature-controlled pharmaceutical cargo?",
        answer:
          "Yes. Perishables and temperature-sensitive clearance is a specialist service line for us, covering pharmaceuticals alongside fresh and frozen food.",
      },
      {
        question: "What happens if a healthcare shipment is selected for inspection?",
        answer:
          "We attend the examination in person. For temperature-sensitive cargo this matters a great deal: an unattended inspection can leave a reefer disconnected far longer than the inspection itself takes.",
      },
    ],
  },
];

export const industrySlugs = industries.map((industry) => industry.slug);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
