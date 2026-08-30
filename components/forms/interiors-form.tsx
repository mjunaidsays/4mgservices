"use client";

import { Loader2, Ruler } from "lucide-react";
import { useActionState } from "react";

import { submitInteriors } from "@/actions/submit-forms";
import {
  SelectField,
  SpamGuard,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { interiorsProjectTypes } from "@/lib/content/interiors";
import { initialActionState } from "@/lib/schemas";

/** MND Interiors consultation request. Lives inside `.brand-mnd`, so it picks up the gold accent. */
export function InteriorsForm() {
  const [state, formAction, pending] = useActionState(
    submitInteriors,
    initialActionState,
  );

  if (state.status === "success") {
    return (
      <FormSuccess
        reference={state.reference}
        title="Consultation request received"
        description="Our design team will be in touch to arrange a walkthrough of your space and what you have in mind."
        whatsappMessage={`Hello, I've just requested an MND Interiors consultation${state.reference ? ` (ref ${state.reference})` : ""}.`}
      />
    );
  }

  const errorFor = (field: string) => state.errors?.[field]?.[0];

  return (
    <form
      action={formAction}
      className="relative space-y-5 rounded-panel border border-mist-200 bg-white p-6 shadow-e1 sm:p-8"
    >
      <SpamGuard />

      <SelectField
        label="Project type"
        name="projectType"
        required
        defaultValue=""
        placeholder="Choose the closest match"
        options={interiorsProjectTypes.map((type) => ({ value: type, label: type }))}
        error={errorFor("projectType")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          error={errorFor("name")}
        />
        <TextField
          label="City"
          name="city"
          hint="Lahore, Faisalabad…"
          error={errorFor("city")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email address"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          error={errorFor("email")}
        />
        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          error={errorFor("phone")}
        />
      </div>

      <TextField
        label="Approximate area"
        name="approxArea"
        hint="e.g. 3,000 sq ft — a rough figure is fine"
        error={errorFor("approxArea")}
      />

      <TextAreaField
        label="Tell us about the space"
        name="notes"
        rows={4}
        hint="What it's for, the look you're after, and any deadline you're working to."
        error={errorFor("notes")}
      />

      <FormError message={state.message} />

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 aria-hidden className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Ruler aria-hidden />
            Request a consultation
          </>
        )}
      </Button>

      <p className="text-center text-sm text-ink-600">
        No obligation. We&apos;ll come back with next steps once we understand
        the space.
      </p>
    </form>
  );
}
