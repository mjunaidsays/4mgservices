import type { Metadata } from "next";
import {
  Brain,
  Calculator,
  Heart,
  Puzzle,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mindora — brain games that make kids love learning",
  description:
    "Mindora turns maths, logic and memory into magical adventures for children. Neuroscience, gamification and storytelling in one learning ecosystem.",
  alternates: { canonical: "/solutions/mindora" },
};

/* TODO(owner): confirm the age range. The profile document says 4–12 in one
   place and 6–11 in another; the page currently avoids stating a range. */

const steps = [
  {
    label: "Play",
    icon: Puzzle,
    detail:
      "Kids play brain games, maths quests and memory matches that feel nothing like homework.",
  },
  {
    label: "Glow",
    icon: Sparkles,
    detail:
      "Their Mind Aura grows brighter with every level they clear.",
  },
  {
    label: "Shine",
    icon: Trophy,
    detail:
      "Parents see real progress in focus, memory and grades.",
  },
];

const games = [
  {
    icon: Calculator,
    name: "Maths Quests",
    detail: "Number skills disguised as an adventure with a story to finish.",
  },
  {
    icon: Brain,
    name: "Memory Match",
    detail: "Working-memory training that plays like a game, not a drill.",
  },
  {
    icon: Puzzle,
    name: "Logic Puzzles",
    detail: "Reasoning challenges that get harder exactly as fast as they should.",
  },
];

export default function MindoraPage() {
  return (
    <div className="brand-mindora">
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: "Mindora",
            description:
              "A learning app for children combining neuroscience, gamification and storytelling through maths, logic and memory games.",
            category: "EducationalApplication",
            url: "/solutions/mindora",
            operatingSystem: "Android, iOS, Web",
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: "Mindora", href: "/solutions/mindora" },
          ]),
        ]}
      />

      {/* Hero — the one place on this site where the voice turns playful. */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.35),transparent_70%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />

        <div className="container-site pt-32 pb-20 md:pt-40 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span aria-hidden>/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/solutions" className="hover:text-white">
                  Solutions
                </Link>
                <span aria-hidden>/</span>
              </li>
              <li aria-current="page" className="text-white/80">
                Mindora
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal small>
                <p className="text-eyebrow font-semibold text-accent-dark uppercase">
                  Mindora &middot; Zehan ki Roshni
                </p>
              </Reveal>

              <h1 className="mt-4 text-hero text-white">
                Light Up Your Mind
              </h1>

              <Reveal small delay={0.1}>
                <p className="mt-6 max-w-xl text-lead text-white/70">
                  Where learning feels like magic. Mindora turns maths, logic
                  and memory into magical adventures — because every child has a
                  glowing aura of genius waiting to shine.
                </p>
              </Reveal>

              <Reveal small delay={0.16}>
                <p className="mt-4 font-display text-lg text-[var(--brand-accent-on-dark)]">
                  Zehan Roshan, Mustaqbil Roshan
                </p>
              </Reveal>

              <Reveal small delay={0.22}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">Get early access</Link>
                  </Button>
                  <Button asChild variant="outlineLight" size="lg">
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal className="justify-self-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-125 rounded-full bg-mindora-500/25 blur-3xl"
                />
                {/* The supplied artwork is a glow on solid white, so it is
                    framed as an app tile rather than keyed out — removing the
                    white would take the glow with it. */}
                <Image
                  src="/brand/mindora-logo.png"
                  alt="Mindora"
                  width={320}
                  height={320}
                  priority
                  className="h-auto w-56 rounded-panel bg-white p-5 shadow-e3 lg:w-72"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="What is Mindora?"
            title="Every child is born with a brilliant aura"
            lead="We combine neuroscience, gamification and storytelling to create brain games that don't feel like studying."
          />

          <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
            <RevealItem
              small
              className="rounded-panel border border-mist-200 bg-mist-50 p-8"
            >
              <Star aria-hidden className="size-6 text-accent" />
              <h3 className="mt-4 text-h3 text-ink-900">For kids</h3>
              <p className="mt-3 leading-relaxed text-ink-600">
                It feels like playing in a magical universe — not like being
                given more homework.
              </p>
            </RevealItem>

            <RevealItem
              small
              className="rounded-panel border border-mist-200 bg-mist-50 p-8"
            >
              <Heart aria-hidden className="size-6 text-accent" />
              <h3 className="mt-4 text-h3 text-ink-900">For parents</h3>
              <p className="mt-3 leading-relaxed text-ink-600">
                It builds IQ, focus, memory and maths skills. Screen time you
                can be proud of.
              </p>
            </RevealItem>
          </Stagger>

          <Reveal className="mt-10">
            <div className="rounded-panel bg-navy-950 p-8 text-center lg:p-10">
              <p className="font-display text-xl text-white lg:text-2xl">
                MIND (Zehan) + AURA (Roshni) = the light of the mind
              </p>
              <p className="mt-3 text-white/60">
                We are not here to give your kids more homework. We are here to
                make their mind glow.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="Play. Glow. Shine."
          />

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <RevealItem key={step.label} small className="h-full">
                <div className="flex h-full flex-col rounded-panel border border-mist-200 bg-white p-8">
                  <span className="grid size-14 place-items-center rounded-full bg-[var(--brand-accent-tint)] text-accent">
                    <step.icon aria-hidden className="size-6" />
                  </span>
                  <span className="mt-5 font-display text-sm font-semibold text-ink-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-h3 text-ink-900">{step.label}</h3>
                  <p className="mt-3 leading-relaxed text-ink-600">
                    {step.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Games */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Inside the app"
            title="Brain games that actually make kids smarter"
            lead="Maths, memory and magic — with difficulty that adapts as they improve."
          />

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {games.map((game) => (
              <RevealItem key={game.name} small className="h-full">
                <div className="flex h-full flex-col rounded-card border border-mist-200 bg-white p-7 shadow-e1">
                  <game.icon aria-hidden className="size-6 text-accent" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                    {game.name}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-600">
                    {game.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Stagger>

          {/* TODO(owner): replace with real app screenshots once available. */}
        </div>
      </section>

      {/* Mission */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(139,92,246,0.3),transparent_70%)]"
        />

        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent-dark uppercase">
              Our mission
            </p>
            <h2 className="mt-3 text-h2 text-white">
              Ten million kids in love with learning
            </h2>
            <p className="mt-5 text-lead text-white/70">
              Our mission is to make 10 million kids in Pakistan and beyond fall
              in love with learning. Our vision is to be the Pandora of
              education — a magical box full of knowledge.
            </p>
          </Reveal>

          <Reveal className="lg:justify-self-end lg:self-center">
            <div className="rounded-panel border border-navy-700 bg-navy-900 p-8 lg:max-w-sm">
              <Sparkles
                aria-hidden
                className="size-6 text-[var(--brand-accent-on-dark)]"
              />
              <p className="mt-4 font-display text-xl text-white">
                Want Mindora for your school or your child?
              </p>
              <p className="mt-3 text-white/65">
                Tell us a little about who it is for and we will be in touch.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
