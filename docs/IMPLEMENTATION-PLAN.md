# Implementation Plan — 4M Global Services Website

## Context

4M Global Services is a UAE & Pakistan based shipping, logistics and customs clearance company owned
by Mansoor Siddiqui. Its domain `www.4mgservices.com` currently serves a placeholder page. The
company also owns two software products — **Cognita Campus OS** (school management SaaS) and
**Mindora** (a brain-game learning app for kids) — which need to be presented as secondary offerings
without diluting the logistics message.

We need a complete, production-ready corporate website that (a) converts logistics enquiries into
quote requests, (b) gives the two products credible dedicated pages, and (c) meets late-2026
standards for UI/UX, motion, performance, accessibility and AI-era SEO.

The research pass is complete and recorded in `CLAUDE.md`. Decisions locked with the owner:
- **Stack:** Next.js.
- **Visual direction:** deep navy + safety orange, alternating dark/light sections.
- **Scope:** everything possible — a complete, end-to-end working site, not a stub.
- **Proof material:** owner will supply client logos, testimonials/case studies, and stats/credentials.
- **Forms:** owner asked whether Resend is free vs EmailJS → answered below; Resend is the choice.

---

## Decision: Resend, not EmailJS

The owner asked directly. The facts as of 2026:

| | Resend free | EmailJS free |
|---|---|---|
| Monthly sends | **3,000** (100/day), 1 domain | **200 requests** |
| Templates | unlimited (React Email) | 2 |
| Where it runs | **server only** — key never ships to browser | browser; public key exposed by design |
| Deliverability | DKIM/SPF/DMARC on your own domain | sends via your linked mailbox |
| Cost after free | $20/mo @ 50k | $9/mo @ 2,000 |

Resend is **15× more generous and materially more secure** — the API key lives in a Server Action and
never reaches the client, whereas EmailJS requires a browser-exposed public key and domain-origin
allowlisting to avoid abuse. Resend's only cost is adding three DNS records to `4mgservices.com`.

**Plan: use Resend behind a thin adapter** (`lib/email/provider.ts`). If the DNS records can't be
added in time, we flip one env var to an EmailJS adapter and ship anyway. No rework either way.

---

## Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript strict) | Server Components by default, Metadata API, Server Actions for forms |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | ~70% smaller CSS than v3 (6–12 KB gzip typical) — directly helps LCP |
| Components | **shadcn/ui** (Radix primitives, owned source) | Accessible by default, restyled via our tokens, no vendor lock |
| Animation | **Motion** (`motion/react`) + **Lenis** (gated) | Pooled IntersectionObserver for reveals, native ScrollTimeline for scroll-linked |
| Forms | RHF + **Zod** + Server Actions + `useActionState` | Progressive enhancement; validation shared client/server |
| Email | **Resend** + React Email, behind an adapter | See decision above |
| Content | **MDX** in-repo (`content/`) + `gray-matter` + `next-mdx-remote/rsc` | Zero cost, zero login, git-versioned. A CMS is overkill for this volume |
| Icons | `lucide-react` | Tree-shaken, consistent stroke weight |
| Fonts | `next/font` — self-hosted, `display: swap`, subset | No render-blocking third-party request |
| Deploy | **Vercel** | Image optimisation, edge caching, preview URLs, free tier fits |
| Analytics | Vercel Analytics + Speed Insights | Privacy-friendly, real-user Core Web Vitals |

**Deliberately excluded:** Contentlayer (unmaintained), GSAP (Motion covers it), a headless CMS
(re-evaluate once the blog exceeds ~20 posts), any 3D/WebGL hero (kills LCP on mobile in-market).

---

## Design system

### Colour tokens (`app/globals.css`, Tailwind v4 `@theme`)

```
--color-navy-950  #060B14   page-dark background, footer
--color-navy-900  #0B1524   dark sections
--color-navy-800  #132238   dark cards / elevated surfaces
--color-navy-700  #1D3350   borders on dark
--color-ink-900   #0D1117   body text on light
--color-ink-600   #4A5568   secondary text
--color-mist-50   #F7F9FC   light section background
--color-white     #FFFFFF   cards on light
--color-orange-500 #FF6B1A  primary CTA, active states   ← the single accent
--color-orange-400 #FF8642  hover
--color-teal-400  #2DD4BF   sparingly: success, "in transit" states
```

