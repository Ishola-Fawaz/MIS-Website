# Muslim Innovators Summit — project guide

This is the launch site for **Cohort One**, the debut edition of the Muslim
Innovators Summit (MIS) — a single-day, single-room event for Muslim
founders, engineers, and builders in tech, in Lagos, Nigeria.

Read this before adding or editing any content on the site.

## The one rule that matters most

**This is a debut event with zero track record. Never fabricate proof.**

No invented attendee counts, no invented speaker names attached to real
companies, no invented sponsor logos, no "Coming Soon" grids. If content
doesn't exist yet, the section doesn't render — it isn't stubbed out.

This came from a direct teardown of four competitor event sites (see the
"MIS 1.0 — Website Build Specification" the founder supplied). Their
recurring failure mode: empty or fabricated sections that read as
dishonest or abandoned. The fix for a first edition is **sell conviction,
not track record** — concrete numbers the organizers actually control
("150 seats, one room, Lagos") instead of vague or invented social proof.

Concretely, before adding a section or piece of copy, ask:

- Is every name, company, and number in this either (a) true today, or
  (b) a real decision the organizers are making (ticket price, seat cap,
  date)? If not, cut it.
- If a section would be empty (no speakers, no sponsors, no gallery yet),
  don't render a placeholder — leave the section out entirely until real
  content exists.
- Does every link resolve to something real? No `href="#"`. `mailto:` CTAs
  are an acceptable stand-in for backend flows that don't exist yet
  (ticketing, newsletter capture) — a dead link or a fake "success" toast
  is not.

## Content data model

All event content lives in [`src/lib/data.ts`](../src/lib/data.ts) —
`EVENT`, `CAPACITY_FACTS`, `WHY_BLOCKS`, `FORMAT_ITEMS`, `PERSONAS`,
`TICKETS`, `FAQS`. Edit content there, not inline in page components.

Real placeholders currently in `EVENT` that the founder needs to confirm
before launch: `dateISO`/`dateLabel` (currently March 21, 2026), exact
venue (currently withheld from the public site by design — shared with
ticket holders directly), and the `*Email` addresses (currently
`@misummit.org` placeholders — swap for real inboxes).

## Design system

- **Brand colors** — deep forest green + gold, sampled from
  [`public/MIS_LOGO.jpg`](../public/MIS_LOGO.jpg). Tokens live in
  [`src/app/globals.css`](../src/app/globals.css) as `--brand-*` /
  `--gold-*` / `--cream*` CSS variables, registered in Tailwind v4 via
  `@theme inline` so they're usable as `bg-brand-900`, `text-gold-300`,
  etc. The site is dark-themed only — there's no light-mode toggle,
  matching the logo's own dark background.
- **Typography** — three-family system, self-hosted via `next/font/local`
  (no Google Fonts / CDN link tags):
  - `font-heading` → Clash Display (headings only, weights 500/600/700)
  - `font-sans` (default body) → Satoshi (weights 400/500/700/900)
  - `font-mono` → Geist Mono, for **every number**: prices, dates,
    countdown digits, capacity stats. This is a deliberate rule from the
    build spec — mono numerals are what make the site read as a tech
    event rather than a template.
  Font files live in `src/fonts/*.woff2`, wired up in `src/fonts/index.ts`.
  If you need another weight, fetch it from Fontshare's CSS API
  (`api.fontshare.com/v2/css?f[]=clash-display@<weight>`) and download the
  `woff2` URL it returns — don't add a new npm dependency for this.
- **Logo usage** — `public/MIS_LOGO.jpg` is the only logo asset (1280×1280
  JPG, full lockup with icon + wordmark baked in). It's used at small
  sizes in the Navbar/Footer (`object-cover`, ~44px) and large in
  metadata/OG. There's no separate vector icon — `AmbientMark.tsx` is a
  deliberately abstract decorative shape (rotational petals, echoing the
  logo's geometry) used for background flourish; it is *not* a
  reproduction of the real logo and shouldn't be treated as one.

## Information architecture

Single landing page (`src/app/page.tsx`) built around the sections in the
build spec's §3.1 "ship at launch" list: hero → capacity strip → why →
format → who it's for → get involved (speak/volunteer) → tickets →
sponsor CTA → newsletter → FAQ. Plus standalone routes:

- `/register` — full ticket tiers (mirrors the landing `#tickets` section)
- `/speak`, `/volunteer` — call-for-X forms (mailto-based, see below)
- `/code-of-conduct`, `/privacy`, `/terms` — real policy pages, not `#`
  placeholders

Deliberately **not** built yet, per the spec's "add as content arrives"
phasing: `/speakers`, `/schedule`, sponsor logo wall, gallery, press
mentions. Add these only when the underlying content is real — see the
data model note in [`src/lib/data.ts`](../src/lib/data.ts).

## What's stubbed vs. real

`NewsletterForm` and `CallForm` (speak/volunteer applications) work today
by opening the visitor's email client with a pre-filled `mailto:` —
there's no backend, database, or ESP wired up. This is intentional and
disclosed in the UI copy ("This opens your email client..."), not hidden.
Ticket purchase (`TicketTiers`) works the same way.

Deferred per the build spec, not yet started — flag to the founder before
assuming any of this exists: a CMS (Sanity/Payload), Paystack ticketing +
QR check-in, MongoDB, Resend email, GTM/Meta/LinkedIn analytics pixels,
dynamic OG image generation, and the Motion/Lenis animation pass (hero
mask reveal, countdown digit-flip, scroll-triggered reveals). These all
need real accounts/credentials or a deliberate scope decision — don't
wire up placeholder versions of them.
