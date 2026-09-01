import type { SiteImage } from "@/lib/content/images";
import type { ClientLogo } from "@/lib/content/testimonials";

/**
 * 4M Interiors — 4M Global Services' interior design, architecture and fit-out
 * division (formerly branded "MND Interiors"). All copy, figures and imagery
 * are sourced directly from the company's own supplied profile ("MND
 * interior_Company Profile final.pdf"); nothing here is invented. Two
 * exclusions, both confirmed with the owner:
 *
 *   - The AIN Engineering Services project has no client logo anywhere in the
 *     source document and none could be found publicly, so it lists a client
 *     name but no logo badge.
 *   - One of the 16 client-logo tiles in the source is an unlabelled abstract
 *     icon that can't be identified by name, so it is left out entirely.
 */

export type InteriorsProject = {
  slug: string;
  title: string;
  client?: string;
  clientLogo?: ClientLogo;
  location?: string;
  category: string;
  worth?: string;
  area?: string;
  summary: string;
  images: SiteImage[];
};

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
): SiteImage => ({ src, width, height, alt });

export const interiorsProjects: InteriorsProject[] = [
  {
    slug: "national-foods-faisalabad",
    title: "National Foods — Regional Sales Office",
    client: "National Foods Limited",
    clientLogo: { name: "National Foods", src: "/clients/national-foods.png", width: 208, height: 208 },
    location: "Faisalabad",
    category: "Corporate Office",
    summary:
      "A full interior fit-out for National Foods' regional sales office — reception, cafeteria, boardroom and open-plan workstations, tied together with the brand's own colour and signage.",
    images: [
      img("/images/interiors/national-foods-faisalabad-1.webp", 948, 711, "Reception seating area at National Foods' regional sales office, Faisalabad"),
      img("/images/interiors/national-foods-faisalabad-2.webp", 610, 814, "Branded entrance corridor with National Foods signage"),
      img("/images/interiors/national-foods-faisalabad-3.webp", 610, 814, "Reception desk and waiting area with a welcome wall graphic"),
      img("/images/interiors/national-foods-faisalabad-4.webp", 610, 814, "Corridor with electrical panel and welcome signage"),
      img("/images/interiors/national-foods-faisalabad-5.webp", 906, 680, "Staff cafeteria and breakout seating"),
      img("/images/interiors/national-foods-faisalabad-6.webp", 643, 858, "Open-plan workstations with black ceiling and pendant lighting"),
      img("/images/interiors/national-foods-faisalabad-7.webp", 907, 680, "Boardroom with a long conference table and wall-mounted screens"),
      img("/images/interiors/national-foods-faisalabad-8.webp", 643, 858, "Informal lounge seating in green and beige tones"),
    ],
  },
  {
    slug: "dealcart-dha-raya",
    title: "DealCart — Office Fit-Out",
    client: "DealCart",
    clientLogo: { name: "DealCart", src: "/clients/dealcart.png", width: 225, height: 225 },
    location: "DHA Raya, Lahore",
    category: "Corporate Office",
    summary:
      "A playful, brand-led workspace for DealCart's Lahore office — open desking, breakout games space and hand-painted brand murals carrying the company's mission and values onto the walls.",
    images: [
      img("/images/interiors/dealcart-dha-raya-1.webp", 1400, 614, "Breakout area with a table-tennis table and slatted timber screening"),
      img("/images/interiors/dealcart-dha-raya-2.webp", 1400, 614, "Open desking beside the DealCart brand-values wall mural"),
      img("/images/interiors/dealcart-dha-raya-3.webp", 1400, 614, "Evening view of the open-plan workspace"),
      img("/images/interiors/dealcart-dha-raya-4.webp", 1400, 614, "Blue accent wall with framed artwork and additional breakout seating"),
      img("/images/interiors/dealcart-dha-raya-5.webp", 1400, 614, "DealCart brand mural — 'Dealcart Karo, Bachat ki Baat Karo'"),
      img("/images/interiors/dealcart-dha-raya-6.webp", 1400, 614, "Glass-partitioned meeting room beside the main desking area"),
      img("/images/interiors/dealcart-dha-raya-7.webp", 1400, 614, "Reception area detail"),
      img("/images/interiors/dealcart-dha-raya-8.webp", 1400, 614, "Additional workstation view"),
    ],
  },
  {
    slug: "coca-cola-engineering-office",
    title: "Coca-Cola Export Corporation — Engineering Office",
    client: "The Coca-Cola Export Corporation, Pakistan Branch",
    clientLogo: { name: "Coca-Cola", src: "/clients/coca-cola.png", width: 247, height: 139 },
    location: "Raiwind Road, Lahore",
    category: "Corporate Office",
    summary:
      "Design and execution of an engineering office for The Coca-Cola Export Corporation's Pakistan branch — concept renders carried through to a finished collaborative workspace with acoustic panelling and shared desking.",
    images: [
      img("/images/interiors/coca-cola-engineering-office-1.webp", 1400, 788, "Concept render of the shared workstation area with acoustic wall panelling"),
      img("/images/interiors/coca-cola-engineering-office-2.webp", 1400, 787, "Concept render of the overhead workstation layout"),
      img("/images/interiors/coca-cola-engineering-office-3.webp", 468, 1040, "Completed workstation area with patterned acoustic wall panels"),
      img("/images/interiors/coca-cola-engineering-office-4.webp", 468, 1040, "Detail of the textured feature wall and lighting"),
      img("/images/interiors/coca-cola-engineering-office-5.webp", 468, 1040, "Meeting room glass door and interior signage"),
      img("/images/interiors/coca-cola-engineering-office-6.webp", 468, 1040, "Private office with desk and guest seating"),
    ],
  },
  {
    slug: "ain-engineering-porta-cabin",
    title: "AIN Engineering Services — Porta Cabin",
    client: "AIN Engineering Services Pvt Ltd",
    location: "Lahore",
    category: "Industrial",
    summary:
      "Design and execution of a prefabricated porta cabin for AIN Engineering Services — from concept render through to a finished, fully wired workspace with partitioned offices and workstations.",
    images: [
      img("/images/interiors/ain-engineering-porta-cabin-1.webp", 1400, 804, "Concept render of the porta cabin exterior with a living green wall"),
      img("/images/interiors/ain-engineering-porta-cabin-2.webp", 1400, 788, "Concept render of the interior open workstation layout"),
      img("/images/interiors/ain-engineering-porta-cabin-3.webp", 780, 1040, "Completed cabin exterior with covered walkway"),
      img("/images/interiors/ain-engineering-porta-cabin-4.webp", 720, 1280, "Cabin corridor connecting adjoining sections"),
      img("/images/interiors/ain-engineering-porta-cabin-5.webp", 899, 1599, "Cabin exterior finished in blue-trimmed cladding"),
      img("/images/interiors/ain-engineering-porta-cabin-6.webp", 780, 1040, "Fitted-out interior with partitioned workstations"),
    ],
  },
  {
    slug: "nfl-galaxy-steel-benches",
    title: "NFL Galaxy — Stainless Steel Benches",
    client: "National Foods Limited",
    clientLogo: { name: "National Foods", src: "/clients/national-foods.png", width: 208, height: 208 },
    location: "Faisalabad Plant",
    category: "Industrial",
    summary:
      "Supply and installation of stainless steel benching for the NFL Galaxy project's Faisalabad plant — durable, food-grade fittings sized to the facility's full production floor.",
    images: [
      img("/images/interiors/nfl-galaxy-steel-benches-1.webp", 1280, 960, "Rows of stainless steel benches across the plant floor"),
      img("/images/interiors/nfl-galaxy-steel-benches-2.webp", 1280, 960, "Stainless steel benching viewed from the production floor"),
    ],
  },
  {
    slug: "nfl-gujranwala-shed",
    title: "NFL Gujranwala — G.I. Corrugated Shed",
    client: "National Foods Limited",
    clientLogo: { name: "National Foods", src: "/clients/national-foods.png", width: 208, height: 208 },
    location: "Gujranwala Plant",
    category: "Industrial",
    summary:
      "Supply and construction of a galvanised-iron corrugated shed for goods staking at the NFL Gujranwala plant — structural steelwork through to a finished, weatherproof storage span.",
    images: [
      img("/images/interiors/nfl-gujranwala-shed-1.webp", 1080, 810, "Completed shed with palletised goods staged beneath"),
      img("/images/interiors/nfl-gujranwala-shed-2.webp", 1080, 810, "Steel truss structure under construction"),
      img("/images/interiors/nfl-gujranwala-shed-3.webp", 1080, 1440, "Crane installing structural steelwork on site"),
      img("/images/interiors/nfl-gujranwala-shed-4.webp", 1080, 810, "Structural framework spanning the storage yard"),
    ],
  },
  {
    slug: "nfl-gujranwala-pu-flooring",
    title: "NFL Gujranwala — PU Flooring",
    client: "National Foods Limited",
    clientLogo: { name: "National Foods", src: "/clients/national-foods.png", width: 208, height: 208 },
    location: "Gujranwala Plant",
    category: "Industrial",
    summary:
      "Polyurethane flooring installed across the NFL Gujranwala plant — a seamless, hygienic and chemical-resistant surface finished around existing columns and drainage channels.",
    images: [
      img("/images/interiors/nfl-gujranwala-pu-flooring-1.webp", 1040, 780, "Freshly finished PU floor with drainage channel"),
      img("/images/interiors/nfl-gujranwala-pu-flooring-2.webp", 1040, 780, "Wide view of the completed PU floor across the plant bay"),
      img("/images/interiors/nfl-gujranwala-pu-flooring-3.webp", 585, 1040, "Glass-partitioned room built within the plant"),
      img("/images/interiors/nfl-gujranwala-pu-flooring-4.webp", 1040, 585, "PU floor finished around structural columns"),
    ],
  },
  {
    slug: "milvik-bima",
    title: "Milvik (BIMA) Mobile Pakistan",
    client: "Milvik (BIMA)",
    clientLogo: { name: "BIMA", src: "/clients/bima.png", width: 224, height: 225 },
    location: "Lahore",
    category: "Corporate Office",
    worth: "PKR 5 Million",
    area: "2,000 sq ft",
    summary:
      "A 2,000 sq ft office fit-out for Milvik (BIMA) in Lahore, featuring a signature slatted-timber feature wall with an inset statement clock, glazed meeting rooms and warm pendant lighting.",
    images: [
      img("/images/interiors/milvik-bima-1.webp", 720, 1280, "Slatted-timber feature wall with an inset statement clock"),
      img("/images/interiors/milvik-bima-2.webp", 720, 1280, "Glazed meeting room beside the timber feature wall"),
      img("/images/interiors/milvik-bima-3.webp", 1280, 720, "Open-plan desking with geometric pendant lighting"),
      img("/images/interiors/milvik-bima-4.webp", 1280, 720, "Private office with a low sofa and desk setting"),
    ],
  },
  {
    slug: "next-step-consultants",
    title: "Next Step Consultants",
    client: "Next Step Consultants Pvt Ltd",
    clientLogo: { name: "Next Step Consultants", src: "/clients/next-step-consultants.png", width: 225, height: 225 },
    location: "Faisalabad",
    category: "Corporate Office",
    worth: "PKR 7 Million",
    area: "3,000 sq ft",
    summary:
      "A 3,000 sq ft branded fit-out for Next Step Consultants — a lime-green and charcoal reception with illuminated signage, a reclaimed-timber feature wall and a motivational-graphic boardroom.",
    images: [
      img("/images/interiors/next-step-consultants-1.webp", 1280, 851, "Reception lounge with illuminated Next Step signage and lime-green slats"),
      img("/images/interiors/next-step-consultants-2.webp", 1280, 851, "Reception desk area with reclaimed-timber panelling"),
      img("/images/interiors/next-step-consultants-3.webp", 1280, 851, "Additional lounge seating in olive and mustard tones"),
      img("/images/interiors/next-step-consultants-4.webp", 1280, 851, "Boardroom with a motivational wall graphic and a world map feature"),
    ],
  },
  {
    slug: "leos-workshop-tns-beaconhouse",
    title: "Leo's Workshop by TNS Beaconhouse",
    client: "Leo's Workshop — A Future School by TNS Beaconhouse",
    clientLogo: { name: "Leo's Workshop", src: "/clients/leos-workshop.png", width: 260, height: 100 },
    location: "Gulberg, Lahore",
    category: "Institutional",
    worth: "PKR 10.5 Million",
    area: "8,000 sq ft",
    summary:
      "An 8,000 sq ft early-years learning space for Leo's Workshop, a Future School by TNS Beaconhouse — a climbing wall, bespoke timber furniture sized for young children, and a bright, exposed-brick exterior facade.",
    images: [
      img("/images/interiors/leos-workshop-tns-beaconhouse-1.webp", 1280, 597, "Exterior facade with a blue-slat rooftop pergola"),
      img("/images/interiors/leos-workshop-tns-beaconhouse-2.webp", 1280, 597, "Climbing wall and children's furniture in the activity room"),
      img("/images/interiors/leos-workshop-tns-beaconhouse-3.webp", 1280, 597, "Reception desk and glazed office beyond"),
      img("/images/interiors/leos-workshop-tns-beaconhouse-4.webp", 1280, 597, "Exposed-brick classroom with bespoke timber shelving and furniture"),
    ],
  },
  {
    slug: "united-industries",
    title: "United Industries",
    client: "United Industries Limited",
    clientLogo: { name: "United Industries", src: "/clients/united-industries.png", width: 200, height: 200 },
    location: "Faisalabad",
    category: "Corporate Office",
    worth: "PKR 10 Million",
    area: "7,000 sq ft",
    summary:
      "A 7,000 sq ft open-plan office for United Industries — red-and-timber workstation runs beneath an exposed black-steel ceiling grid, with planting used to soften the industrial palette.",
    images: [
      img("/images/interiors/united-industries-1.webp", 1280, 720, "Open-plan desking in red and timber tones beneath an exposed ceiling grid"),
      img("/images/interiors/united-industries-2.webp", 1280, 720, "Workstation runs with planter dividers and pendant lighting"),
      img("/images/interiors/united-industries-3.webp", 1280, 720, "Wide view of the desking area toward the entrance"),
      img("/images/interiors/united-industries-4.webp", 1280, 720, "Detail of the black-steel structural ceiling and lighting rig"),
    ],
  },
];

