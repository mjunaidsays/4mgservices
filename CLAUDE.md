@AGENTS.md

# CLAUDE.md — 4M Global Services Website

Project brief, brand facts, and working rules. Read before writing code.
The implementation plan lives at `docs/IMPLEMENTATION-PLAN.md`.

> **Next.js note:** this project runs Next.js 16 (Turbopack default, async `params`/`searchParams`,
> React 19.2). `AGENTS.md` (imported above) points at version-matched docs in
> `node_modules/next/dist/docs/` — consult those, not training-data assumptions.

---

## 1. Project

A modern corporate portfolio website for **4M Global Services** — a UAE & Pakistan based shipping,
logistics and customs clearance company that also owns two software products.

- **Live domain:** `www.4mgservices.com` — currently a placeholder page. This site replaces it.
- **Primary goal:** generate qualified quote requests for the logistics business; present the two
  software products credibly as secondary offerings.
- **Audience:** SMEs and enterprises importing/exporting via UAE & Pakistan; school owners
  (Cognita); parents and schools (Mindora).

### Decisions locked with the owner
- **Homepage is logistics only** — it is the core business.
- **Services** in the header also exposes the other products via a mega-menu.
- **Visual direction:** deep navy + safety orange, alternating dark/light sections.
- **Scope:** complete end-to-end site, not a stub.
- **Forms:** **Resend** (3,000 emails/month free, server-side key) — chosen over EmailJS
  (200/month, browser-exposed key). Behind an adapter in `lib/email/provider.ts`.
- **Stack:** Next.js 16 · Tailwind v4 · Radix primitives · Motion · Zod · Resend · MDX · Vercel.

---

## 2. Owner / contact details — single source of truth

Mirrored in code at `lib/site-config.ts`. **Never change these values.**

| Field | Value |
|---|---|
| Company | 4M Global Services (also styled "4MGSERVICES") |
| Contact person | Mansoor Siddiqui |
| Phone / WhatsApp | +92 321 886 3130 |
| Email | mansoor@4mgservices.com |
| Website | www.4mgservices.com |
| Markets | UAE & Pakistan (global network) |
| Repo owner (dev) | fahadkhalidd887@gmail.com |

---

## 3. Brand & business facts (from `docs/source/`)

### 3.1 4M Global Services — logistics (core business)
- Positioning: **"Your Trusted Partner in Global Logistics."**
- Profile headline: **LOGISTICS, TRANSPORT & CUSTOMS CLEARANCE**
- Taglines: *"Fast. Reliable. Everywhere."* · *"Delivering with Precision"* ·
  *"Your Cargo, Our Responsibility."* · *"Navigating Together, Innovating Forever"*
- Mission: reliable, cost-effective and transparent logistics focused on customer satisfaction and
  operational excellence. *"We don't just move shipments — we move businesses forward."*

**Services (6):** Sea & Air Freight · Import & Export Management · Customs Clearance &
Documentation · **Customs Clearance of Perishable Items** (differentiator, own page) · Warehousing &
Distribution · Door-to-Door / Last-mile Delivery. Plus 3PL documentation support.

**Industries:** E-commerce · Retail · Manufacturing · Healthcare

**Key advantages (6):** On-time Guarantee · Flexible Delivery · Data-Driven · Real-time Tracking ·
Global Coverage · Secured Handling

**Why choose us (5):** Global Reach + Local Expertise · Transparent Pricing (no hidden charges) ·
End-to-End Support · Timely & Secure · Customer-First Approach

### 3.2 Cognita Campus OS — school management SaaS (secondary)
Multi-tenant SaaS for schools, colleges and university networks, built on granular **RBAC**;
replaces ~6 disjointed subscriptions. Five pillars: (1) ends multi-campus blind spots via centralised
RBAC + dashboards; (2) automates fees, discounts, invoicing, SMS/Email reminders, payroll, financial
reports; (3) academic + exam lifecycle — syllabus mapping, lesson plans, routines, online/offline
exams, merit ranks, gradebooks, mark sheets, report cards (**cuts teacher admin burden up to 60%**);
(4) parent/guardian portals with real-time alerts; (5) consolidates front office, transport, hostel,
library, assets, inventory. Primary CTA: **book a 20-minute guided demo**.

### 3.3 Mindora — brain-game learning app for kids (secondary)
**MINDORA = MIND + AURA = Zehan ki Roshni ✨** (MIND = Zehan, ORA = Roshni/Noor).
Tagline **"Light Up Your Mind"**; Urdu **"Zehan Roshan, Mustaqbil Roshan"**.
Neuroscience + Gamification + Storytelling. Steps: **PLAY → GLOW → SHINE**.
Mission: 10 million kids in Pakistan and beyond. Vision: "the Pandora of Education".
Voice: playful, magical, emoji-friendly (✨🧠💜) — bilingual EN/Urdu flourishes belong **here only**.

---

## 4. Working rules

1. **Never invent facts.** No fabricated client names, logos, testimonials, certifications, shipment
   counts, years in business, or awards. Use `TODO:` placeholders and keep the checklist in §5 current.
2. Copy stays consistent with `docs/source/`; reuse its phrasing where it is good.
3. Keep the three brand voices distinct (corporate / institutional / playful).
4. Contact details in §2 are canonical — edit `lib/site-config.ts`, never hardcode elsewhere.
5. **Motion rules** (see plan): animate `transform`/`opacity` only; every reveal reserves its space;
   `MotionConfig reducedMotion="user"` at the root; never animate the LCP element's opacity from 0.
6. Accessibility is not optional: WCAG 2.2 AA, visible focus rings, keyboard-complete menus and
   forms, `aria-live` on form errors.
7. Ask before adding a dependency, analytics/tracking script, or third-party embed.

---

## 5. Open items — blocked on the owner

1. Client logos/names · testimonials with attribution · stats & credentials *(owner confirmed these exist)*
2. Full UAE + Pakistan office addresses (footer, contact page, both `LocalBusiness` schema nodes)
3. **Cognita ↔ Aptura Technologies** — the source doc credits Aptura, not 4M. Confirm the relationship
4. Cognita logo + product screenshots; Mindora screenshots
5. Mindora age range — the doc says **4–12** in one place and **6–11** in another
6. Resend API key + DNS access on `4mgservices.com`
7. The `4M Global Services Confidential - Domain.txt` file (was open in the IDE, not in the repo)
