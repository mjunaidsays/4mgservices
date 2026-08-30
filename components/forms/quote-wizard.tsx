"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useActionState, useState } from "react";

import { submitQuote } from "@/actions/submit-forms";
import {
  CheckboxField,
  RadioCards,
  SelectField,
  SpamGuard,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO } from "@/lib/motion";
import {
  initialActionState,
  quoteStepOneSchema,
  quoteStepThreeSchema,
  quoteStepTwoSchema,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

/**
 * Three steps, not one long form.
 *
 * The evidence is decisive: a documented B2B case measured 8.1% completion
 * multi-step against 0.96% single-screen, and 2–3 step segmentation lifted
 * completion by roughly a third in 2026 tests — most of it on mobile.
 *
 * Every field stays mounted across steps (hidden, not unmounted), so going back
 * preserves what was typed and the final submit posts one complete FormData.
 */

const STEPS = [
  { title: "What are you shipping?", schema: quoteStepOneSchema },
  { title: "Where from and to?", schema: quoteStepTwoSchema },
  { title: "How do we reach you?", schema: quoteStepThreeSchema },
] as const;

const modeOptions = [
  { value: "sea", label: "Sea freight", description: "Best cost for volume" },
  { value: "air", label: "Air freight", description: "Days, not weeks" },
  { value: "land", label: "Land transport", description: "Road haulage" },
  { value: "not-sure", label: "Not sure yet", description: "We'll advise" },
];

const cargoOptions = [
  { value: "general", label: "General cargo" },
  { value: "perishable", label: "Perishable / temperature-controlled" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
  { value: "machinery", label: "Machinery / oversized" },
  { value: "hazardous", label: "Hazardous" },
  { value: "other", label: "Other" },
];

type Values = Record<string, string>;

export function QuoteWizard({ service = "" }: { service?: string }) {
  const [state, formAction, pending] = useActionState(
    submitQuote,
    initialActionState,
  );
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    mode: "",
    cargoType: "",
    cargoDetails: "",
    weightOrVolume: "",
    origin: "",
    destination: "",
    incoterm: "",
    targetDate: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  if (state.status === "success") {
    return (
      <FormSuccess
        reference={state.reference}
        title="Quote request received"
        description="Our team is pricing it now. We will come back with routing options and a rate — no hidden charges."
        whatsappMessage={`Hello, I've just requested a quote${state.reference ? ` (ref ${state.reference})` : ""} through your website.`}
      />
    );
  }

  const set = (field: string) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  /** Validate only the current step before advancing. */
  const next = () => {
    const result = STEPS[step]!.schema.safeParse(values);

    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        errors[key] ??= issue.message;
      }
      setStepErrors(errors);
      return;
    }

    setStepErrors({});
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const back = () => {
    setStepErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const serverError = (field: string) => state.errors?.[field]?.[0];
  const errorFor = (field: string) => stepErrors[field] ?? serverError(field);

  return (
    <div className="rounded-panel border border-mist-200 bg-white p-6 shadow-e1 sm:p-8 lg:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-ink-900">{STEPS[step]!.title}</p>
          <p className="text-ink-600 tabular-nums">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-100">
          <motion.div
            className="h-full rounded-full bg-[var(--brand-accent)]"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          />
        </div>
      </div>

      <form action={formAction} className="relative space-y-6">
        <SpamGuard />
        <input type="hidden" name="service" value={service} readOnly />

        {/* Step 1 */}
        <fieldset className={cn("space-y-6", step !== 0 && "hidden")}>
          <RadioCards
            name="mode"
            label="How should it travel?"
            options={modeOptions}
            value={values.mode ?? ""}
            onChange={set("mode")}
            error={errorFor("mode")}
          />

          <SelectField
            label="Cargo type"
            name="cargoType"
            required
            placeholder="Select the closest match"
            options={cargoOptions}
            value={values.cargoType}
            onChange={(event) => set("cargoType")(event.target.value)}
            error={errorFor("cargoType")}
          />

          <TextField
            label="What are you shipping?"
            name="cargoDetails"
            required
            hint="A short description is enough — for example, 12 pallets of packaged food."
            value={values.cargoDetails}
            onChange={(event) => set("cargoDetails")(event.target.value)}
            error={errorFor("cargoDetails")}
          />

          <TextField
            label="Approximate weight or volume"
            name="weightOrVolume"
            hint="For example, 4,500 kg or 2 x 40ft containers."
            value={values.weightOrVolume}
            onChange={(event) => set("weightOrVolume")(event.target.value)}
            error={errorFor("weightOrVolume")}
          />
        </fieldset>

        {/* Step 2 */}
        <fieldset className={cn("space-y-6", step !== 1 && "hidden")}>
          <TextField
            label="Origin"
            name="origin"
            required
            hint="City, port or full address it ships from."
            value={values.origin}
            onChange={(event) => set("origin")(event.target.value)}
            error={errorFor("origin")}
          />

          <TextField
            label="Destination"
            name="destination"
            required
            hint="City, port or full address it ships to."
            value={values.destination}
            onChange={(event) => set("destination")(event.target.value)}
            error={errorFor("destination")}
          />

          <TextField
            label="Incoterm"
            name="incoterm"
            hint="EXW, FOB, CIF, DDP — leave blank if it is not agreed yet."
            value={values.incoterm}
            onChange={(event) => set("incoterm")(event.target.value)}
            error={errorFor("incoterm")}
          />

          <TextField
            label="Target date"
            name="targetDate"
            hint="When does it need to arrive?"
            value={values.targetDate}
            onChange={(event) => set("targetDate")(event.target.value)}
            error={errorFor("targetDate")}
          />
        </fieldset>

        {/* Step 3 */}
        <fieldset className={cn("space-y-6", step !== 2 && "hidden")}>
          <TextField
            label="Full name"
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            error={errorFor("name")}
          />

          <TextField
            label="Company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => set("company")(event.target.value)}
            error={errorFor("company")}
          />

          <TextField
            label="Work email address"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            error={errorFor("email")}
          />

          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => set("phone")(event.target.value)}
            error={errorFor("phone")}
          />

          <CheckboxField
            name="whatsappOptIn"
            value="true"
            label="You can reach me on WhatsApp — it is usually the fastest way."
          />

          <TextAreaField
            label="Anything else we should know?"
            name="notes"
            rows={4}
            value={values.notes}
            onChange={(event) => set("notes")(event.target.value)}
            error={errorFor("notes")}
          />
        </fieldset>

        <FormError message={state.message} />

        <div className="flex items-center justify-between gap-4 border-t border-mist-200 pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={back}>
              <ArrowLeft aria-hidden />
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              Continue
              <ArrowRight aria-hidden />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 aria-hidden className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send quote request
                  <ArrowRight aria-hidden />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
