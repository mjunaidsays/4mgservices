import { siteConfig } from "@/lib/site-config";

/**
 * Plain HTML email templates.
 *
 * Deliberately hand-written rather than component-rendered: these are three
 * simple tables that need to survive Outlook, and a table beats a framework
 * here. Every value is escaped before it reaches the markup.
 */

export type Field = { label: string; value: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Drops empty fields so the owner's inbox is not full of blank rows. */
function usedFields(fields: Field[]) {
  return fields.filter((field) => field.value && field.value.trim().length > 0);
}

export function notificationEmail({
  heading,
  intro,
  reference,
  fields,
}: {
  heading: string;
  intro: string;
  reference: string;
  fields: Field[];
}): { html: string; text: string } {
  const rows = usedFields(fields);

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0d1117;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dde5ef;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:#081738;padding:24px 28px;">
        <p style="margin:0;color:#ff8642;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">${escapeHtml(siteConfig.name)}</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;line-height:1.3;">${escapeHtml(heading)}</h1>
        <p style="margin:10px 0 0;color:rgba(255,255,255,0.6);font-size:14px;">Reference ${escapeHtml(reference)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px 8px;">
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#4a5568;">${escapeHtml(intro)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${rows
            .map(
              (field) => `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f8;font-size:13px;color:#8494a8;width:38%;vertical-align:top;">${escapeHtml(field.label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f8;font-size:15px;color:#0d1117;vertical-align:top;white-space:pre-wrap;">${escapeHtml(field.value)}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 28px;">
        <p style="margin:0;font-size:13px;color:#8494a8;">Sent from ${escapeHtml(siteConfig.url)}. Reply directly to this email to reach the sender.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    heading,
    `Reference: ${reference}`,
    "",
    intro,
    "",
    ...rows.map((field) => `${field.label}: ${field.value}`),
    "",
    `Sent from ${siteConfig.url}`,
  ].join("\n");

  return { html, text };
}

/** Auto-acknowledgement sent to the person who submitted the form. */
export function acknowledgementEmail({
  name,
  reference,
  summary,
}: {
  name: string;
  reference: string;
  summary: string;
}): { subject: string; html: string; text: string } {
  const subject = `We've received your enquiry — ${reference}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0d1117;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dde5ef;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:#081738;padding:26px 28px;">
        <p style="margin:0;color:#ff8642;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">${escapeHtml(siteConfig.name)}</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">Thank you, ${escapeHtml(name)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 28px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#26313f;">We have received your enquiry and it is with our team now. You can expect a reply within ${escapeHtml(siteConfig.quoteResponseWindow)}.</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#26313f;">${escapeHtml(summary)}</p>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#26313f;">Your reference is <strong>${escapeHtml(reference)}</strong> — quote it if you need to follow up.</p>
        <p style="margin:0;font-size:15px;line-height:1.65;color:#26313f;">If it is urgent, WhatsApp or call us on <a href="tel:${escapeHtml(siteConfig.contact.phoneE164)}" style="color:#e85c0d;">${escapeHtml(siteConfig.contact.phone)}</a>.</p>
      </td>
    </tr>
    <tr>
      <td style="background:#f7f9fc;padding:20px 28px;border-top:1px solid #eef2f8;">
        <p style="margin:0;font-size:13px;color:#8494a8;">${escapeHtml(siteConfig.name)} — ${escapeHtml(siteConfig.motto)}<br>${escapeHtml(siteConfig.url)}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Thank you, ${name}`,
    "",
    `We have received your enquiry and it is with our team now. You can expect a reply within ${siteConfig.quoteResponseWindow}.`,
    "",
    summary,
    "",
    `Your reference is ${reference}.`,
    "",
    `If it is urgent, WhatsApp or call us on ${siteConfig.contact.phone}.`,
    "",
    `${siteConfig.name} — ${siteConfig.url}`,
  ].join("\n");

  return { subject, html, text };
}
