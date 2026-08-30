import type { Metadata } from "next";
import {
  Bus,
  BookOpen,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

import { DemoForm } from "@/components/forms/demo-form";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Cognita Campus OS — school management system",
  description:
    "Cognita Campus OS is a multi-tenant school management platform with role-based access control, automated fee recovery, exam lifecycle management and parent portals.",
  alternates: { canonical: "/solutions/cognita" },
};

/* TODO(owner): confirm the Cognita ↔ Aptura Technologies relationship. The
   source profile credits Aptura Technologies as the builder; this page
   currently avoids attributing ownership either way. */

const problems = [
  "Disconnected software and paperwork bottlenecks across departments",
  "Separate logins per campus, creating data silos and blind spots",
  "Staff bandwidth lost chasing overdue fees and reconciling deposits",
  "Teachers buried in administrative work instead of teaching",
  "Parents left guessing about attendance, results and fees",
];

const pillars = [
  {
    icon: LayoutDashboard,
    title: "One pane of glass across every campus",
    detail:
      "Centralised role-based access control paired with school-level dashboards gives leadership real-time visibility and control across every branch, campus and department — instead of separate logins and inconsistent oversight.",
  },
  {
    icon: Wallet,
    title: "Fee recovery and reconciliation, automated",
    detail:
      "End-to-end fee structures, discount logic, invoice generation, automated SMS and email reminders and payroll integration — preventing revenue leakage and giving accountants automated financial reports.",
  },
  {
    icon: ClipboardList,
    title: "The whole academic and exam lifecycle",
    detail:
      "Syllabus mapping, dynamic lesson planning, digital class routines and both offline and online exams. Merit ranks, digital grade books, mark sheets and printable report cards generate at the click of a button.",
  },
  {
    icon: MessageSquare,
    title: "Parents connected, not chasing",
    detail:
      "Guardians get real-time attendance alerts, examination updates, fee slips, noticeboards and academic progress through dedicated portals and automated notifications.",
  },
  {
    icon: Building2,
    title: "Every campus operation in one platform",
    detail:
      "Front-office visitor logs, transport routing, hostel allocation, library management, asset management and inventory audits — removing the cost and headache of maintaining standalone systems.",
  },
];

const modules = [
  { icon: Users, name: "Admissions & enrolment" },
  { icon: UserCheck, name: "Attendance" },
  { icon: CreditCard, name: "Fees & invoicing" },
  { icon: Wallet, name: "Payroll & accounts" },
  { icon: ClipboardList, name: "Exams & grade books" },
  { icon: BookOpen, name: "Syllabus & lesson plans" },
  { icon: MessageSquare, name: "Parent portal" },
  { icon: Bus, name: "Transport routing" },
  { icon: Building2, name: "Hostel allocation" },
  { icon: BookOpen, name: "Library" },
  { icon: Boxes, name: "Assets & inventory" },
  { icon: ShieldCheck, name: "Role-based access" },
];

const roles = [
  {
    role: "Owners & trustees",
    benefit:
      "Group-level oversight of every campus, with financial reporting that no longer depends on someone assembling spreadsheets.",
  },
  {
    role: "Principals & heads",
    benefit:
      "Real-time academic and attendance data for their campus, and control over who can see and change what.",
  },
  {
    role: "Teachers",
    benefit:
      "Lesson planning, attendance, marking and report cards in one place — cutting administrative burden by up to 60%.",
  },
  {
    role: "Parents & guardians",
    benefit:
      "Attendance alerts, exam results, fee slips and notices delivered as they happen, through a portal of their own.",
  },
];