Contrast is verified at build-review time: orange-500 on navy-950 and white on orange-500 must both
clear **WCAG 2.2 AA (4.5:1)**. If orange-500 on white fails for small text, it is used for
**backgrounds and borders only**, never small body text — noted so we don't discover it late.

Sub-brand accents are token overrides on a wrapper class, not a second design system:
- `.brand-cognita` → primary `#2563EB` (institutional blue), light surfaces
- `.brand-mindora` → primary `#8B5CF6` + glow, playful surfaces

### Typography
- **Display / headings:** a geometric-grotesk (Satoshi, General Sans, or Space Grotesk) — confident,
  slightly technical.
- **Body:** Inter — proven at small sizes, excellent for form labels.
- Fluid type scale with `clamp()`: `--text-hero` `clamp(2.75rem, 6vw, 5.5rem)` down to
  `--text-sm 0.875rem`. Line-height 1.05 on display, 1.6 on body. Max measure `68ch`.

### Layout
- 8px spatial rhythm; section padding `clamp(5rem, 10vw, 9rem)`.
- Container `max-w-[1280px]`, gutters `1.25rem` mobile / `2.5rem` desktop.
- 12-col grid; **bento grids** for services (2-1-2-1 asymmetric), advantages, industries.
- Radii: `--radius-card 20px`, `--radius-btn 10px`. One consistent elevation ramp (3 shadow steps).

---

## Motion specification

This is the part that separates "modern-looking" from "professionally built". Rules, not vibes.

**Three tiers, and nothing outside them:**

1. **Micro-interactions** — 120–200 ms, `ease-out`. Buttons, links, inputs, card hover lift
   (`translateY(-4px)` + shadow step). Never on `width`/`height`/`top`.
2. **Scroll reveals** — 500–700 ms, `cubic-bezier(0.22, 1, 0.36, 1)`. `whileInView` with
   `once: true`, `margin: "0px 0px -12% 0px"`. Opacity `0→1` plus `translateY(24px→0)` **only**.
   Stagger children **70 ms**, cap at 6 items so lists never feel slow.
3. **Scroll-linked** — `useScroll` + `useTransform`. Reserved for exactly four places: hero
   background parallax (max 12% travel), the sticky "How it works" journey, the stats counter, and
   the reading-progress bar on blog posts.

**Hard rules**
- Animate **`transform` and `opacity` only.** Everything else is a CLS risk.
- Every animated block reserves its final space — **no layout shift on reveal, ever** (CLS ≤ 0.1).
- `<MotionConfig reducedMotion="user">` at the root. Under `prefers-reduced-motion` all reveals
  become instant and Lenis is disabled. Content is never gated behind an animation.
- Hero content is **server-rendered and visible on first paint** — it fades/rises from an already
  laid-out position. We never animate the LCP element's opacity from 0.
- Motion components are leaf `"use client"` islands; sections stay Server Components.
- **Lenis** is on desktop pointer only (`matchMedia("(pointer: fine)")`), off on touch, off on
  reduced motion, `lerp: 0.09`. Used with Motion's `useScroll` container awareness so sticky
  sections don't desync. If it fights the sticky journey section in testing, we drop it — it's a
  3 KB nicety, not a requirement.

**Signature moments (three, deliberately):**
- Hero: headline words rise on a 60 ms stagger; a subtle route-line SVG draws itself behind (`pathLength` 0→1, 1.2 s, once).
- "How it works": sticky left column, the 6 stages advance as the right column scrolls — the scrollytelling pattern, explaining the shipment journey without a wall of text.
- Stats: count-up on first view, `once: true`, respects reduced motion (shows final number instantly).

---

## Site map

