import "server-only";

import { siteConfig } from "@/lib/site-config";

/**
 * Email adapter.
 *
 * Resend is the default: 3,000 sends a month on the free tier, and the API key
 * stays server-side. If DNS on 4mgservices.com is not ready, set
 * EMAIL_PROVIDER=log to keep the site fully functional while submissions are
 * written to the server log instead of sent.
 *
 * Required environment variables for the `resend` provider:
 *   RESEND_API_KEY   — from resend.com
 *   EMAIL_FROM       — e.g. "4M Global Services <website@4mgservices.com>"
 *                      the domain must be verified in Resend
 *   EMAIL_TO         — defaults to the owner address in site-config
 */

export type SendEmailInput = {
  subject: string;
  html: string;
  text: string;
  /** Set so the owner can reply straight to the enquirer from their inbox. */
  replyTo?: string;
  to?: string;
};

export type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

const provider = process.env.EMAIL_PROVIDER ?? "resend";

function recipient(explicit?: string) {
  return explicit ?? process.env.EMAIL_TO ?? siteConfig.contact.email;
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const to = recipient(input.to);

  if (provider === "log") {
    // Printed as one string: structured objects get flattened to `{}` in some
    // log pipelines, which made this fallback useless for checking output.
    console.info(
      [
        "",
        "──────── [email:log] not sent, provider=log ────────",
        `To:       ${to}`,
        `Reply-To: ${input.replyTo ?? "(none)"}`,
        `Subject:  ${input.subject}`,
        "",
        input.text,
        "───────────────────────────────────────────────────",
      ].join("\n"),
    );
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    // Never fail silently in production — the enquiry would vanish.
    console.error(
      "[email] RESEND_API_KEY or EMAIL_FROM is missing; enquiry not delivered",
      { to, subject: input.subject },
    );
    return {
      ok: false,
      error: "Email is not configured on the server.",
    };
  }

  try {
    // Imported lazily so the SDK is not pulled into every server bundle.
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });

    if (error) {
      console.error("[email] Resend rejected the message", error);
      return { ok: false, error: error.message ?? "Send failed" };
    }

    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("[email] unexpected failure", error);
    return { ok: false, error: "Send failed" };
  }
}
