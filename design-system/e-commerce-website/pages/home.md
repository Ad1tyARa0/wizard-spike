# Home Page — Design Override

> **LOGIC:** This page file **overrides** `../MASTER.md` for the home page only
> (minimal preset). Visual reference: `../home-body-wireframes.html` — the
> **Editorial Statement** direction was chosen (user sign-off); the Inverted
> Drama and Swiss Hairline variants were discarded and removed from that file.
> Playful home styling stays governed by `../PLAYFUL-DTC-MASTER.md`.

**Project:** E-Commerce Website · **Page:** Home (body) · **Preset:** minimal
**Updated:** 2026-09-06

## Composition (config order)

`layout.homeSectionOrder: ["hero", "featuredCollection", "recommendedProducts"]`
— the marquee band renders only when `"marquee"` is added to the order **and**
`content.marquee.items` is non-empty (quiet band, see below).

## Rules (override MASTER for home body)

### Hero — HeroUnit (metadata / headline / media + action grid)

A full-bleed `hero-unit` section on the canvas: a metadata tag, a display
headline, then a responsive grid that stacks on mobile and splits into
`1fr / 320px` (media / action) on desktop.

| Rule            | Value                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section         | Full-bleed (`100vw`), canvas, `--space-10 --space-4` padding mobile → `--space-20 --space-12` desktop, 1px hairline bottom rule (`--color-border`)                                                                |
| Metadata tag    | `01 / New Collection` in Space Mono (`--type-label-sm`, `--tracking-label`, `--color-muted`): `{index} / {content.hero.eyebrow}`. The numeral always renders; the eyebrow only when set                           |
| Headline        | The page's accessible `h1`, rendered as display type: `--type-hero` (`clamp(2.375rem, 8vw, 6rem)`), `--weight-black`, `--tracking-tight`, uppercase, `line-height: 0.92`                                          |
| Grid            | Mobile: stacked flex column, `--space-6` gap. Desktop (≥768px): `grid-template-columns: minmax(0, 1fr) 20rem`, `--space-8` gap, `align-items: end`                                                                |
| Media canvas    | `height: 18.75rem` mobile → `31.25rem` desktop; 1px hairline border. Source: `content.hero.image` → live shop `brand.coverImage` → placeholder label (`object-fit: cover`, centered)                              |
| Highlight badge | Floating badge bottom-left over the media (`--color-primary` fill, on-primary text, `--type-label-xs`): `Featured lot: <featured collection title>`. Renders only when a featured collection exists over an image |
| Action block    | Description + CTA, right column on desktop (`justify-content: flex-end`, full height)                                                                                                                             |
| Description     | `content.hero.sub` in Space Mono (`--type-label-sm`, `--color-muted`), top hairline, `--space-4` padding. Visually hidden on mobile but **kept in the accessibility tree** (not `display: none`)                  |
| CTA             | **Solid** accent fill (`variant="solid"`) with a right arrow (`Button` `icon`/`iconPosition`, `--type-label-sm` label), `width: 100%`, `padding-block: --space-4`                                                 |

#### Adding your own hero image

Set `content.hero.image` in `hydrogen.config.json` to any public image URL
(a Shopify Files/CDN URL, or your own host):

```json
"hero": {
  "eyebrow": "New Collection",
  "sub": "Considered goods for everyday life.",
  "cta": "Shop the collection",
  "ctaHref": "/collections/all",
  "image": "https://cdn.shopify.com/s/files/.../your-hero.jpg"
}
```

- Upload the file under Shopify admin → **Content → Files**, then copy its CDN URL.
- Leave it `""` to fall back to the shop's **brand cover image** (Shopify admin → Settings → Brand → Cover image), or to a plain text hero when neither exists.
- Landscape ≥ 2000px wide works best (it is cropped with `object-fit: cover`, centered, so the middle of the frame is always visible on mobile).

