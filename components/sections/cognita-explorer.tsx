"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  calculateCognitaSavings,
  cognitaBenefits,
  cognitaFeatures,
  cognitaPillars,
  cognitaRoiDefaults,
  cognitaRoiInputs,
  formatCognitaNumber,
  formatCognitaPkrScale,
} from "@/lib/content/cognita";

const fieldClass =
  "min-h-12 min-w-0 w-full rounded-btn border border-mist-200 bg-white px-4 text-base text-ink-900";
const cardClass = "rounded-card border border-mist-200 bg-white p-6";

export function CognitaFeatureDirectory() {
  const [query, setQuery] = useState("");
  const [pillar, setPillar] = useState("all");
  const search = query.trim().toLowerCase();
  const features = cognitaFeatures.filter(
    (feature) =>
      (pillar === "all" || feature.pillar === pillar) &&
      [feature.name, feature.desc, ...feature.tags].some((text) =>
        text.toLowerCase().includes(search),
      ),
  );

  function reset() {
    setQuery("");
    setPillar("all");
  }

  return (
    <div className="mt-10">
      <div className="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <div>
          <label
            htmlFor="cognita-feature-search"
            className="mb-2 block text-sm font-medium text-ink-700"
          >
            Search features
          </label>
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-4 left-4 size-4 text-ink-400"
            />
            <input
              id="cognita-feature-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try fee challan, exams or payroll"
              className={`${fieldClass} pl-11`}
              aria-controls="cognita-feature-results"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="cognita-pillar-filter"
            className="mb-2 block text-sm font-medium text-ink-700"
          >
            Functional pillar
          </label>
          <select
            id="cognita-pillar-filter"
            value={pillar}
            onChange={(event) => setPillar(event.target.value)}
            className={fieldClass}
            aria-controls="cognita-feature-results"
          >
            <option value="all">All {cognitaPillars.length} pillars</option>
            {cognitaPillars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <Button type="button" variant="outline" onClick={reset}>
          Reset filters
        </Button>
      </div>
      <p role="status" className="mt-5 text-sm text-ink-600">
        Showing {features.length} of {cognitaFeatures.length} features
      </p>
      <div
        id="cognita-feature-results"
        className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((feature) => (
          <article key={feature.name} className={`${cardClass} flex flex-col`}>
            <p className="text-xs font-semibold text-accent">
              {cognitaPillars.find((item) => item.id === feature.pillar)?.title}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
              {feature.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
              {feature.desc}
            </p>
            <ul
              aria-label="Feature topics"
              className="mt-5 flex flex-wrap gap-2 border-t border-mist-200 pt-4"
            >
              {feature.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-mist-50 px-2 py-1 text-xs text-ink-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
        {features.length === 0 && (
          <div className={`${cardClass} col-span-full text-center`}>
            <h3 className="font-display text-lg font-semibold text-ink-900">
              No matching features
            </h3>
            <p className="mt-2 text-ink-600">
              Try a different keyword or reset the filters to explore the full
              directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CognitaBenefitMatrix() {
  const [category, setCategory] = useState("all");
  const categories = [
    ...new Map(
      cognitaBenefits.map((item) => [item.cat, item.catName]),
    ).entries(),
  ];
  const benefits = cognitaBenefits.filter(
    (item) => category === "all" || item.cat === category,
  );

  return (
    <div className="mt-10">
      <label
        htmlFor="cognita-benefit-filter"
        className="mb-2 block text-sm font-medium text-ink-700"
      >
        Explore a functional area
      </label>
      <select
        id="cognita-benefit-filter"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className={`${fieldClass} max-w-xl`}
        aria-controls="cognita-benefit-results"
      >
        <option value="all">All functional areas</option>
        {categories.map(([id, title]) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
      <p role="status" className="mt-5 text-sm text-ink-600">
        Showing {benefits.length} of {cognitaBenefits.length} comparisons
      </p>
      <div id="cognita-benefit-results" className="mt-5 space-y-4">
        {benefits.map((item) => (
          <article key={item.feature} className={cardClass}>
            <p className="text-xs font-semibold text-accent">{item.catName}</p>
            <div className="mt-4 grid gap-5 lg:grid-cols-3 lg:gap-8">
              <div>
                <p className="text-xs font-semibold text-ink-400 uppercase">
                  Feature
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {item.feature}
                </h3>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-ink-400 uppercase">
                  Technical advantage
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {item.advantage}
                </p>
              </div>
              <div className="rounded-btn bg-[var(--brand-accent-tint)] p-4">
                <h4 className="text-xs font-semibold text-accent uppercase">
                  Institutional benefit
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {item.benefit}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function CognitaSavingsCalculator() {
  const [values, setValues] = useState(cognitaRoiDefaults);
  const savings = calculateCognitaSavings(values);

  return (
    <div className="mt-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-8 rounded-panel border border-mist-200 bg-white p-6 sm:p-8">
          {cognitaRoiInputs.map((input) => (
            <div key={input.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label
                  htmlFor={`cognita-roi-${input.key}`}
                  className="text-sm font-medium text-ink-700"
                >
                  {input.label}
                </label>
                <output
                  htmlFor={`cognita-roi-${input.key}`}
                  className="font-display text-lg font-semibold text-accent tabular-nums"
                >
                  {input.key === "tuition" ? "Rs. " : ""}
                  {formatCognitaNumber(values[input.key])}
                </output>
              </div>
              <input
                id={`cognita-roi-${input.key}`}
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={values[input.key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [input.key]: event.target.valueAsNumber,
                  }))
                }
                aria-describedby="cognita-roi-assumptions"
                aria-valuetext={`${input.key === "tuition" ? "PKR " : ""}${formatCognitaNumber(values[input.key])}`}
                className="mt-3 min-h-11 w-full cursor-pointer accent-[var(--brand-accent-strong)]"
              />
              <div
                aria-hidden
                className="flex justify-between gap-4 text-xs text-ink-400"
              >
                <span>{formatCognitaNumber(input.min)}</span>
                <span>{formatCognitaNumber(input.max)}</span>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => setValues(cognitaRoiDefaults)}
          >
            Reset to example
          </Button>
        </div>
        <div className="on-dark rounded-panel border border-navy-700 bg-navy-950 p-6 text-white sm:p-8">
          <h3 className="text-h3 text-white">Projected annual value</h3>
          <div aria-live="polite" aria-atomic="true">
            <dl className="mt-6 divide-y divide-white/15">
              <div className="pb-6">
                <dt className="text-sm text-white/70">
                  Faculty admin hours recovered
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold text-[var(--brand-accent-on-dark)] tabular-nums">
                  {formatCognitaNumber(savings.hours)}{" "}
                  <span className="text-base font-normal">hrs / year</span>
                </dd>
                <dd className="mt-2 text-sm text-white/60">
                  Automated mark sheets, attendance and routines.
                </dd>
              </div>
              <div className="py-6">
                <dt className="text-sm text-white/70">
                  Prevented revenue leakage
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold tabular-nums">
                  Rs. {formatCognitaNumber(savings.revenue)}
                </dd>
                <dd className="mt-1 text-sm text-[var(--brand-accent-on-dark)]">
                  {formatCognitaPkrScale(savings.revenue)}
                </dd>
                <dd className="mt-2 text-sm text-white/60">
                  Challan tracking, late fee alerts and reconciliation.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-sm text-white/70">
                  Software and systems consolidation
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold tabular-nums">
                  Rs. {formatCognitaNumber(savings.consolidation)}
                </dd>
                <dd className="mt-1 text-sm text-[var(--brand-accent-on-dark)]">
                  {formatCognitaPkrScale(savings.consolidation)}
                </dd>
                <dd className="mt-2 text-sm text-white/60">
                  Consolidating separate LMS, SMS, van tracking and accounting
                  tools.
                </dd>
              </div>
            </dl>
          </div>
          <Button asChild variant="outlineLight" className="mt-8">
            <a href="#demo">Discuss your institution</a>
          </Button>
        </div>
      </div>
      <div
        id="cognita-roi-assumptions"
        className="mt-6 rounded-card border border-mist-200 bg-mist-50 p-6 text-sm leading-relaxed text-ink-600"
      >
        <h3 className="font-semibold text-ink-900">How the estimate works</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Faculty hours: total teaching faculty × 60 hours per year.</li>
          <li>Protected revenue: total students × annual tuition × 3%.</li>
          <li>Consolidation savings: campuses × PKR 1,200,000 per year.</li>
        </ul>
        <p className="mt-4">
          These are the factsheet&apos;s illustrative assumptions, not
          guaranteed savings. Student and faculty counts are institution-wide
          totals. Estimates exclude Cognita subscription, implementation and
          migration costs; they do not represent net ROI or a payback period.
          Recovered teaching hours are shown separately and are not converted
          into cash.
        </p>
      </div>
    </div>
  );
}
