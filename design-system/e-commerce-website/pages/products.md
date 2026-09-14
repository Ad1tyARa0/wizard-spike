# Products Page — Design Override

> **LOGIC:** This page file **overrides** `../MASTER.md` for product listings
> (catalog `/collections/all`, `/collections/$handle`, and the home
> featured/recommended grids) only. Visual reference: the responsive
> **ProductCard** wireframe (bordered surface card: media canvas with badge +
> quick-add, then title/price and metadata). Playful styling stays governed by
> `../PLAYFUL-DTC-MASTER.md`.

**Project:** E-Commerce Website · **Page:** Product listings · **Preset:** minimal
**Updated:** 2026-09-14

## Product card

Each product renders as a `product-card` in the shared grid. This is the
lightweight catalog card, **not** the product page. Mobile-first; every value is
a design token.

| Rule           | Value                                                                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card           | `--color-secondary` (surface) fill, 1px hairline border (`--color-border`), flex column; hover → border `--color-primary`                                                                                                    |
| Media canvas   | `aspect-ratio` from `layout.cardAspectRatio` (`data-card-aspect` on `<main>`): **portrait** `4 / 5` (minimal), **square** `1 / 1` (playful), **wide** `16 / 10`; `overflow: hidden`, hairline bottom rule, canvas background |
| Media image    | fills the canvas with `object-fit: cover` (overrides Hydrogen's inline intrinsic ratio so columns stay even); `sizes="(min-width: 45em) 400px, 100vw"`                                                                       |
| Placeholder    | image-less products show a mono `--type-label-xs` `Product shot` label in `--color-muted`                                                                                                                                    |
| Sold-out badge | pinned top-left (`--space-3`), `--color-primary` fill / `--color-on-primary` label, mono `--type-label-xs` bold uppercase — rendered only when `availableForSale` is false                                                   |
| Quick add      | full-width accent bar pinned to the canvas bottom, `--space-2`/`--space-4` padding, `--type-label-sm`; visible on mobile, slides up (`translateY`) on `:hover` / `:focus-within` from 48em                                   |
| Details        | flex column, `space-between`, `--space-2` gap mobile → `--space-3` desktop, `--space-4` padding → `--space-5` desktop                                                                                                        |
| Header row     | flex, space-between, `--space-3` gap — title left, price right                                                                                                                                                               |
| Title          | `h4`, `--font-display` `--weight-black`, `--type-body` mobile → `--type-body-lg` desktop, `--tracking-tight`, uppercase; wraps to as many lines as needed                                                                    |
| Price          | `--font-mono` `--type-label-sm` `--weight-bold` (→ `--type-label` desktop), `tabular-nums`, `nowrap` — Hydrogen `<Money>`                                                                                                    |
| Flavour notes  | `productType` as mono `--type-label-xs` `--color-muted` uppercase; omitted when empty                                                                                                                                        |
| Meta footer    | top **dashed** hairline, `--space-1` margin, `--space-2` gap — vendor + variant title as `.meta-tag`s (mono `--type-label-xs` `--color-muted`); omitted when empty                                                           |

The media link is `aria-hidden` + `tabIndex={-1}` (the title link is the
accessible target); the whole image is still clickable.

## Guardrails (unchanged from MASTER)

- 70/20/10: surface card on the canvas, structure text, a single accent
  quick-add bar.
- Zero radius, no shadows; separation is hairlines (solid + dashed). No
  layout-shifting hover transforms.
- Contrast ≥ 4.5:1; `--color-muted` (≈5:1) for flavour notes and meta tags;
  visible focus on title link and quick-add.
- `prefers-reduced-motion` honored — the quick-add reveal collapses to
  `transform: none` (always visible) instead of sliding.
- Responsive: single column on mobile, 2-up at 768–1439px and 4-up ≥ 1440px for
  the home grids, `--grid-item-width` auto-fit for the catalog; no horizontal
  scroll.

## Data

The product GraphQL fragments (`CollectionItemFragment`,
`ProductItemFragment`, `RecommendedProductFragment`, and the featured-collection
products) fetch `id`, `handle`, `title`, `availableForSale`, `productType`,
`vendor`, `featuredImage`, `priceRange.minVariantPrice` (plus
`maxVariantPrice` on catalog/collection queries), and
`variants(first: 1) { nodes { id title availableForSale } }`.

Quick add submits that first variant to the cart via `AddToCartButton`; it is
disabled when the variant is unavailable. Products with a single default
variant add in one click — multi-variant products still need the product page
to choose options.
