import type { LucideIcon } from "lucide-react";
import { GraduationCap, Ruler, Sparkles } from "lucide-react";

/**
 * The three non-logistics businesses 4M Global Services operates.
 *
 * Single source of truth: `app/solutions/page.tsx` and
 * `components/sections/ventures-strip.tsx` previously each hardcoded their own
 * near-identical copy of this list (Cognita + Mindora). Both now consume this
 * one array instead, so adding a venture means editing one file, not several.
 */

export type Venture = {
  slug: string;
  name: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
  /** Full version, for the /solutions hub cards. */
  description: string;
  /** Compact version, for the homepage strip. */
  shortDescription: string;
  audience: string;
  accentClass: "brand-cognita" | "brand-mindora" | "brand-mnd";
  division: "technology" | "interiors";
};

export const ventures: Venture[] = [
  {
    slug: "cognita",
    name: "Cognita Campus OS",
    href: "/solutions/cognita",
    icon: GraduationCap,
    tagline: "One command centre for the whole institution",
    description:
      "A multi-tenant campus operating system built on granular role-based access control. It replaces half a dozen disjointed subscriptions with a single platform covering admissions, fees, exams, attendance, transport, hostel, library and parent communication.",
    shortDescription:
      "A multi-tenant campus operating system that replaces half a dozen disjointed school subscriptions with one command centre.",
    audience: "For school, college and university networks",
    accentClass: "brand-cognita",
    division: "technology",
  },
  {
    slug: "mindora",
    name: "Mindora",
    href: "/solutions/mindora",
    icon: Sparkles,
    tagline: "Light up your mind",
    description:
      "A premium learning ecosystem for children that combines neuroscience, gamification and storytelling. Maths quests, memory games and logic puzzles that feel like play — and screen time parents can be proud of.",
    shortDescription:
      "Magical brain games that turn maths, logic and memory into adventures kids actually want to play.",
    audience: "For parents, schools and children",
    accentClass: "brand-mindora",
    division: "technology",
  },
  {
    slug: "mnd-interiors",
    name: "MND Interiors",
    href: "/solutions/mnd-interiors",
    icon: Ruler,
    tagline: "We convert your dreams into realities",
    description:
      "Interior design, architecture and fit-out for offices, retail, industrial and institutional spaces — from client brief through to execution, with real projects delivered for FMCG, telecom, retail and education clients.",
    shortDescription:
      "Interior design, architecture and fit-out — from concept to execution, for corporate, retail and institutional spaces.",
    audience: "For offices, retail, institutional and industrial fit-outs",
    accentClass: "brand-mnd",
    division: "interiors",
  },
];
