import { ventures, type Venture } from "@/lib/content/ventures";

/**
 * Single source of truth for company details, navigation and contact points.
 * Never hardcode a phone number, email or address anywhere else in the app.
 */

export const siteConfig = {
  name: "4M Global Services",
  shortName: "4MGS",
  legalName: "4M Global Services",
  url: "https://www.4mgservices.com",
  tagline: "Delivering with Precision",
  /** Printed on the company logo — use it as the brand signature line. */
  motto: "Striving Towards Excellence",
  description:
    "4M Global Services is a UAE and Pakistan based logistics partner providing sea and air freight, import and export management, customs clearance, warehousing and door-to-door cargo delivery.",
  founded: "2019", // TODO(owner): confirm year founded

  contact: {
    person: "Mansoor Siddiqui",
    role: "Director",
    email: "mansoor@4mgservices.com",
    phone: "+92 321 886 3130",
    /** E.164, digits only — used for tel: and wa.me links. */
    phoneE164: "+923218863130",
    whatsapp: "923218863130",
  },

  offices: [
    {
      id: "pakistan",
      country: "Pakistan",
      countryCode: "PK",
      city: "Karachi", // TODO(owner): confirm city
      addressLines: [""],
      postalCode: "",
      phone: "+92 321 886 3130",
      email: "mansoor@4mgservices.com",
    },
    {
      id: "uae",
      country: "United Arab Emirates",
      countryCode: "AE",
      city: "Dubai", // TODO(owner): confirm city
      addressLines: [""],
      postalCode: "",
      phone: "+92 321 886 3130",
      email: "mansoor@4mgservices.com",
    },
  ],

  social: {
    // TODO(owner): supply real profile URLs; empty entries are not rendered.
    linkedin: "",
    facebook: "",
    instagram: "",
  },

  /** Response promise shown on form success screens. Keep it honest. */
  quoteResponseWindow: "one working day",
} as const;

export const WHATSAPP_BASE = `https://wa.me/${siteConfig.contact.whatsapp}`;

/** Build a WhatsApp click-to-chat link with a pre-filled message. */
export function whatsappLink(message?: string): string {
  if (!message) return WHATSAPP_BASE;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

/** Logistics services — the core business. Order matters; it drives the bento. */
export const logisticsNav: NavLink[] = [
  {
    label: "Sea & Air Freight",
    href: "/services/sea-air-freight",
    description: "FCL, LCL and air cargo on a worldwide carrier network.",
  },
  {
    label: "Import & Export Management",
    href: "/services/import-export-management",
    description: "End-to-end trade coordination from origin to destination.",
  },
  {
    label: "Customs Clearance",
    href: "/services/customs-clearance",
    description: "Documentation, duties and compliance handled for you.",
  },
  {
    label: "Perishables Clearance",
    href: "/services/perishables-clearance",
    description: "Time-critical cold-chain clearance most forwarders avoid.",
  },
  {
    label: "Warehousing & Distribution",
    href: "/services/warehousing-distribution",
    description: "Secure storage, inventory handling and 3PL documentation.",
  },
  {
    label: "Door-to-Door Delivery",
    href: "/services/door-to-door-delivery",
    description: "Collection, freight and final-mile under one responsibility.",
  },
];

/**
 * Technology and Interiors nav entries — both derived from `ventures`, the
 * single source of truth for the non-logistics divisions, rather than
 * hand-duplicated here. Order matters: it drives the mega-menu columns.
 */
const navFromVentures = (division: Venture["division"]): NavLink[] =>
  ventures
    .filter((venture) => venture.division === division)
    .map((venture) => ({
      label: venture.name,
      href: venture.href,
      description: venture.shortDescription,
    }));

/** The technology division — deliberately secondary in the mega-menu. */
export const technologyNav: NavLink[] = navFromVentures("technology");

/** The interiors division — deliberately its own mega-menu column. */
export const interiorsNav: NavLink[] = navFromVentures("interiors");

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    title: "Logistics",
    links: logisticsNav.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Technology",
    links: technologyNav.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Interiors",
    links: interiorsNav.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Industries we serve", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Request a quote", href: "/quote" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
] as const;
