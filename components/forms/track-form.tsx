"use client";

import { Loader2, Search } from "lucide-react";
import { useActionState } from "react";

import { submitTrack } from "@/actions/submit-forms";
import { SpamGuard, TextAreaField, TextField } from "@/components/forms/fields";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { initialActionState } from "@/lib/schemas";

/**
 * A status *request*, not a live tracking portal — and it says so.
 *
 * Live tracking needs carrier API credentials 4M does not hold yet. When it
 * does, the results can render in place of this form without changing the URL
 * or how anyone reaches it.
 */
export function TrackForm() {
  const [state, formAction, pending] = useActionState(
    submitTrack,
    initialActionState,
  );

  if (state.status === "success") {
    return (
      <FormSuccess
        reference={state.reference}
        title="We're checking on it"
        description="Our team is looking up your shipment now and will come back to you with its current status."
        whatsappMessage={`Hello, I've requested a shipment status update${state.reference ? ` (ref ${state.reference})` : ""}.`}
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
        label="Shipment reference"
        name="reference"
        required
        hint="Your booking number, container number or air waybill (AWB)."
        error={errorFor("reference")}
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
          label="Email address"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          error={errorFor("email")}
        />
      </div>

      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        error={errorFor("phone")}
      />

      <TextAreaField
        label="Anything else that would help us find it?"
        name="notes"
        rows={3}
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
            <Search aria-hidden />
            Request status update
          </>
        )}
      </Button>
    </form>
  );
}