```
/                          Home — logistics only
/services                  Overview (bento of 6)
/services/sea-air-freight
/services/import-export-management
/services/customs-clearance
/services/perishables-clearance      ← the differentiator, full page
/services/warehousing-distribution
/services/door-to-door-delivery
/industries                Overview
/industries/[ecommerce|retail|manufacturing|healthcare]
/about                     Story, mission, leadership, UAE+PK presence, why choose us
/solutions                 Technology division hub
/solutions/cognita         Campus OS product page
/solutions/mindora         Kids learning app page
/quote                     Multi-step quote wizard
/track                     Shipment status request + carrier deep links
/contact                   Form + offices + map + WhatsApp
/insights                  MDX blog index (+ /insights/[slug])
/privacy, /terms, /not-found, /sitemap.xml, /robots.txt, /opengraph-image
```

---

## Page specs

### Home (dark→light→dark rhythm)
1. **Hero** (navy-950) — H1 *"Delivering with Precision"*, sub: sea, air, customs & warehousing across
   UAE ⇄ Pakistan and worldwide. CTAs: **Get a Quote** (orange) + **Track a Shipment** (outline).
   Real cargo/port photo from the profile doc, `priority`, AVIF/WebP, explicit dimensions.
2. **Trust strip** — UAE & Pakistan presence · modes served · industries · client logos (owner-supplied),
   greyscale→colour on hover.
3. **Services bento** (light) — 6 cards, *Perishables Clearance* given the wide feature cell.
4. **How it works** (navy) — sticky scrollytelling: Enquiry → Quote → Pickup → Customs → Freight →
   Delivery. Demonstrates the "transparent" claim instead of asserting it.
5. **Advantages** — 6 icon cards: On-time Guarantee, Flexible Delivery, Data-Driven, Real-time
   Tracking, Global Coverage, Secured Handling.
6. **Stats** (navy, count-up) — owner-supplied figures.
7. **Industries** — 4 cards → their pages.
8. **Why choose us** — the 5 points, split layout with an operations photo.
9. **Testimonials** — owner-supplied, with name + company + photo/logo.
10. **Technology strip** — one restrained row: *"4M Global Services also builds software"* → Cognita, Mindora.
11. **Quote CTA band** (orange) + **Footer** (offices, full sitemap for SEO, socials, WhatsApp).

### Service page template
Hero (service name + one-line promise) · what's included · who it's for · process steps ·
documents required · **FAQ accordion** (feeds `FAQPage` schema + AEO) · related services ·
inline quote CTA pre-filled with that service.

`/services/perishables-clearance` gets extra treatment: cold-chain handling, clearance timelines,
perishable documentation checklist, "why most forwarders won't touch this".

### /quote — three steps (the highest-leverage page)
Multi-step because the evidence is decisive: one documented B2B case measured **8.1% vs 0.96%**
completion versus a single-screen form (~7×), and 2–3 step segmentation lifted completion **33%** in
Q1 2026, mostly on mobile.

```
Step 1  What are you shipping?   mode (sea/air/land) · cargo type · weight/volume · perishable? [y/n]
Step 2  Where from and to?       origin · destination · incoterm (optional) · target date
Step 3  How do we reach you?     name · company · work email · phone (WhatsApp opt-in)
```
≤5 fields per screen, single column, progress indicator, real-time Zod validation, back preserves
state, precise labels ("Work Email Address"). Success screen shows a reference number, the reply
window, and a **one-tap WhatsApp** follow-up to +92 321 886 3130.

### /solutions/cognita — light institutional blue
Hero (Campus OS positioning) · the problem (silos, paperwork, fragmented comms) · the 5 pillars as
feature blocks · module grid (fees, exams, attendance, transport, hostel, library, assets, payroll,
parent portal) · RBAC/multi-campus explainer diagram · the **60% admin-burden reduction** stat ·
role-based benefits (Owner / Principal / Teacher / Parent) · **"Book a 20-minute demo"** form.
`TODO:` product screenshots — the research is unanimous that real UI outperforms decoration.

### /solutions/mindora — playful purple, glow
Hero *"Light Up Your Mind with Mindora"* + aura/glow visual · MIND + AURA = Zehan ki Roshni explainer ·
**PLAY → GLOW → SHINE** three-step · game categories (Math Quests, Memory Match, brain games) ·
for-parents vs for-kids split · mission (10 million kids) · app-store / waitlist CTA.
Bilingual EN/Urdu flourishes live here and nowhere else. Confirm the age range (docs say 4–12 and 6–11).

