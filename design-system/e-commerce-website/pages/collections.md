# Collections Page — Design Override

> **LOGIC:** This page file **overrides** `../MASTER.md` for the collections
> index (`/collections`) only. Visual reference: the responsive **CollectionCard**
> wireframe (surface card: title + count, product list, footer link). Playful
> styling stays governed by `../PLAYFUL-DTC-MASTER.md`.

**Project:** E-Commerce Website · **Page:** Collections index · **Preset:** minimal
**Updated:** 2026-09-14

## Collection card

Each collection renders as a `collection-card` in the shared auto-fit grid
(`.collections-grid`). Mobile-first; every value is a design token.

| Rule         | Value                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Card         | `--color-secondary` (surface) fill, 1px hairline border (`--color-border`), `--space-5` padding mobile → `--space-7` desktop; flex column, `justify-content: space-between` so the footer pins to the bottom |
| Header       | flex, space-between, `--space-3` gap, `--space-4` bottom margin                                                                                                                                              |
| Title        | `h3`, `--font-display` `--weight-black`, `clamp(1.125rem, 2vw, 1.375rem)`, `--tracking-tight`, uppercase                                                                                                     |
| Count badge  | Space Mono `--type-label-xs`, `--color-muted`, 1px hairline border, `--space-0-5`/`--space-1-5` padding — `NN items`                                                                                         |
| Product list | `<ul>` reset, top hairline; each row flex space-between, `--space-3` vertical padding, dashed `--color-border` bottom separator                                                                              |
| Product name | `--font-body` `--weight-bold`, `--type-label-sm` mobile → `--type-label` desktop, uppercase                                                                                                                  |
| Product meta | `--font-mono` `--type-label-xs`, `--color-muted`, uppercase (`productType`; omitted when empty)                                                                                                              |
| Price        | `--font-mono` `--type-label-sm` `--weight-bold`, `nowrap` — Hydrogen `<Money>`                                                                                                                               |
| Footer       | Full-width link: space-between, top hairline, `--space-4` padding, mono `--type-label-sm` bold uppercase, `--tracking-label`. Hover → `--color-accent-strong`; the accent arrow translates `--space-1`       |

## Guardrails (unchanged from MASTER)

- 70/20/10: surface card on the canvas, structure text, single accent arrow.
- Zero radius, no shadows; separation is hairlines (solid + dashed).
- Contrast ≥ 4.5:1; `--color-muted` (≈5:1) for meta/count; visible focus on the footer link.
- `prefers-reduced-motion` honored (hover transitions collapse).
- Responsive: single column on mobile, auto-fit 2-up/4-up by `--grid-item-width`; no horizontal scroll.

## Data

`COLLECTIONS_QUERY` fetches each collection's first 4 products (`id`, `title`,
`handle`, `productType`, `minVariantPrice`). The count badge reflects the
products returned; the Storefront API exposes no total product count on
`Collection`, so collections larger than 4 show the fetched count and the
footer link leads to the full collection.
