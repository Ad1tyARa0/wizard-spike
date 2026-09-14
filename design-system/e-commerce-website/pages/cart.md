# Cart Page — Design Override

> **LOGIC:** This page file **overrides** `../MASTER.md` for the cart drawer
> (and the `/cart` page it mirrors). Visual reference: the responsive
> **CartDrawer** wireframe (header manifest, line items with steppers, cost
> summary + checkout). Playful styling stays governed by
> `../PLAYFUL-DTC-MASTER.md`.

**Project:** E-Commerce Website · **Page:** Cart drawer · **Preset:** minimal
**Updated:** 2026-09-14

## Cart drawer

The drawer renders the **live Hydrogen cart** (root-loader cart →
`PageLayout` → `CartDrawer`), not a client model. `useOptimisticCart` shows
pending mutations, and all quantity/remove changes go through `CartForm`
server actions against the `/cart` route. It opens itself whenever the cart
quantity increases, so both the product form and the card quick-add reveal it.
Mobile-first; every value is a design token.

| Rule            | Value                                                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root / backdrop | fixed inset, `--z-drawer`; dimmer `color-mix(in srgb, --color-primary 60%, transparent)` on a native close button; fades in via `@starting-style`                                                                                                            |
| Panel           | `--color-background`, left rule `--border-width-strong` solid `--color-primary`, flex column; full width on mobile, `27.5rem` at ≥ 1024px; slides in from the right                                                                                          |
| Header          | `--color-secondary`, `--space-5` padding, `--border-width-strong` bottom rule, space-between. Manifest tag (mono `--type-label-xs`, `--color-muted`, uppercase) + heading (`--font-display` `--weight-black` `--type-body-lg`, uppercase); 44px close button |
| Items           | scrollable, `--space-5` padding; line cards `--color-secondary` with 1px `--color-border`, `--space-3` padding, `--space-3` gap                                                                                                                              |
| Line media      | 4.375×5rem canvas, 1px hairline, `object-fit: cover` image (mono placeholder when missing)                                                                                                                                                                   |
| Line title      | `--font-display` `--weight-black` `--type-label-sm` uppercase, links to the variant; remove is a muted `×` button                                                                                                                                            |
| Line meta       | mono `--type-label-xs` `--color-muted` uppercase — `Vendor: {vendor}`                                                                                                                                                                                        |
| Quantity        | hairline stepper of 1.5rem mono `−`/`+` buttons around a canvas count; disabled while optimistic or at the lower bound                                                                                                                                       |
| Line price      | mono `--type-label-sm` `--weight-bold`, right-aligned; Hydrogen `<Money>` on the line total                                                                                                                                                                  |
| Footer          | `--color-secondary`, `--border-width-strong` top rule, `--space-5` padding. Rows: **Subtotal**, **Estimated shipping** (muted, "Calculated at checkout"), **Total** (dashed rule, bold)                                                                      |
| Checkout CTA    | full-width single accent fill (`--color-accent` / `--color-on-accent`), mono `--type-label-sm` bold uppercase; hover → `--color-primary`; links to `cart.checkoutUrl`                                                                                        |
| Empty state     | display statement + a single accent "Shop the collection" link                                                                                                                                                                                               |

The backdrop, close button, title links, steppers and checkout all show a
`--color-ring` `:focus-visible` outline; `prefers-reduced-motion` collapses the
panel/backdrop/CTA transitions.

## Data

The root loader defers `cart.get()` (catching errors to `null`) and
`PageLayout` passes the resolved cart to the drawer and the header bag count.
Add/update/remove run through `CartForm` (`LinesAdd` / `LinesUpdate` /
`LinesRemove`) against the `/cart` route; the loader revalidates after each
mutation. Cart identity for the drawer is the Shopify cart cookie
(`cart.setCartId`).

> The Redux `entities/cart` optimistic view-model (and its listener
> middleware) is retained per the `cart` / `architecture` capability specs. The
> drawer now reads the authoritative Hydrogen cart, so retiring the Redux cart
> is a follow-up OpenSpec change, not part of this page.
