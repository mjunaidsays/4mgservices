"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { acknowledgementEmail, notificationEmail, type Field } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/provider";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  contactSchema,
  demoSchema,
  interiorsSchema,
  quoteSchema,
  trackSchema,
  type ActionState,
} from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";
import { referenceCode } from "@/lib/utils";

/**
 * All four form submissions run through one pipeline:
 *
 *   parse → spam guard → rate limit → notify the owner → acknowledge the sender
 *
 * The honeypot and the elapsed-time floor do most of the work and cost nothing.
 * A CAPTCHA is deliberately not used: it taxes every real visitor to stop bots
 * these two checks already stop.
 */

const MIN_SUBMIT_MS = 2000;
const GENERIC_ERROR =
  "We could not send that just now. Please try again, or WhatsApp us and we will pick it up straight away.";

type PipelineOptions<T> = {
  schema: z.ZodType<T>;
  formData: FormData;
  /** Rate-limit bucket, so one busy form does not block the others. */
  bucket: string;
  build: (data: T, reference: string) => {
    subject: string;
    heading: string;
    intro: string;
    fields: Field[];
    replyTo: string;
    senderName: string;
    acknowledgementSummary: string;
  };
};

async function handleSubmission<T>({
  schema,
  formData,
  bucket,
  build,
}: PipelineOptions<T>): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors: flattened.fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data as T & {
    company_website?: string;
    elapsedMs?: number;
  };

  // Honeypot: a hidden field only an automated filler would populate.
  if (data.company_website && data.company_website.length > 0) {
    // Report success so the bot has nothing to learn from the response.
    return { status: "success", reference: referenceCode() };
  }

  // Time floor: humans do not complete a multi-field form in under two seconds.
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_SUBMIT_MS) {
    return { status: "success", reference: referenceCode() };
  }

  const requestHeaders = await headers();
  const limit = rateLimit(`${bucket}:${clientIp(requestHeaders)}`);

  if (!limit.allowed) {
    return {
      status: "error",
      message: `That is a few too many submissions in a short time. Please try again in about ${Math.ceil(limit.retryAfterSeconds / 60)} minutes, or WhatsApp us instead.`,
    };
  }

  const reference = referenceCode();
  const built = build(parsed.data, reference);

  const { html, text } = notificationEmail({
    heading: built.heading,
    intro: built.intro,
    reference,
    fields: built.fields,
  });

  const sent = await sendEmail({
    subject: built.subject,
    html,
    text,
    replyTo: built.replyTo,
  });

  if (!sent.ok) {
    return { status: "error", message: GENERIC_ERROR };
  }

  // Acknowledgement is best-effort: the enquiry is already safely delivered,
  // so a failure here must not tell the user their submission failed.
  const ack = acknowledgementEmail({
    name: built.senderName,
    reference,
    summary: built.acknowledgementSummary,
  });

  void sendEmail({
    to: built.replyTo,
    subject: ack.subject,
    html: ack.html,
    text: ack.text,
    replyTo: siteConfig.contact.email,
  }).catch(() => undefined);

  return { status: "success", reference };
}

/* -------------------------------------------------------------------------- */

const modeLabels: Record<string, string> = {
  sea: "Sea freight",
  air: "Air freight",
  land: "Land transport",
  "not-sure": "Not sure yet",
};

const cargoLabels: Record<string, string> = {
  general: "General cargo",
  perishable: "Perishable / temperature-controlled",
  pharmaceutical: "Pharmaceutical",
  machinery: "Machinery / oversized",
  hazardous: "Hazardous",
  other: "Other",
};