### /track
Honest by design: a shipment-reference form that emails the ops team, plus deep links to major
carrier trackers and a WhatsApp shortcut. Structured so a real API can slot in behind it later
without changing the URL or the UI.

---

## Forms & backend

```
Client (RHF + Zod, progressive-enhancement fallback)
  → Server Action
      ├─ same Zod schema re-validated server-side
      ├─ honeypot field + submission-time floor (<2s = bot)   ← cheapest, highest-return filter
      ├─ IP rate limit (in-memory LRU; Upstash Redis if traffic warrants)
      ├─ optional Cloudflare Turnstile (env-gated, off by default)
      ├─ sendEmail() adapter → Resend (React Email template) → mansoor@4mgservices.com
      ├─ auto-acknowledgement email to the submitter
      └─ append to a submissions log (JSON/Sheet) so nothing is lost if email bounces
  → success state + WhatsApp prompt
```
Three schemas: `quoteSchema`, `contactSchema`, `demoSchema` (Cognita) — all in `lib/schemas.ts`, all
shared client/server. Reply-To is set to the submitter so Mansoor can reply straight from his inbox.

---

## SEO / AEO / GEO

Schema markup is now an **AI trust signal** — since Google's March 2026 core update, poorly
structured sites are penalised beyond traditional SEO, and answer engines use page quality to decide
what to cite.

- `generateMetadata` on every route; unique title/description/canonical. `metadataBase` set.
- `app/sitemap.ts` and `app/robots.ts` (robots points at the sitemap).
- Reusable `<JsonLd>` server component emitting:
  `Organization` (home) · **two `LocalBusiness` nodes** (UAE + Pakistan) · `Service` per service page ·
  `FAQPage` per FAQ block · `BreadcrumbList` sitewide · `Article` per blog post · `SoftwareApplication`
  for Cognita and Mindora.
- Dynamic OG images via `next/og` (`opengraph-image.tsx` per route group).
- **AEO formatting:** every service page answers its question in the first 40 words; FAQ blocks use
  real question phrasing; tables and lists over prose walls.
- Localised long-tail pages later: "customs clearance Karachi", "sea freight UAE to Pakistan".

## Performance & accessibility budget

Targets, checked before launch, **on mobile first** — over 60% of logistics searches come from field
managers and drivers on phones.

- **LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1** (INP has fully replaced FID)
- JS ≤ 130 KB gzip on the home route; images AVIF/WebP with explicit dimensions; hero `priority`
- Lighthouse ≥ 95 on all four categories; zero axe-core violations
- **WCAG 2.2 AA:** semantic landmarks, visible focus rings (never `outline: none`), keyboard-complete
  mega-menu and multi-step form, `aria-live` on form errors, skip-to-content link, 44px touch targets

---

## Build phases

| Phase | Deliverable |
|---|---|
| **0. Foundation** | Next.js 16 + TS strict + Tailwind v4 + shadcn init; tokens, fluid type scale, fonts; ESLint/Prettier; `lib/site-config.ts` as the single source for contact details |
| **1. Assets** | Extract photos from the profile docx `word/media/`; vectorise `logo.jpeg` → SVG + favicon set; compress/convert all imagery to AVIF/WebP |
| **2. Shell** | Header with mega-menu (Logistics ∥ Technology), sticky-on-scroll, mobile drawer; footer; floating WhatsApp button; `MotionConfig`, gated Lenis, `<Reveal>` / `<Stagger>` / `<CountUp>` primitives |
| **3. Home** | All 11 sections including the sticky scrollytelling journey |
| **4. Services** | Overview + 6 pages from a shared template, content-driven from `content/services/*` |
| **5. Industries + About** | 4 industry pages, About with mission/leadership/presence |
| **6. Forms** | Quote wizard, contact page, demo form, Resend adapter, React Email templates, spam + rate limiting, success/error states |
| **7. Track** | Request form + carrier deep links |
| **8. Products** | `/solutions` hub, Cognita page, Mindora page, with their accent themes |
| **9. Insights** | MDX pipeline, index, post template, reading progress, Article schema, 2–3 seed posts |
| **10. SEO & legal** | Metadata, sitemap, robots, all JSON-LD, OG images, privacy, terms, 404 |
| **11. Polish & QA** | Lighthouse, axe, keyboard pass, reduced-motion pass, cross-browser, 320px→2560px, copy proofread |
| **12. Deploy** | Vercel, `4mgservices.com` DNS, Resend domain verification, Search Console, analytics |