export default function CognitaPage() {
  return (
    <div className="brand-cognita">
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: "Cognita Campus OS",
            description:
              "Multi-tenant school management SaaS with role-based access control, fee automation, exam lifecycle management and parent portals.",
            category: "BusinessApplication",
            url: "/solutions/cognita",
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: "Cognita Campus OS", href: "/solutions/cognita" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Cognita Campus OS"
        title="Your entire institution, in one command centre"
        lead="A comprehensive, multi-tenant operating system for modern schools, colleges and university networks — built on granular role-based access control."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
        ]}
      >
        <a
          href="#demo"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-[var(--brand-accent)] px-8 text-base font-medium text-white shadow-e1 transition-colors duration-160 hover:bg-[var(--brand-accent-hover)]"
        >
          <GraduationCap aria-hidden className="size-5" />
          Book a 20-minute demo
        </a>
      </PageHero>

      {/* Problem */}
      <section className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              The problem
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              Administration in silos costs more than software ever does
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              Managing a modern educational institution often means a daily
              battle against disconnected software, paperwork bottlenecks and
              fragmented communication across campuses. Leadership ends up
              fixing administrative blind spots instead of driving educational
              innovation and growth.
            </p>
          </Reveal>

          <Stagger as="ul" className="space-y-3">
            {problems.map((problem) => (
              <RevealItem
                as="li"
                small
                key={problem}
                className="flex gap-3.5 rounded-card border border-mist-200 bg-mist-50 p-5"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                  {problem}
                </span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="What Cognita solves"
            title="Five operational problems, resolved"
            lead="Cognita replaces half a dozen disjointed software subscriptions with a single, intelligent command centre."
          />

          <Stagger className="mt-12 space-y-4">
            {pillars.map((pillar, index) => (
              <RevealItem key={pillar.title} small>
                <div className="flex flex-col gap-5 rounded-panel border border-mist-200 bg-white p-7 shadow-e1 sm:flex-row sm:items-start lg:p-9">
                  <div className="flex items-center gap-4 sm:w-56 sm:shrink-0 sm:flex-col sm:items-start">
                    <span className="grid size-12 shrink-0 place-items-center rounded-btn bg-[var(--brand-accent-tint)] text-accent">
                      <pillar.icon aria-hidden className="size-6" />
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-400 tabular-nums sm:mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 text-ink-900">{pillar.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-600">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stat */}
      <section className="on-dark bg-navy-950 py-16 text-white lg:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-[4.5rem] leading-none font-semibold text-[var(--brand-accent-on-dark)]">
              <CountUp value={60} suffix="%" />
            </p>
            <p className="mt-4 text-lead text-white/70">
              Reduction in teachers&apos; administrative burden, by moving
              lesson planning, attendance, marking and reporting into one place.
            </p>
          </Reveal>

          <Reveal>
            <div className="rounded-panel border border-navy-700 bg-navy-900 p-7 lg:p-9">
              <ShieldCheck
                aria-hidden
                className="size-6 text-[var(--brand-accent-on-dark)]"
              />
              <h2 className="mt-4 text-h3 text-white">
                Built on role-based access control
              </h2>
              <p className="mt-3 leading-relaxed text-white/65">
                Every person sees exactly what their role permits, across every
                campus in the group. It is what makes multi-campus oversight
                possible without handing everyone the keys to everything.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modules */}
      <section className="section-y bg-white">
        <div className="container-site">
          {/* TODO(owner): replace this module grid with real product
              screenshots — showing the actual interface consistently
              outperforms describing it. */}
          <SectionHeading
            eyebrow="What's inside"
            title="One platform, every campus function"
            lead="Everything a campus runs on, under one login and one access model."
          />

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <RevealItem
                key={module.name}
                small
                className="flex items-center gap-3.5 rounded-card border border-mist-200 bg-white p-5"
              >
                <module.icon aria-hidden className="size-5 shrink-0 text-accent" />
                <span className="text-[0.9375rem] font-medium text-ink-900">
                  {module.name}
                </span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Roles */}
      <section className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Who it serves"
            title="One system, four very different jobs"
          />

          <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
            {roles.map((item) => (
              <RevealItem
                key={item.role}
                small
                className="rounded-card border border-mist-200 bg-white p-7"
              >
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {item.role}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-600">
                  {item.benefit}
                </p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="section-y bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow font-semibold text-accent uppercase">
              See it in action
            </p>
            <h2 className="mt-3 text-h2 text-ink-900">
              A 20-minute guided demonstration
            </h2>
            <p className="mt-5 text-lead text-ink-600">
              We would welcome the opportunity to show you and your leadership
              team a brief walkthrough, tailored specifically to the operational
              goals and structure of your institution.
            </p>
            <ul className="mt-7 space-y-3 text-ink-700">
              <li>Shaped around your campuses, not a generic tour</li>
              <li>Your leadership team welcome to join</li>
              <li>No obligation and no sales script</li>
            </ul>
          </Reveal>

          <DemoForm />
        </div>
      </section>
    </div>
  );
}