/**
 * Client-logo wall. 15 of the 16 logos in the source profile — see the module
 * comment above for the one exclusion.
 */
export const interiorsClientLogos: ClientLogo[] = [
  { name: "National Foods", src: "/clients/national-foods.png", width: 208, height: 208 },
  { name: "Coca-Cola", src: "/clients/coca-cola.png", width: 247, height: 139 },
  { name: "DealCart", src: "/clients/dealcart.png", width: 225, height: 225 },
  { name: "United Industries", src: "/clients/united-industries.png", width: 200, height: 200 },
  { name: "Leo's Workshop", src: "/clients/leos-workshop.png", width: 260, height: 100 },
  { name: "Next Step Consultants", src: "/clients/next-step-consultants.png", width: 225, height: 225 },
  { name: "BIMA", src: "/clients/bima.png", width: 224, height: 225 },
  { name: "Engro Corp", src: "/clients/engro-corp.png", width: 208, height: 208 },
  { name: "Samsung", src: "/clients/samsung.png", width: 391, height: 103 },
  { name: "Zong 4G", src: "/clients/zong.png", width: 213, height: 71 },
  { name: "Wateen", src: "/clients/wateen.png", width: 207, height: 207 },
  { name: "Cybernet", src: "/clients/cybernet.png", width: 220, height: 178 },
  { name: "Cinepax", src: "/clients/cinepax.png", width: 210, height: 210 },
  { name: "Corteva Agriscience", src: "/clients/corteva-agriscience.png", width: 292, height: 191 },
  { name: "Volka Food International", src: "/clients/volka-food.png", width: 219, height: 169 },
];

export const interiorsProcess = [
  {
    phase: 1,
    title: "Client Brief",
    description: "Understanding the space, the brand and what the finished environment needs to do.",
  },
  {
    phase: 2,
    title: "Conceptual Development",
    description: "Early layouts and mood direction, tested against the brief before anything is detailed.",
  },
  {
    phase: 3,
    title: "Detailing",
    description: "Materials, finishes, lighting and joinery worked through to a buildable specification.",
  },
  {
    phase: 4,
    title: "Drawing Set",
    description: "Full construction drawings issued for site — the reference everyone builds from.",
  },
  {
    phase: 5,
    title: "Execution",
    description: "Fit-out and construction on site, managed through to handover.",
  },
] as const;

export const interiorsProjectTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Institutional",
  "Documents and Conservation",
] as const;