export async function submitQuote(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSubmission({
    schema: quoteSchema,
    formData,
    bucket: "quote",
    build: (data, reference) => ({
      subject: `Quote request ${reference} — ${data.origin} to ${data.destination}`,
      heading: "New quote request",
      intro: `${data.name}${data.company ? ` at ${data.company}` : ""} has requested a quote through the website.`,
      replyTo: data.email,
      senderName: data.name,
      acknowledgementSummary: `You asked us to quote ${cargoLabels[data.cargoType] ?? data.cargoType} from ${data.origin} to ${data.destination}.`,
      fields: [
        { label: "Freight mode", value: modeLabels[data.mode] ?? data.mode },
        { label: "Cargo type", value: cargoLabels[data.cargoType] ?? data.cargoType },
        { label: "Cargo details", value: data.cargoDetails },
        { label: "Weight / volume", value: data.weightOrVolume },
        { label: "Origin", value: data.origin },
        { label: "Destination", value: data.destination },
        { label: "Incoterm", value: data.incoterm },
        { label: "Target date", value: data.targetDate },
        { label: "Service page", value: data.service },
        { label: "Name", value: data.name },
        { label: "Company", value: data.company },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        {
          label: "WhatsApp contact",
          value: data.whatsappOptIn ? "Yes — happy to be contacted on WhatsApp" : "",
        },
        { label: "Notes", value: data.notes },
      ],
    }),
  });
}

export async function submitContact(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSubmission({
    schema: contactSchema,
    formData,
    bucket: "contact",
    build: (data, reference) => ({
      subject: `Website enquiry ${reference} — ${data.subject}`,
      heading: "New website enquiry",
      intro: `${data.name}${data.company ? ` at ${data.company}` : ""} got in touch through the contact form.`,
      replyTo: data.email,
      senderName: data.name,
      acknowledgementSummary: `Your message was about: ${data.subject}.`,
      fields: [
        { label: "Subject", value: data.subject },
        { label: "Name", value: data.name },
        { label: "Company", value: data.company },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Message", value: data.message },
      ],
    }),
  });
}

export async function submitDemo(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSubmission({
    schema: demoSchema,
    formData,
    bucket: "demo",
    build: (data, reference) => ({
      subject: `Cognita demo request ${reference} — ${data.institution}`,
      heading: "New Cognita demo request",
      intro: `${data.name} from ${data.institution} would like a guided demonstration of Cognita Campus OS.`,
      replyTo: data.email,
      senderName: data.name,
      acknowledgementSummary: `You requested a 20-minute guided demo of Cognita Campus OS for ${data.institution}.`,
      fields: [
        { label: "Institution", value: data.institution },
        { label: "Name", value: data.name },
        { label: "Role", value: data.role },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Campuses", value: data.campuses },
        { label: "Students", value: data.students },
        { label: "Notes", value: data.notes },
      ],
    }),
  });
}

export async function submitInteriors(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSubmission({
    schema: interiorsSchema,
    formData,
    bucket: "interiors",
    build: (data, reference) => ({
      subject: `Interiors consultation request ${reference} — ${data.projectType}`,
      heading: "New MND Interiors consultation request",
      intro: `${data.name} would like a design consultation for a ${data.projectType.toLowerCase()} project.`,
      replyTo: data.email,
      senderName: data.name,
      acknowledgementSummary: `You asked for a design consultation for a ${data.projectType.toLowerCase()} project${data.city ? ` in ${data.city}` : ""}.`,
      fields: [
        { label: "Project type", value: data.projectType },
        { label: "City", value: data.city },
        { label: "Approximate area", value: data.approxArea },
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Notes", value: data.notes },
      ],
    }),
  });
}

export async function submitTrack(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return handleSubmission({
    schema: trackSchema,
    formData,
    bucket: "track",
    build: (data, reference) => ({
      subject: `Shipment status request ${reference} — ${data.reference}`,
      heading: "Shipment status request",
      intro: `${data.name} has asked for an update on reference ${data.reference}.`,
      replyTo: data.email,
      senderName: data.name,
      acknowledgementSummary: `You asked for a status update on shipment reference ${data.reference}.`,
      fields: [
        { label: "Shipment reference", value: data.reference },
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Notes", value: data.notes },
      ],
    }),
  });
}
