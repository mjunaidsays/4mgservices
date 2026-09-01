import { z } from "zod";

import { interiorsProjectTypes } from "@/lib/content/interiors";

/**
 * Validation shared by the client form and the Server Action.
 *
 * The same schema runs in both places: the browser copy gives instant feedback,
 * the server copy is the one that actually protects us — a client check is a
 * convenience, never a security boundary.
 */

/** Fields present on every form for spam filtering. Never shown to humans. */
export const spamGuardSchema = z.object({
  /**
   * Honeypot. Bots fill it, people never see it.
   *
   * Deliberately permissive: rejecting it here would hand the bot a validation
   * error and reveal the trap. The Server Action checks it after parsing and
   * returns a normal success response instead, so the drop is silent.
   */
  company_website: z.string().max(200).optional().default(""),
  /** Milliseconds since the form mounted; sub-2s submissions are automated. */
  elapsedMs: z.coerce.number().int().nonnegative().default(0),
});

const name = z
  .string()
  .trim()
  .min(2, "Please enter your name")
  .max(80, "That name is too long");

const email = z.email("Enter a valid work email address").max(120);

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can reach you on")
  .max(24, "That number is too long")
  .regex(/^[+0-9()\-\s]+$/, "Use digits, spaces, +, - and () only");

const company = z.string().trim().max(120).optional().default("");

const message = z
  .string()
  .trim()
  .min(10, "Tell us a little more — at least 10 characters")
  .max(3000, "Please keep this under 3000 characters");

/* -------------------------------------------------------------------------- */
/* Quote — three steps                                                         */
/* -------------------------------------------------------------------------- */

export const freightModes = ["sea", "air", "land", "not-sure"] as const;
export const cargoTypes = [
  "general",
  "perishable",
  "pharmaceutical",
  "machinery",
  "hazardous",
  "other",
] as const;

export const quoteStepOneSchema = z.object({
  mode: z.enum(freightModes, { message: "Choose a freight mode" }),
  cargoType: z.enum(cargoTypes, { message: "Choose a cargo type" }),
  cargoDetails: z
    .string()
    .trim()
    .min(3, "Describe the cargo briefly")
    .max(500),
  weightOrVolume: z.string().trim().max(120).optional().default(""),
});

export const quoteStepTwoSchema = z.object({
  origin: z.string().trim().min(2, "Where does it ship from?").max(120),
  destination: z.string().trim().min(2, "Where does it ship to?").max(120),
  incoterm: z.string().trim().max(40).optional().default(""),
  targetDate: z.string().trim().max(40).optional().default(""),
});

export const quoteStepThreeSchema = z.object({
  name,
  company,
  email,
  phone,
  whatsappOptIn: z.coerce.boolean().default(false),
  notes: z.string().trim().max(1500).optional().default(""),
});

export const quoteSchema = quoteStepOneSchema
  .extend(quoteStepTwoSchema.shape)
  .extend(quoteStepThreeSchema.shape)
  .extend(spamGuardSchema.shape)
  .extend({
    /** Pre-filled when arriving from a service page. */
    service: z.string().trim().max(60).optional().default(""),
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Per-step schemas, in order — the wizard validates one at a time. */
export const quoteSteps = [
  quoteStepOneSchema,
  quoteStepTwoSchema,
  quoteStepThreeSchema,
] as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contactSubjects = [
  "New shipment enquiry",
  "Customs clearance",
  "Warehousing",
  "Existing shipment",
  "Partnership",
  "Something else",
] as const;

export const contactSchema = z
  .object({
    name,
    company,
    email,
    phone: phone.optional().or(z.literal("")).default(""),
    subject: z.enum(contactSubjects, { message: "Choose a subject" }),
    message,
  })
  .extend(spamGuardSchema.shape);

export type ContactInput = z.infer<typeof contactSchema>;

/* -------------------------------------------------------------------------- */
/* Cognita demo request                                                        */
/* -------------------------------------------------------------------------- */

export const demoSchema = z
  .object({
    name,
    institution: z
      .string()
      .trim()
      .min(2, "Which institution are you with?")
      .max(140),
    role: z.string().trim().max(80).optional().default(""),
    email,
    phone,
    campuses: z.string().trim().max(40).optional().default(""),
    students: z.string().trim().max(40).optional().default(""),
    notes: z.string().trim().max(1500).optional().default(""),
  })
  .extend(spamGuardSchema.shape);

export type DemoInput = z.infer<typeof demoSchema>;

/* -------------------------------------------------------------------------- */
/* MND Interiors consultation request                                         */
/* -------------------------------------------------------------------------- */

export const interiorsSchema = z
  .object({
    name,
    email,
    phone,
    projectType: z.enum(interiorsProjectTypes, {
      message: "Choose a project type",
    }),
    city: z.string().trim().max(80).optional().default(""),
    approxArea: z.string().trim().max(40).optional().default(""),
    notes: z.string().trim().max(1500).optional().default(""),
  })
  .extend(spamGuardSchema.shape);

export type InteriorsInput = z.infer<typeof interiorsSchema>;

/* -------------------------------------------------------------------------- */
/* Server Action result                                                        */
/* -------------------------------------------------------------------------- */

export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, keyed by field name. */
  errors?: Record<string, string[]>;
  /** Reference shown to the user on success. */
  reference?: string;
};

export const initialActionState: ActionState = { status: "idle" };