---

## Critical files

```
app/
  layout.tsx                  root: fonts, MotionConfig, Lenis gate, Organization JSON-LD
  globals.css                 Tailwind v4 @theme — every design token lives here
  page.tsx                    home
  services/[slug]/page.tsx    shared service template
  solutions/cognita/page.tsx  solutions/mindora/page.tsx
  quote/page.tsx  contact/page.tsx  track/page.tsx
  insights/page.tsx  insights/[slug]/page.tsx
  sitemap.ts  robots.ts  opengraph-image.tsx
actions/
  submit-quote.ts  submit-contact.ts  submit-demo.ts     Server Actions
lib/
  site-config.ts    contact details, offices, nav — single source of truth
  schemas.ts        Zod schemas shared client/server
  email/provider.ts Resend adapter (EmailJS fallback behind one env var)
  jsonld.ts         schema.org builders
  motion.ts         shared variants, easings, durations, stagger constants
components/
  ui/               shadcn primitives, restyled
  motion/           Reveal, Stagger, CountUp, ParallaxLayer, ScrollProgress
  sections/         Hero, ServicesBento, JourneyScrollytelling, Stats, Testimonials, CTABand
  forms/            QuoteWizard, ContactForm, DemoForm, field primitives
  layout/           Header, MegaMenu, MobileNav, Footer, WhatsAppFab
content/
  services/*.mdx  industries/*.mdx  insights/*.mdx
emails/
  QuoteNotification.tsx  ContactNotification.tsx  Acknowledgement.tsx
```

---

## Verification

1. `pnpm build` clean — zero TS errors, zero ESLint errors.
2. `pnpm dev` — walk every route; keyboard-only pass through the mega-menu and the 3-step wizard.
3. **Forms end-to-end:** submit the quote wizard → confirm the email lands in the owner inbox with
   every field, confirm the acknowledgement reaches the submitter, confirm Reply-To works.
   Then verify the honeypot rejects a bot payload and the rate limiter blocks the 6th rapid submit.
4. **Lighthouse mobile** on `/`, `/services/customs-clearance`, `/quote` — all four categories ≥ 95,
   LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
5. **axe DevTools** on every template — zero violations. Manual check: focus visibility, contrast of
   orange-on-navy, `aria-live` announcing form errors.
6. **Reduced motion:** enable OS setting → all reveals instant, Lenis off, no content hidden.
7. **Schema:** Google Rich Results Test + Schema.org validator on home, a service page, a blog post.
8. Responsive sweep 320 / 390 / 768 / 1024 / 1440 / 2560; test on a real mid-range Android on 4G.
9. Deploy preview → re-run 4 and 7 against the live URL before pointing DNS.

---

## Assumptions & what's blocked on the owner

**Assumptions I'm proceeding on** (say the word if any is wrong):
- "Everything possible" = the full site above **including** the MDX blog, quote wizard and track page.
  A true customer portal with live carrier-API tracking is **out of scope** — it needs carrier
  contracts and credentials 4M doesn't have yet. `/track` is built so it can be upgraded in place.
- English only for v1 (Urdu flourishes on Mindora only). RTL/Urdu localisation is a later phase.
- Deploying to Vercel under the owner's account.

**Needed before launch — build proceeds with clearly marked `TODO:` placeholders until they arrive:**
1. Client logos / names · testimonials with attribution · stats & credentials *(owner confirmed these exist)*
2. Full UAE + Pakistan office addresses (footer, contact page, both `LocalBusiness` nodes)
3. Cognita ↔ **Aptura Technologies** relationship — the doc credits Aptura, not 4M
4. Cognita logo + product screenshots; Mindora screenshots
5. Mindora age range — **4–12 or 6–11**? The document says both
6. Resend API key + DNS access on `4mgservices.com`
7. The `4M Global Services Confidential - Domain.txt` file (not in the project folder)
