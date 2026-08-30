import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  FileCheck2,
  Globe2,
  Snowflake,
  Ship,
  Truck,
} from "lucide-react";

/**
 * The six logistics services, from the company profile.
 *
 * Copy describes how the service works — it never claims volumes, clients,
 * certifications or timings the owner has not supplied. Anything of that kind
 * is marked `TODO(owner)` rather than invented.
 */

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  /** Short label for compact places — nav, breadcrumbs, cards. */
  shortName: string;
  icon: LucideIcon;
  /** One line. Used on cards and as the meta description seed. */
  summary: string;
  /** Answers "what is this" in the first 40 words — AEO formatting. */
  intro: string;
  /** Bento feature cell gets the wide slot on the services grid. */
  featured?: boolean;
  includes: { title: string; description: string }[];
  whoFor: string[];
  process: { title: string; description: string }[];
  documents: string[];
  faqs: ServiceFaq[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "sea-air-freight",
    name: "Sea & Air Freight",
    shortName: "Sea & Air Freight",
    icon: Ship,
    summary:
      "FCL, LCL and air cargo moved on a worldwide carrier and agent network.",
    intro:
      "Sea and air freight forwarding is the movement of your cargo between countries using ocean and air carriers. 4M Global Services books the space, coordinates the carriers and agents, and manages the paperwork from origin to destination.",
    featured: true,
    includes: [
      {
        title: "Full container load (FCL)",
        description:
          "A container dedicated to your cargo, sealed at origin and opened at destination.",
      },
      {
        title: "Less than container load (LCL)",
        description:
          "Consolidated space for smaller shipments, so you pay for the volume you use.",
      },
      {
        title: "Air freight",
        description:
          "For cargo where the cost of waiting outweighs the cost of flying.",
      },
      {
        title: "Carrier and agent coordination",
        description:
          "Booking, routing and handover managed through our partner network worldwide.",
      },
      {
        title: "Cargo insurance arrangement",
        description:
          "Cover arranged on request so the value of the goods is protected in transit.",
      },
      {
        title: "Consolidation",
        description:
          "Multiple suppliers combined into one shipment to reduce cost and handling.",
      },
    ],
    whoFor: [
      "Importers and exporters shipping between the UAE, Pakistan and the wider world",
      "SMEs expanding internationally for the first time",
      "Businesses that need one point of contact instead of several carriers",
    ],
    process: [
      {
        title: "Share the shipment",
        description:
          "Tell us the cargo, the route and the timing. We come back with routing options and a rate.",
      },
      {
        title: "Booking and collection",
        description:
          "We confirm space with the carrier and arrange collection from your supplier or warehouse.",
      },
      {
        title: "Documentation",
        description:
          "Bill of lading or air waybill, packing list, invoice and certificates prepared and checked.",
      },
      {
        title: "In transit",
        description:
          "You get status updates at each milestone rather than having to chase them.",
      },
      {
        title: "Arrival and clearance",
        description:
          "Customs handled at destination and delivery arranged onward to the final address.",
      },
    ],
    documents: [
      "Commercial invoice",
      "Packing list",
      "Bill of lading or air waybill",
      "Certificate of origin",
      "Letter of credit documents, where applicable",
    ],
    faqs: [
      {
        question: "Should I choose sea freight or air freight?",
        answer:
          "Sea freight costs less per kilogram and suits volume, weight and predictable schedules. Air freight costs more but moves in days rather than weeks, so it suits urgent, high-value or perishable cargo. We quote both when a shipment could reasonably go either way.",
      },
      {
        question: "What is the difference between FCL and LCL?",
        answer:
          "FCL gives you a whole container. LCL shares a container with other shippers, so you pay only for the space your cargo occupies. LCL is usually cheaper for small volumes, but involves consolidation and deconsolidation, which adds handling time.",
      },
      {
        question: "Can you arrange collection from my supplier?",
        answer:
          "Yes. We can take responsibility from the supplier's door, or from a port or airport of your choosing, depending on the Incoterm agreed with your seller.",
      },
      {
        question: "Do you arrange cargo insurance?",
        answer:
          "We can arrange cover on request. Standard carrier liability is limited and rarely reflects the commercial value of the goods, so insurance is worth considering on higher-value shipments.",
      },
    ],
    related: ["customs-clearance", "door-to-door-delivery", "import-export-management"],
  },

  {
    slug: "import-export-management",
    name: "Import & Export Management",
    shortName: "Import & Export",
    icon: Globe2,
    summary:
      "End-to-end trade coordination, so one team owns the shipment from origin to destination.",
    intro:
      "Import and export management means we coordinate the whole trade lane on your behalf — supplier liaison, freight booking, documentation, customs and delivery — instead of leaving you to stitch together separate providers.",
    includes: [
      {
        title: "Supplier and buyer coordination",
        description:
          "We deal with the counterparty's logistics team directly so you do not have to.",
      },
      {
        title: "Incoterm guidance",
        description:
          "Clear advice on where your responsibility and cost start and stop.",
      },
      {
        title: "Documentation management",
        description:
          "Invoices, packing lists, certificates and permits prepared and checked before they cause delays.",
      },
      {
        title: "Route and mode planning",
        description:
          "The combination of sea, air and road that meets your cost and deadline.",
      },
      {
        title: "Landed cost visibility",
        description:
          "Freight, duties and handling laid out up front, with no hidden charges.",
      },
      {
        title: "Single point of contact",
        description:
          "One named person accountable for the shipment, start to finish.",
      },
    ],
    whoFor: [
      "Businesses trading internationally without an in-house logistics team",
      "Companies managing multiple suppliers across different countries",
      "Teams that have outgrown ad-hoc freight arrangements",
    ],
    process: [
      {
        title: "Understand the trade lane",
        description:
          "Origin, destination, commodity, volume, frequency and the commercial terms already agreed.",
      },
      {
        title: "Plan and price",
        description:
          "We propose a route and mode, and set out the full landed cost.",
      },
      {
        title: "Execute",
        description:
          "Booking, collection, documentation and customs, coordinated by one team.",
      },
      {
        title: "Report",
        description:
          "Status at each milestone, and a record of documents for your files.",
      },
    ],
    documents: [
      "Commercial invoice and packing list",
      "Purchase order or sales contract",
      "Import or export licence, where the commodity requires one",
      "Certificate of origin",
      "Bank and letter of credit documents, where applicable",
    ],
    faqs: [
      {
        question: "What does import and export management actually cover?",
        answer:
          "It covers everything between your supplier's warehouse and your customer's door: booking freight, preparing and checking documents, clearing customs, paying duties, and arranging final delivery — coordinated by one team rather than several.",
      },
      {
        question: "Which Incoterm should I use?",
        answer:
          "It depends on how much of the journey you want to control and pay for. EXW puts almost everything on the buyer; DDP puts almost everything on the seller. We will talk through the practical implications for your specific lane before you agree terms.",
      },
      {
        question: "Can you handle both my imports and my exports?",
        answer:
          "Yes. Running both through one provider usually simplifies documentation and gives a clearer view of total logistics cost.",
      },
    ],
    related: ["sea-air-freight", "customs-clearance", "warehousing-distribution"],
  },

  {
    slug: "customs-clearance",
    name: "Customs Clearance & Documentation",
    shortName: "Customs Clearance",
    icon: FileCheck2,
    summary:
      "Declarations, duties and compliance handled so cargo is not sitting at the border.",
    intro:
      "Customs clearance is the process of getting cargo legally released by the authorities at the border. We prepare and file the declaration, classify the goods, calculate duties and taxes, and resolve queries so your shipment keeps moving.",
    featured: true,
    includes: [
      {
        title: "Declaration filing",
        description:
          "Import and export declarations lodged accurately, first time.",
      },
      {
        title: "HS classification",
        description:
          "Correct tariff codes, because the wrong code means the wrong duty and a delay.",
      },
      {
        title: "Duty and tax calculation",
        description:
          "What is payable, worked out before the cargo arrives rather than after.",
      },
      {
        title: "Regulatory permits",
        description:
          "Coordination with the agencies whose approval your commodity needs.",
      },
      {
        title: "Query and inspection handling",
        description:
          "We deal with examinations and customs queries on your behalf.",
      },
      {
        title: "3PL documentation",
        description:
          "Third-party logistics paperwork arranged where your supply chain needs it.",
      },
    ],
    whoFor: [
      "Importers who have had shipments held at the border",
      "Exporters shipping a commodity that needs permits or certificates",
      "Businesses that want duty exposure known before the cargo lands",
    ],
    process: [
      {
        title: "Document review",
        description:
          "We check the invoice, packing list and transport document before arrival, when problems are still cheap to fix.",
      },
      {
        title: "Classification and valuation",
        description:
          "Tariff codes assigned and the declared value confirmed.",
      },
      {
        title: "Declaration",
        description:
          "The entry is filed with customs and duties are assessed.",
      },
      {
        title: "Examination, if selected",
        description:
          "We attend and manage any physical inspection.",
      },
      {
        title: "Release",
        description:
          "Duties settled, cargo released, and delivery arranged.",
      },
    ],
    documents: [
      "Commercial invoice",
      "Packing list",
      "Bill of lading or air waybill",
      "Certificate of origin",
      "Import or export licence and product-specific permits",
    ],
    faqs: [
      {
        question: "Why do shipments get held at customs?",
        answer:
          "Most holds trace back to paperwork: a mismatch between the invoice and the packing list, an incorrect HS code, an undervalued declaration, or a missing permit for a regulated commodity. Reviewing documents before arrival prevents the majority of them.",
      },
      {
        question: "How long does customs clearance take?",
        answer:
          "When the documents are complete and correct, clearance is typically routine. Timelines vary by port, commodity and whether the shipment is selected for examination, so we give a realistic estimate for your specific consignment rather than a blanket figure.",
      },
      {
        question: "Who is responsible for paying duties and taxes?",
        answer:
          "That depends on the Incoterm. Under DDP the seller pays; under most other terms the importer does. We tell you what is payable before the cargo arrives so there is no surprise.",
      },
      {
        question: "Can you clear cargo another forwarder shipped?",
        answer:
          "Yes. Clearance can be handled independently of who moved the freight, provided we receive the transport document and the commercial paperwork.",
      },
    ],
    related: ["perishables-clearance", "sea-air-freight", "import-export-management"],
  },

  {
    slug: "perishables-clearance",
    name: "Customs Clearance of Perishable Items",
    shortName: "Perishables Clearance",
    icon: Snowflake,
    summary:
      "Time-critical cold-chain clearance for cargo that cannot wait at the border.",
    intro:
      "Perishable customs clearance is the release of cargo that degrades with time — fresh produce, chilled and frozen food, pharmaceuticals and other temperature-sensitive goods. The work is the same as standard clearance, except every hour of delay costs product.",
    featured: true,
    includes: [
      {
        title: "Pre-arrival preparation",
        description:
          "Documents lodged and checked before the shipment lands, so clearance starts on arrival, not after it.",
      },
      {
        title: "Cold-chain continuity",
        description:
          "Reefer handling and temperature-controlled storage coordinated through the clearance window.",
      },
      {
        title: "Health and quarantine liaison",
        description:
          "Coordination with the food safety, plant health and drug regulatory bodies your commodity falls under.",
      },
      {
        title: "Priority handling",
        description:
          "Perishable consignments are worked ahead of general cargo in our queue.",
      },
      {
        title: "Inspection attendance",
        description:
          "We attend examinations in person to keep them short.",
      },
      {
        title: "Immediate onward delivery",
        description:
          "Transport arranged to leave as soon as the cargo is released.",
      },
    ],
    whoFor: [
      "Importers and exporters of fresh, chilled or frozen food",
      "Pharmaceutical and healthcare distributors moving temperature-sensitive product",
      "Businesses whose cargo has previously spoiled waiting for clearance",
    ],
    process: [
      {
        title: "Pre-alert",
        description:
          "We take the shipment details before departure, not on arrival.",
      },
      {
        title: "Documents lodged early",
        description:
          "The declaration and health paperwork are prepared while the cargo is still in transit.",
      },
      {
        title: "Regulator coordination",
        description:
          "Inspections booked with the relevant health or quarantine authority in advance.",
      },
      {
        title: "Release and collect",
        description:
          "Duties settled and the reefer collected the moment release is granted.",
      },
      {
        title: "Onward delivery",
        description:
          "Temperature-controlled transport to the cold store or customer, straight from the port.",
      },
    ],
    documents: [
      "Commercial invoice and packing list",
      "Phytosanitary or health certificate",
      "Certificate of origin",
      "Temperature log or reefer data, where required",
      "Product registration or import permit for regulated goods",
    ],
    faqs: [
      {
        question: "Why do perishables need specialist clearance?",
        answer:
          "Because the deadline is biological, not commercial. Perishable cargo usually needs health, phytosanitary or drug-regulatory approval on top of the standard customs entry, and each additional approval is another chance to lose days the product does not have.",
      },
      {
        question: "What happens if the shipment is selected for inspection?",
        answer:
          "We attend the examination in person and keep the cold chain intact around it. Attending matters: an unattended inspection can leave a reefer disconnected far longer than the inspection itself takes.",
      },
      {
        question: "Can clearance begin before the cargo arrives?",
        answer:
          "Yes, and for perishables it should. Lodging the declaration and health documentation while the shipment is still in transit is the single most effective way to shorten the time between arrival and release.",
      },
      {
        question: "Do you handle pharmaceutical and healthcare cargo?",
        answer:
          "Yes. Healthcare is one of the four industries we serve, and temperature-sensitive, regulated cargo is handled with chain-of-custody discipline throughout.",
      },
    ],
    related: ["customs-clearance", "warehousing-distribution", "sea-air-freight"],
  },

  {
    slug: "warehousing-distribution",
    name: "Warehousing & Distribution",
    shortName: "Warehousing",
    icon: Boxes,
    summary:
      "Secure storage, inventory handling and onward distribution, with 3PL documentation.",
    intro:
      "Warehousing and distribution covers storing your goods after they land and moving them out as your orders require. It removes the pressure to take a full container into your own premises the day it clears.",
    includes: [
      {
        title: "Short and long-term storage",
        description:
          "Space for a few days between clearance and delivery, or ongoing stock holding.",
      },
      {
        title: "Inventory handling",
        description:
          "Receiving, put-away, picking and stock counts.",
      },
      {
        title: "Order fulfilment",
        description:
          "Orders picked, packed and dispatched as they come in.",
      },
      {
        title: "Cross-docking",
        description:
          "Inbound cargo split and sent straight back out without being stored.",
      },
      {
        title: "3PL documentation",
        description:
          "The third-party logistics paperwork your supply chain and auditors need.",
      },
      {
        title: "Secure handling",
        description:
          "Controlled access, with cargo condition recorded on receipt and release.",
      },
    ],
    whoFor: [
      "E-commerce and retail businesses with fluctuating stock levels",
      "Importers who cannot take a full container in one delivery",
      "Manufacturers holding buffer stock close to the port",
    ],
    process: [
      {
        title: "Intake",
        description:
          "Cargo received, checked against the packing list and recorded.",
      },
      {
        title: "Storage",
        description:
          "Goods stored in conditions appropriate to the commodity.",
      },
      {
        title: "Order handling",
        description:
          "We pick and pack against your instructions.",
      },
      {
        title: "Dispatch",
        description:
          "Onward distribution, tracked through to delivery.",
      },
    ],
    documents: [
      "Packing list and goods receipt note",
      "Stock and inventory instructions",
      "Delivery orders",
      "3PL agreements and handling documentation",
    ],
    faqs: [
      {
        question: "Can you store cargo immediately after clearance?",
        answer:
          "Yes. Storage straight off the back of clearance is one of the most common reasons customers use it — it means the container can be returned promptly without forcing a same-day delivery into your own premises.",
      },
      {
        question: "Do you handle order fulfilment as well as storage?",
        answer:
          "Yes. Goods can be picked, packed and dispatched against your orders, rather than sitting until you collect the whole consignment.",
      },
      {
        question: "What is 3PL documentation?",
        answer:
          "It is the paperwork trail created when a third party stores and handles your goods: receipts, stock records, handling instructions and release notes. We can arrange this for you.",
      },
    ],
    related: ["door-to-door-delivery", "perishables-clearance", "import-export-management"],
  },

  {
    slug: "door-to-door-delivery",
    name: "Door-to-Door Cargo Delivery",
    shortName: "Door-to-Door",
    icon: Truck,
    summary:
      "Collection, freight, clearance and final mile under one responsibility.",
    intro:
      "Door-to-door delivery means we collect from the origin address and deliver to the destination address, handling the freight, the customs clearance and the final mile in between. One provider, one point of accountability.",
    includes: [
      {
        title: "Collection at origin",
        description:
          "Pickup from your supplier's premises, factory or warehouse.",
      },
      {
        title: "Main leg freight",
        description:
          "Sea, air or road, chosen to match your deadline and budget.",
      },
      {
        title: "Customs at both ends",
        description:
          "Export clearance at origin and import clearance at destination.",
      },
      {
        title: "Last-mile delivery",
        description:
          "Final delivery to the address you specify, not just to the port.",
      },
      {
        title: "Milestone updates",
        description:
          "Status at collection, departure, arrival, clearance and delivery.",
      },
      {
        title: "One point of contact",
        description:
          "No handoffs between providers, and no gaps where responsibility gets lost.",
      },
    ],
    whoFor: [
      "Businesses that want one invoice and one accountable provider",
      "E-commerce sellers shipping to customers or fulfilment centres",
      "Anyone who has lost a shipment in the gap between two providers",
    ],
    process: [
      {
        title: "Book",
        description:
          "Give us both addresses, the cargo details and the date you need it delivered.",
      },
      {
        title: "Collect",
        description:
          "We pick up from origin and handle export formalities.",
      },
      {
        title: "Move",
        description:
          "Main leg freight on the mode agreed.",
      },
      {
        title: "Clear",
        description:
          "Import clearance handled on arrival.",
      },
      {
        title: "Deliver",
        description:
          "Final mile to the destination address, with proof of delivery.",
      },
    ],
    documents: [
      "Commercial invoice and packing list",
      "Collection and delivery addresses with contacts",
      "Bill of lading or air waybill",
      "Import permits, where the commodity requires them",
    ],
    faqs: [
      {
        question: "What does door-to-door actually include?",
        answer:
          "Collection from the origin address, export clearance, the main freight leg, import clearance, duties handling and delivery to the final destination address — all arranged and tracked by us.",
      },
      {
        question: "Is door-to-door more expensive than port-to-port?",
        answer:
          "The headline rate is higher because it covers more of the journey. Compared like for like — once you add the collection, clearance and final-mile costs you would otherwise arrange separately — it is usually competitive, and there is a single party accountable if something goes wrong.",
      },
      {
        question: "Do you deliver to residential addresses?",
        answer:
          "Delivery is arranged to the address you specify. Tell us the destination type when you request a quote, since access and equipment requirements affect the final mile.",
      },
    ],
    related: ["sea-air-freight", "warehousing-distribution", "customs-clearance"],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