Section index numerals (01/02/03) derive from `homeSectionOrder` at render
time — never hard-coded — so reordering via config keeps the labels honest.

### Featured collection — editorial header + its products

The featured band keeps an editorial split (media + side header when the
collection has an image) **and now lists the collection's own first products**
beneath it, so a heading never renders with nothing under it — even when the
featured collection has no image.

| Rule     | Value                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Split    | `2fr` image / `1fr` side column, `align-items: end`, gap `--space-xl` (whole split collapses to one column below 1100px)                                           |
| Media    | 16:9 crop (`object-fit: cover`), 4:3 below 1100px; side + products render when the collection has no image (`--text-only`)                                         |
| Side     | Kicker `02 — Featured Collection` (accent index) → display title (`--type-display`) → "View collection →" underline link with accent arrow (Phosphor, aria-hidden) |
| Heading  | Title is an `h2` (`featured-collection-title`); the page keeps exactly one `h1` (hero statement)                                                                   |
| Products | First 4 products of the collection, in the same whitespace-separated editorial grid as New arrivals (single / two-up / four-up)                                    |
| Query    | `FEATURED_COLLECTION_QUERY` fetches `collection.products(first: 4)`; render falls back gracefully when empty                                                       |

### Recommended products — editorial section head + whitespace grid

| Rule            | Value                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Head            | `03 — New arrivals` + tabular `N items` count. Section separated by whitespace (no rule line)                |
| Grid            | Single column < 768px · two-up 768–1439px · four-up ≥1440px                                                  |
| Cell separators | Whitespace only — `--space-lg` column gap / `--space-xl` row gap; no hairlines                               |
| Dedupe          | Excludes the featured collection's own products; falls back to the full list if that would empty the section |
| Cards           | Shared product card (4:5 portrait, pinned meta row) — `shared/widgets` `ProductItem`                         |
| Loading         | 4 skeleton cards (media 4:5 + meta rows) — no layout shift                                                   |
| Empty/error     | Says what happened and links to the catalog — never a heading over blank space                               |

### Marquee (optional quiet band)

Renders only when the section is ordered **and** items exist. Minimal = quiet
editorial band: structure bar, Inter small caps (`--type-label`, wide
tracking), `|` separators — no glyphs, no oversized condensed type (the loud
Anton band belongs to the playful preset).

## Guardrails (unchanged from MASTER)

- 70/20/10 dominant; accent `--color-accent` (`#6C757D`) only for the single
  CTA and the featured arrow; small accent text uses `--color-accent-strong`
  (`#50585E`, ≥ 4.5:1 on the canvas), and focus rings use `--color-ring`
  (`#20242B`). No second accent.
- Radius 0; separation by whitespace, never shadows or hairlines.
- `prefers-reduced-motion` honored (global collapse; no entry animation added).
- Contrast ≥ 4.5:1; visible `:focus-visible` ring from `--color-ring`.
- No horizontal scroll at 375/768/1024/1440.

## Config mapping (hydrogen.config.json)

Structure only — no new schema keys were introduced. All labels shown above
are structural UI copy; merchant copy (hero statement/sub/CTA, marquee items)
lives in `content.*` of `hydrogen.config.json`.

**Colors and other visual values are config-driven tokens, never literals.**
The accent above is simply the `minimal` preset's value for
`--color-accent` (`#6C757D` in `presets/minimal.ts`); the wizard writes the
merchant's selection into `hydrogen.config.json → design.*`
(`design.colors.accent`, `design.colors.ring`, `design.fonts.*`,
`design.icon.*`, …). `resolveTokens` merges `defaults ⊕ preset ⊕ overrides`
and the root layout emits the result as CSS custom properties on `<html>`, so
every rule in this page file (`var(--color-accent)`, `var(--color-ring)`, the
index numerals, the CTA, the arrow) follows the user's chosen accent with no
code change. Never hard-code a color (or type/space/icon value) in a component
or stylesheet outside the token files.
