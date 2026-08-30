"use client";

import { CalendarCheck, Loader2 } from "lucide-react";
import { useActionState } from "react";

import { submitDemo } from "@/actions/submit-forms";
import { SpamGuard, TextAreaField, TextField } from "@/components/forms/fields";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { initialActionState } from "@/lib/schemas";

/** Cognita demo request. Lives inside `.brand-cognita`, so it picks up the blue accent. */
export function DemoForm() {
  const [state, formAction, pending] = useActionState(
    submitDemo,
    initialActionState,
  );

  if (state.status === "success") {
    return (
      <FormSuccess
        reference={state.reference}
        title="Demo request received"
        description="We will be in touch to arrange a 20-minute walkthrough shaped around your institution's structure and goals."
        whatsappMessage={`Hello, I've just requested a Cognita demo${state.reference ? ` (ref ${state.reference})` : ""}.`}
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

      <TextField
        label="Institution name"
        name="institution"
        required
        error={errorFor("institution")}
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
          label="Your role"
          name="role"
          hint="Principal, director, IT lead…"
          error={errorFor("role")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Work email address"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Number of campuses"
          name="campuses"
          inputMode="numeric"
          error={errorFor("campuses")}
        />
        <TextField
          label="Approximate students"
          name="students"
          inputMode="numeric"
          error={errorFor("students")}
        />
      </div>

      <TextAreaField
        label="What would you like the demo to focus on?"
        name="notes"
        rows={4}
        hint="Fees and finance, exams, parent communication, multi-campus oversight…"
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
            <CalendarCheck aria-hidden />
            Book a 20-minute demo
          </>
        )}
      </Button>

      <p className="text-center text-sm text-ink-600">
        No obligation. We tailor the walkthrough to your institution before we
        show you anything.
      </p>
    </form>
  );
}
