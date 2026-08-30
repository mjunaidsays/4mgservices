# 4M Global Services — website

Corporate site for **4M Global Services**, a UAE & Pakistan based shipping, logistics and customs
clearance company, plus its two software products (Cognita Campus OS and Mindora).

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **Tailwind CSS v4**, Radix
primitives, **Motion** and **Resend**.

---

## Getting started

```bash
pnpm install
cp .env.example .env.local   # set EMAIL_PROVIDER="log" for local development
pnpm dev                     # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

---

## Environment variables

See `.env.example`. Only two matter in production:

- `RESEND_API_KEY` — from [resend.com](https://resend.com). Free tier: 3,000 emails/month.
- `EMAIL_FROM` — must use a domain **verified in Resend**, so add its DKIM/SPF records to
  `4mgservices.com` before go-live. Without them, mail is rejected or lands in spam.

`EMAIL_PROVIDER="log"` prints submissions to the server log instead of sending — use it locally, or
as a safe fallback if DNS is not ready. Enquiries then appear in the terminal rather than an inbox.

---

## Project structure

```
app/            routes, sitemap.ts, robots.ts, opengraph-image.tsx
actions/        Server Actions (all four form submissions)
components/
  brand/        the vector logo
  forms/        field primitives, quote wizard, contact/demo/track forms
  layout/       header + mega-menu, mobile drawer, footer, WhatsApp button
  motion/       Reveal, Stagger, CountUp, ReadingProgress, MotionProvider
  sections/     homepage sections
  seo/          JSON-LD renderer
  ui/           button, page hero, section heading, FAQ accordion
content/insights/   blog posts as MDX
lib/            site-config, schemas, jsonld, motion tokens, email, rate limit
docs/           implementation plan and the original source documents
```

**`lib/site-config.ts` is the single source of truth** for contact details, offices and navigation.
Never hardcode a phone number or address anywhere else.

---

## Content

- **Services and industries** are TypeScript data in `lib/content/`. Edit the file, the page updates.
- **Blog posts** are MDX files in `content/insights/`. Add a `.mdx` file with frontmatter
  (`title`, `description`, `publishedAt`, optional `tag` and `draft: true`) and it appears in the
  index, the sitemap and the RSS-shaped `Article` structured data automatically.
- **Testimonials and client logos** live in `lib/content/testimonials.ts` and are deliberately
  empty. Those sections render nothing until real ones are supplied — no invented praise ships.

---

## Design system

All tokens are in `app/globals.css` under `@theme`. Colour, type scale, spacing, radii, shadows and
motion timings are defined once there.

Sub-brands are token overrides, not separate systems: wrap a page in `.brand-cognita` or
`.brand-mindora` and every accent follows.

**Accent colours have three steps for a reason.** Bright `--brand-accent` (#FF6B1A) measures only
2.85:1 against white and under white text, so it is used for graphics and fills that carry no text.
Anything with text on it uses `--brand-accent-strong` (5.18:1), and text on navy uses
`--brand-accent-on-dark`. Keep that distinction when adding components.

### Motion rules

Three tiers only — micro-interactions (~160ms), scroll reveals (~600ms, `once: true`), and four
scroll-linked effects. Animate `transform` and `opacity` exclusively; every revealed block reserves
its final space so nothing shifts. `MotionConfig reducedMotion="user"` is set at the root, and a
`<noscript>` rule forces `[data-reveal]` visible so the page is never blank without JavaScript.

---

## Verified

Build and lint are clean, and the following were checked in a real browser:

- All 32 routes return 200; unknown paths return the custom 404
- Quote wizard end to end — three steps, server-side validation, notification and acknowledgement
  emails with every field, `Reply-To` set to the enquirer
- Honeypot and the 2-second time floor drop bots silently; the rate limiter blocks the 5th rapid submit
- Keyboard: skip link is the first tab stop, mega-menu opens with Enter, mobile drawer traps focus
- No horizontal overflow at 390px; JSON-LD parses on home, service and article routes

---

## Still needed before launch

Tracked in `CLAUDE.md` §5 — client logos, testimonials, real stats, full office addresses, the
Cognita/Aptura relationship, product screenshots, the Mindora age range, and the Resend key + DNS.
