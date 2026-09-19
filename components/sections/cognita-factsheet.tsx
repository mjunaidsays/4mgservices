import {
  ArrowDown,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { Reveal, RevealItem, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CognitaPhoto } from "@/components/sections/cognita-photo";
import {
  CognitaBenefitMatrix,
  CognitaFeatureDirectory,
  CognitaSavingsCalculator,
} from "@/components/sections/cognita-explorer";
import {
  calculateCognitaSavings,
  cognitaEfficiency,
  cognitaFeatures,
  cognitaPainPoints,
  cognitaPillars,
  cognitaRoles,
  cognitaRoiDefaults,
  cognitaSource,
  cognitaTimeAllocation,
  cognitaWorkflow,
  formatCognitaPkrScale,
} from "@/lib/content/cognita";

const pillarIcons = [
  ShieldCheck,
  BookOpen,
  Users,
  Wallet,
  Building2,
  MessageSquare,
];
const chartColors = [
  "bg-[var(--brand-accent-strong)]",
  "bg-orange-700",
  "bg-ink-400",
];
const sections = [
  ["overview", "Overview & charts"],
  ["pain-points", "Pain points"],
  ["workflow", "System workflow"],
  ["features", "Modules & features"],
  ["benefits", "FAB matrix"],
  ["roles", "Access & roles"],
  ["calculator", "ROI calculator"],
] as const;

export function CognitaNavigation() {
  return (
    <nav
      aria-label="Explore Cognita"
      className="border-b border-mist-200 bg-white py-5"
    >
      <div className="container-site flex flex-wrap gap-x-2 gap-y-1">
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#cognita-${id}`}
            className="inline-flex min-h-11 items-center rounded-btn px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-[var(--brand-accent-tint)] hover:text-accent"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function CognitaCharts() {
  return (
    <div className="mt-10 grid gap-6 xl:grid-cols-2">
      <figure className="rounded-panel border border-mist-200 bg-white p-6 shadow-e1 sm:p-8">
        <figcaption className="font-display text-lg font-semibold text-ink-900">
          Faculty time redistribution
        </figcaption>
        <p className="mt-2 text-sm text-ink-600">
          Share of work hours in the factsheet&apos;s paper-based and automated
          models.
        </p>
        <div aria-hidden className="mt-7 space-y-5">
          {(["manual", "cognita"] as const).map((model) => (
            <div key={model}>
              <p className="mb-2 text-sm font-medium text-ink-700">
                {model === "manual"
                  ? "Manual paper model"
                  : "Cognita Campus OS"}
              </p>
              <div className="flex h-11 overflow-hidden rounded-btn">
                {cognitaTimeAllocation.map((item, index) => (
                  <div
                    key={item.label}
                    style={{ width: `${item[model]}%` }}
                    className={`${chartColors[index]} flex items-center justify-center text-xs font-semibold text-white`}
                    title={`${item.label}: ${item[model]}%`}
                  >
                    {item[model]}%
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <table className="mt-7 w-full text-left text-xs sm:text-sm">
          <caption className="sr-only">
            Faculty work hours as percentages, by activity and model
          </caption>
          <thead>
            <tr className="border-b border-mist-200 text-ink-400">
              <th scope="col" className="py-3 pr-2 font-medium">
                Activity
              </th>
              <th scope="col" className="px-2 py-3 text-right font-medium">
                Manual
              </th>
              <th scope="col" className="py-3 pl-2 text-right font-medium">
                Cognita
              </th>
            </tr>
          </thead>
          <tbody>
            {cognitaTimeAllocation.map((item, index) => (
              <tr
                key={item.label}
                className="border-b border-mist-200 text-ink-700"
              >
                <th scope="row" className="py-3 pr-2 font-normal">
                  <span
                    aria-hidden
                    className={`mr-2 inline-block size-2 rounded-full ${chartColors[index]}`}
                  />
                  {item.label}
                </th>
                <td className="px-2 py-3 text-right tabular-nums">
                  {item.manual}%
                </td>
                <td className="py-3 pl-2 text-right tabular-nums">
                  {item.cognita}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 text-sm leading-relaxed text-ink-600">
          Automating attendance, result entry and BISE/Cambridge mark sheets
          shifts faculty time toward classroom teaching and mentoring.
        </p>
      </figure>
      <figure className="rounded-panel border border-mist-200 bg-white p-6 shadow-e1 sm:p-8">
        <figcaption className="font-display text-lg font-semibold text-ink-900">
          Institutional efficiency index
        </figcaption>
        <p className="mt-2 text-sm text-ink-600">
          Illustrative module ratings from the factsheet, on a scale of 0–100.
        </p>
        <ul className="mt-7 space-y-5">
          {cognitaEfficiency.map((item) => (
            <li key={item.label}>
              <div className="mb-2 flex justify-between gap-4 text-sm">
                <span className="text-ink-700">{item.label}</span>
                <span className="font-semibold text-accent tabular-nums">
                  {item.value}/100
                </span>
              </div>
              <div
                aria-hidden
                className="h-3 overflow-hidden rounded-full bg-mist-100"
              >
                <div
                  className="h-full rounded-full bg-[var(--brand-accent-strong)]"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-7 text-sm leading-relaxed text-ink-600">
          Fee challans, payment reminders, multi-branch audit trails and
          inventory controls connect financial and operational oversight.
        </p>
      </figure>
    </div>
  );
}

export function CognitaOverview() {
  const example = calculateCognitaSavings(cognitaRoiDefaults);
  return (
    <section id="cognita-overview" className="section-y bg-mist-50">
      <div className="container-site">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Executive briefing · Pakistan edition"
              title="One platform, a clearer view of your institution"
              lead="For K–12 private schools, Matric and O/A Level networks, intermediate colleges and multi-branch universities: connect campus governance, academics, PKR fee management, logistics and parent engagement in one cloud ecosystem."
            />
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-600">
              Product details and illustrative figures are adapted from the{" "}
              <a
                href={cognitaSource}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                Cognita factsheet by Aptura Technologies
              </a>
              . The factsheet lists 4M Global Services as its global marketing partner
              for 2026–27. Outcomes depend on your institution and implementation;
              these figures are not independently verified performance benchmarks.
            </p>
          </div>
          <CognitaPhoto name="classroom" />
        </div>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "60%",
              "Faculty admin time saved",
              "Source claim; actual time savings vary.",
            ],
            [
              formatCognitaPkrScale(example.revenue).replace(" PKR / year", ""),
              "PKR protected revenue / year",
              "Example: 1,500 students × Rs. 300,000 × 3%.",
            ],
            [
              "100%",
              "Multi-branch audit trail",
              "Coverage stated in the source factsheet.",
            ],
            [
              `${cognitaPillars.length}-in-1`,
              "Platform consolidation",
              "Governance, academics, students, finance, operations and communication.",
            ],
          ].map(([value, label, note]) => (
            <RevealItem
              key={label}
              small
              className="rounded-card border border-mist-200 bg-white p-6"
            >
              <p className="font-display text-3xl font-semibold text-accent">
                {value}
              </p>
              <h3 className="mt-3 text-sm font-semibold text-ink-900">
                {label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                {note}
              </p>
            </RevealItem>
          ))}
        </Stagger>
        <CognitaCharts />
      </div>
    </section>
  );
}

export function CognitaPainPoints() {
  return (
    <section id="cognita-pain-points" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="What Cognita solves"
          title="Five operational problems, resolved"
          lead="Administration in silos costs more than software ever does. See how the platform addresses everyday challenges across Pakistani institutions."
        />
        <Stagger className="mt-12 space-y-4">
          {cognitaPainPoints.map((item, index) => (
            <RevealItem
              key={item.id}
              small
              className="rounded-panel border border-mist-200 bg-mist-50 p-7 lg:p-9"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="font-display text-xl font-semibold text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 text-ink-900">{item.title}</h3>
              </div>
              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-ink-400 uppercase">
                    The challenge
                  </h4>
                  <p className="mt-2 leading-relaxed text-ink-600">
                    {item.pain}
                  </p>
                </div>
                <div className="border-l-2 border-[var(--brand-accent)] pl-5">
                  <h4 className="font-semibold text-ink-900">
                    {item.reliefTitle}
                  </h4>
                  <p className="mt-2 leading-relaxed text-ink-600">
                    {item.relief}
                  </p>
                  <p className="mt-3 text-sm font-medium text-accent">
                    Factsheet impact: {item.impact}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Stagger>
        <p className="mt-5 text-sm text-ink-400">
          Impact figures are source claims, not guarantees or independently
          measured results.
        </p>
      </div>
    </section>
  );
}

export function CognitaWorkflow() {
  return (
    <section
      id="cognita-workflow"
      className="section-y on-dark bg-navy-950 text-white"
    >
      <div className="container-site">
        <SectionHeading
          tone="dark"
          eyebrow="System architecture"
          title="Six pillars. One connected campus."
          lead="A cloud-based management information system connects the full institutional lifecycle under a shared, multi-tenant access model."
        />
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="w-full max-w-lg rounded-panel border border-navy-700 bg-navy-900 p-6">
            <ShieldCheck
              aria-hidden
              className="mx-auto size-7 text-[var(--brand-accent-on-dark)]"
            />
            <h3 className="mt-3 font-display text-xl font-semibold text-white">
              Cognita Campus OS
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Multi-tenant cloud ecosystem & unified MIS platform
            </p>
          </div>
          <ArrowDown
            aria-hidden
            className="my-4 size-6 text-[var(--brand-accent-on-dark)]"
          />
        </div>
        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cognitaPillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? ClipboardList;
            return (
              <RevealItem
                key={pillar.id}
                small
                className="rounded-panel border border-navy-700 bg-navy-900 p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    aria-hidden
                    className="size-6 text-[var(--brand-accent-on-dark)]"
                  />
                  <span className="text-xs text-white/60">
                    Pillar {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {pillar.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {pillar.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex gap-2 text-sm text-white/80"
                    >
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-[var(--brand-accent-on-dark)]"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-14">
          <h3 className="text-h3 text-white">The institutional lifecycle</h3>
          <p className="mt-3 text-white/65">
            How stakeholders connect throughout the academic term.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {cognitaWorkflow.map((step, index) => (
              <li
                key={step.title}
                className="border-t-2 border-[var(--brand-accent-on-dark)] pt-5"
              >
                <span className="text-sm font-semibold text-[var(--brand-accent-on-dark)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export function CognitaDetails() {
  return (
    <>
      <section id="cognita-features" className="section-y bg-white">
        <div className="container-site">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="lg:order-2">
              <SectionHeading
                eyebrow="Complete capability directory"
                title={`${cognitaFeatures.length} features, across every campus function`}
                lead="Explore all six functional pillars, from admissions and examination to fee recovery, facilities and communication. Search by name, description or topic."
              />
            </div>
            <CognitaPhoto name="library" className="lg:order-1" />
          </div>
          <CognitaFeatureDirectory />
        </div>
      </section>
      <section id="cognita-benefits" className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Feature · Advantage · Benefit"
            title="From platform capabilities to practical value"
            lead="The factsheet’s eight comparisons explain the intended technical advantages and institutional benefits across governance, academics, finance and operations."
          />
          <CognitaBenefitMatrix />
        </div>
      </section>
      <section id="cognita-roles" className="section-y bg-white">
        <div className="container-site">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <SectionHeading
              eyebrow="Role-based access control"
              title="The right access for every role"
              lead="Global oversight flows through campus administration to scoped academic, financial and support roles. Expand any role to inspect its permissions and portal."
            />
            <CognitaPhoto name="collaboration" />
          </div>
          <div className="mt-10 rounded-panel border border-mist-200 bg-mist-50 p-6 text-center sm:p-8">
            <ShieldCheck aria-hidden className="mx-auto size-7 text-accent" />
            <p className="mt-3 font-display text-lg font-semibold text-ink-900">
              Super Admin · Global executive / board control
            </p>
            <ArrowDown
              aria-hidden
              className="mx-auto my-4 size-5 text-accent"
            />
            <ul
              aria-label="Illustrative campus hierarchy"
              className="grid gap-3 sm:grid-cols-3"
            >
              {[1, 2, 3].map((branch) => (
                <li
                  key={branch}
                  className="rounded-btn border border-mist-200 bg-white p-4 text-sm font-medium text-ink-700"
                >
                  Branch / Campus {branch}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-600">
              Each campus has its own principal / admin and role-specific
              access. Three branches are shown as an example.
            </p>
          </div>
          <div className="mt-6 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(cognitaRoles).map(([id, role]) => (
              <details
                key={id}
                className="group rounded-card border border-mist-200 bg-white open:bg-mist-50"
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-card p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-semibold text-ink-900">
                    {role.role}
                  </h3>
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-accent group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm font-medium text-accent">
                    Scope: {role.scope}
                  </p>
                  <h4 className="mt-5 text-xs font-semibold text-ink-400 uppercase">
                    Granted role permissions
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {role.perms.map((permission) => (
                      <li
                        key={permission}
                        className="flex gap-2 text-sm leading-relaxed text-ink-600"
                      >
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        {permission}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-5 text-xs font-semibold text-ink-400 uppercase">
                    Target portal view
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {role.view}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="cognita-calculator" className="section-y bg-mist-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Institutional ROI calculator · PKR"
            title="What could your institution recover?"
            lead="Explore the factsheet’s annual savings model for faculty time, protected tuition revenue and software consolidation. Adjust the inputs to match your institution."
          />
          <CognitaSavingsCalculator />
        </div>
      </section>
    </>
  );
}
