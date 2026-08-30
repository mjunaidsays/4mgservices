"use client";

import { Loader2, Send } from "lucide-react";
import { useActionState } from "react";

import { submitContact } from "@/actions/submit-forms";
import {
  SelectField,
  SpamGuard,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { contactSubjects, initialActionState } from "@/lib/schemas";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialActionState,
  );

  if (state.status === "success") {
    return <FormSuccess reference={state.reference} />;
  }

  const errorFor = (field: string) => state.errors?.[field]?.[0];

  return (
    <form
      action={formAction}
      className="relative space-y-6 rounded-panel border border-mist-200 bg-white p-6 shadow-e1 sm:p-8 lg:p-10"
    >
      <SpamGuard />

      <TextField
        label="Full name"
        name="name"
        required
        autoComplete="name"
        error={errorFor("name")}
      />

      <TextField
        label="Company"
        name="company"
        autoComplete="organization"
        error={errorFor("company")}
      />

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
        autoComplete="tel"
        inputMode="tel"
        error={errorFor("phone")}
      />

      <SelectField
        label="What is this about?"
        name="subject"
        required
        defaultValue=""
        placeholder="Choose a subject"
        options={contactSubjects.map((subject) => ({
          value: subject,
          label: subject,
        }))}
        error={errorFor("subject")}
      />

      <TextAreaField
        label="Your message"
        name="message"
        required
        rows={6}
        hint="The more detail you give — cargo, route, timing — the more useful our first reply will be."
        error={errorFor("message")}
      />

      <FormError message={state.message} />

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 aria-hidden className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
