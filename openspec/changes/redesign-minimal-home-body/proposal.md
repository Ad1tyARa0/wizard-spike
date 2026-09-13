# Redesign Minimal Home Body — Editorial Statement (Variant A)

## Why

The minimal preset's home body still followed the Hydrogen template's default
composition after the header and product cards were redesigned. The
Exaggerated Minimalism language (design-system/e-commerce-website/MASTER.md)
mandates one giant statement per view, extreme whitespace, hairline
separation, and a single gold accent — but the home sections read as generic
template blocks with mixed heading levels. The store owner selected
**Variant A — Editorial Statement** from `home-body-wireframes.html`
(ui-ux-pro-max design intelligence applied; the user's locked language wins
over dataset recommendations).

## What Changes

- Home body (hero, featured collection, recommended products, optional
  marquee) restructures to the Editorial Statement composition:
  - **Hero:** meta row (gold editorial index + eyebrow) → one giant statement
    (`--type-giant`, uppercase) → foot with Cormorant-italic sub left and the
    single gold CTA right; full-viewport presence, hairline bottom rule.
  - **Featured collection:** editorial split — 16:9 media (2fr) beside a side
    column (1fr) with gold-indexed kicker, display title (`h2`), and an
    underline "View collection" CTA with a Phosphor gold arrow. Single-column
    stack with a 4:3 crop below 1100px.
  - **Recommended products:** top hairline, editorial section head
    (`03 — Recommended`, flex hairline rule, deferred `NN items` count), and
    a hairline-separated product grid (1 / 2 / 4-up at 0–768 / 768–1440 /
    ≥1440) with a skeleton loading state instead of a "Loading…" flash.
  - **Marquee (optional):** quiet editorial band (small caps, `|`
    separators) for minimal when ordered with content; playful keeps its loud
    ✦ Anton band.
- Editorial index numerals (01/02/03) are derived at render time from
  `layout.homeSectionOrder`, never hard-coded, so merchant reordering keeps
  labels truthful. Section titles are structural UI copy; merchant copy stays
  in `hydrogen.config.json`.
- Heading hierarchy fixed: exactly one `h1` (hero statement); featured and
  recommended titles are `h2`s.
- Design decisions documented in
  `design-system/e-commerce-website/pages/home.md` (page override) with a
  cross-reference in `MASTER.md` and the visual source at
  `home-body-wireframes.html`.

## Impact

- Home body satisfies the Exaggerated Minimalism pre-delivery checklist
  (statement type, whitespace ≥96px, single accent, no emoji icons,
  cursor-pointer, focus rings, reduced motion) and the theme spec's
  responsive/accessibility scenarios at 375 / 768 / 1024 / 1440.
- The playful preset keeps its banded home look (CSS gated on
  `[data-theme='playful']`), and config-driven section order/content behavior
  is unchanged.
