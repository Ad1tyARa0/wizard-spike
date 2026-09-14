# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** E-Commerce Website
**Updated:** 2026-09-14 (70/20/10 "Rye Island" system)
**Category:** E-commerce (headless Hydrogen storefront)

> **Decision note:** The ui-ux-pro-max skill's aggregated recommendation was
> "Minimalism & Swiss Style". Per skill policy, dataset output is a
> recommendation that never overrides the user — the user explicitly chose
> **Exaggerated Minimalism**, now expressed through the 70/20/10 "Rye Island"
> palette and type system below. The visual source of truth is
> `design-system/e-commerce-website/exaggerated-minimalist-mockups.html`.

---

## Style: Exaggerated Minimalism (70/20/10)

Bold minimalism, oversized typography, high contrast, negative space, loud
minimal, statement design. The 70/20/10 split is the composition rule: 70%
canvas, 20% structure, 10% accent.

| Principle             | Rule                                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 70% canvas            | Dominant light neutral canvas (`#F1F2F4`) — the page is mostly calm surface                                                                                             |
| 20% structure         | Dark slate structure (`#20242B`) for text, rules, and filled controls                                                                                                   |
| 10% accent            | Exactly ONE subdued accent (`#6C757D`); never a second accent or a gradient mix                                                                                         |
| Typography oversized  | Display type `clamp(3rem, 10vw, 12rem)`, weight 900, tight tracking                                                                                                     |
| Technical metadata    | Space Mono for brand, nav, controls, and labels; Inter for everything else                                                                                              |
| Zero curves (minimal) | The 70/20/10 minimal preset is zero-radius with no shadows — separation is 1px rules and whitespace. Playful composes its own radii/shadows per `PLAYFUL-DTC-MASTER.md` |
| Elements minimal      | One statement per view; remove anything that does not earn its place                                                                                                    |
| Statement clear       | Every section communicates one idea in one glance                                                                                                                       |

### Color Palette

| Role                | Hex         | CSS Variable               |
| ------------------- | ----------- | -------------------------- |
| Primary / Structure | `#20242B`   | `--color-primary`          |
| On Primary          | `#F1F2F4`   | `--color-on-primary`       |
| Background / Canvas | `#F1F2F4`   | `--color-background`       |
| Foreground          | `#20242B`   | `--color-foreground`       |
| Accent (single)     | `#6C757D`   | `--color-accent`           |
| Accent (strong)     | `#50585E`   | `--color-accent-strong`    |
| On Accent           | `#FFFFFF`   | `--color-on-accent`        |
| Secondary (surface) | `#FFFFFF`   | `--color-secondary`        |
| On Secondary        | `#20242B`   | `--color-on-secondary`     |
| Muted / Subtle      | `#5F6773`   | `--color-muted`            |
| Muted Foreground    | `#5F6773`   | `--color-muted-foreground` |
| Border / Hairline   | `#20242B26` | `--color-border`           |
| Destructive         | `#DC2626`   | `--color-destructive`      |
| On Destructive      | `#FFFFFF`   | `--color-on-destructive`   |
| Ring (focus)        | `#20242B`   | `--color-ring`             |
| Hero accent         | `#6C757D`   | `--color-hero-accent`      |

**Color Notes:** Slate-accent 70/20/10, not black/gold. The accent fills
high-intent buttons and the cart badge; structure fills the header rule,
borders, and `stark` buttons. Small accent text (12–14px) uses
`--color-accent-strong` so it holds ≥ 4.5:1 on the canvas. The focus ring is
`--color-primary`, visible on every surface.

### Typography

- **Display:** Inter 900 — headings and statements, `letter-spacing: -0.04em`, uppercase for hero statements
- **Body/UI:** Inter 300–700 — readable body, labels
- **Technical:** Space Mono 400/700 — brand wordmark, nav, utility/button labels, badges
- **Google Fonts:** [Inter + Space Mono](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap)

**Type scale (tokens):**

| Token              | Value                         | Usage                     |
| ------------------ | ----------------------------- | ------------------------- |
| `--type-giant`     | `clamp(3rem, 10vw, 12rem)`    | Giant statements          |
| `--type-hero`      | `clamp(2.375rem, 8vw, 6rem)`  | Home hero headline        |
| `--type-display`   | `clamp(2.25rem, 5vw, 4.5rem)` | Section headlines         |
| `--type-heading`   | `clamp(1.5rem, 2.5vw, 2rem)`  | Product titles            |
| `--type-body`      | `1rem`                        | Body copy                 |
| `--type-body-lg`   | `1.125rem`                    | Leads                     |
| `--type-label`     | `0.8125rem`                   | Labels, meta              |
| `--type-label-lg`  | `0.875rem`                    | Brand wordmark            |
| `--type-label-sm`  | `0.75rem`                     | Mono nav + utility labels |
| `--type-label-xs`  | `0.625rem`                    | Badges                    |
| `--weight-black`   | `900`                         | Display                   |
| `--tracking-tight` | `-0.04em`                     | Display                   |
| `--tracking-label` | `0.12em`                      | Uppercase mono labels     |

### Spacing (4px primitive scale + semantic aliases)

| Token            | Value   | Usage                                                                   |
| ---------------- | ------- | ----------------------------------------------------------------------- |
| `--space-0-5`    | `2px`   | Hairlines, badge vertical padding                                       |
| `--space-1`      | `4px`   | Tight gaps                                                              |
| `--space-1-5`    | `6px`   | Badge horizontal padding                                                |
| `--space-2`      | `8px`   | Icon gaps, compact control padding                                      |
| `--space-3`      | `12px`  | Compact control padding                                                 |
| `--space-4`      | `16px`  | Bar gutters, compact control box                                        |
| `--space-6`      | `24px`  | Standard padding                                                        |
| `--space-8`      | `32px`  | Desktop bar gutters                                                     |
| `--space-11`     | `44px`  | Default control / touch-target height                                   |
| `--space-12`     | `48px`  | Section breathing                                                       |
| `--space-16`     | `64px`  | Large stack                                                             |
| `--space-24`     | `96px`  | Section padding                                                         |
| `--space-32`     | `128px` | Hero padding, massive whitespace                                        |
| semantic aliases | —       | `xs` 4 · `sm` 8 · `md` 24 · `lg` 48 · `xl` 96 · `2xl` 128 · `huge` 8rem |

### Effects

- **Radius:** zero in the minimal preset — every radius token is `0`. Playful is governed by `PLAYFUL-DTC-MASTER.md`.
- **Shadows:** none in the minimal preset — separation uses 1px structure rules. Playful may compose its own sticker shadow.
- **Hover:** `100–250ms` background/color transitions, never a transform that shifts layout.
- **Motion:** subtle; honor `prefers-reduced-motion` (transforms collapse, opacity/filter cues remain).

### Page Pattern: Editorial Statement

Hero (giant statement + single CTA) > Editorial product showcase (generous
grid, huge whitespace) > Single-accent merchandising band > Footer (minimal).

- One primary CTA per screen
- Product pages: giant title, price in tabular figures, one accent highlight
- Cart/forms: keep accessibility (labels, 4.5:1 contrast, visible focus)

### Home body (updated 2026-09-06)

Home-page-specific composition rules (hero / featured / recommended /
optional marquee) now live in `pages/home.md` (page override, Variant A —
Editorial Statement). This file remains the storefront-wide Master; the home
override applies only to the home body under the minimal preset.

### Product Card (updated 2026-08-28)

**Portrait editorial composition** — crop product photos to **4:5 portrait**
(`layout.cardAspectRatio: "portrait"`, config-driven). Card anatomy:

- Image: 4:5 crop, `object-fit: cover`, subtle 1.02 scale on hover (replaced by
  a brightness cue under reduced motion). The crop is forced over each photo's
  intrinsic ratio so every card in a row is the same height.
- Meta row, pinned to the bottom: **Name** (left, display family, bold) and
  **Price** (right, muted foreground, tabular, nowrap).

**No card shadows** — separation comes from the crop, whitespace, and hover
states, never a drop shadow. Whitespace between cards stays exaggerated.

---

### Header (updated 2026-09-14)

**70/20/10 bar** — one sticky bar, canvas background, 1px structure bottom
rule, inner container `--container-max` (80rem), gutters `--space-md2` /
`--space-lg2`. DOM order `[menu toggle] [brand] [desktop nav] [utilities]`,
laid out with flex `space-between`:

- **Desktop (≥ 768px):** `[brand] · [centered nav] · [search] [account] [bag]`
- **Mobile (< 768px):** `[list] · [brand] · [search] [account] [bag]` — the
  account label collapses to an icon-only square below 640px.
- **Brand:** 12px accent square (`--space-sm2`) + shop name in Space Mono
  `--weight-black`, `--type-label-lg`, uppercase, `--tracking-label`; truncates
  with an ellipsis when long. Hover → `--color-accent-strong`.
- **Nav:** Space Mono `--type-label-sm` `--weight-bold`, uppercase, centered,
  `--space-md` gaps; hover / current → `--color-accent-strong`.
- **Utilities:** compact `sm` button primitive (32px) with 16px (`--icon-xs`)
  Phosphor icons, thin weight in the minimal preset, bold in playful:
  `List` (menu, mobile only), `MagnifyingGlass` (search), `User` (account),
  `ShoppingCart` (bag). Account label hides below 640px so the control becomes
  an icon-only square with identical padding to search.
- **Bag:** `stark` button variant (structure fill, on-primary label) with the
  `ShoppingCart` glyph and an accent count badge; the badge renders only when
  the cart has items, as a two-digit number (`02`).
- **Loading:** while the header data loads or the client hydrates, the WHOLE
  header renders as a skeleton composed from the reusable `shared/ui` skeleton
  primitives — never an isolated per-control skeleton.
- Spec: OpenSpec change `openspec/changes/redesign-minimal-header/`.

### Icon size scale (predefined)

| Token       | Value  | Usage                               |
| ----------- | ------ | ----------------------------------- |
| `--icon-xs` | `16px` | Compact controls (header utilities) |
| `--icon-sm` | `20px` | Dense / inline icon affordances     |
| `--icon-md` | `24px` | Standard controls (drawer close)    |
| `--icon-lg` | `32px` | Statement / empty-state icons       |

Icons are sized from this scale — never ad-hoc literals. The scale is part of
the config-driven token set (`design.icon` overrides apply without code edits).

### Button (shared primitive, updated 2026-09-14)

`shared/ui/button` — `Button` (button element) and `ButtonLink` (anchor) — is
the storefront's only button. `ButtonLink` renders a router `Link` for internal
hrefs (client navigation + prefetch) and a plain anchor for external URLs. Both
take an `icon` prop plus `iconPosition: 'left' | 'right'`, so the glyph is
passed from the call site rather than baked in.

| Aspect   | Rule                                                                                                                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variants | `solid` (accent fill, high-intent CTA), `outline` (transparent + structure border, default), `stark` (structure fill)                                                                                |
| Radius   | `--radius-button` (0 across presets); a token, never a prop                                                                                                                                          |
| Label    | Uppercase, `--font-mono`, `--weight-bold`, `--tracking-label`                                                                                                                                        |
| Size     | Default CTA: `min-height: 44px`, `--space-sm`/`--space-md` padding, `--type-label`. `sm`: `min-height: 32px`, `--space-sm`/`--space-sm2` padding, `--type-label-sm` (`icon` adds a 44px-wide square) |
| Icon     | `icon` + `iconPosition` props (`left` default); header utilities pass their Phosphor glyphs                                                                                                          |
| Hover    | `solid` → structure fill + on-primary label; `outline`/`stark` → accent fill + on-accent label; 150ms transition                                                                                     |
| Focus    | `2px` ring in `--color-ring`, `2px` offset                                                                                                                                                           |
| Disabled | `opacity: 0.5`, `not-allowed` cursor, no fill on hover                                                                                                                                               |

Header utility controls use the `sm` size of the same primitive; the earlier
"icon-only controls keep their own treatment" carve-out is retired.

Spec history: `openspec/changes/standardize-button-component/` (its shimmer port
was superseded by the shipped hollow surface above).

---

## Anti-Patterns (Do NOT Use)

- ❌ Second accent color or multi-color palettes
- ❌ Decorations: gradients, heavy shadows, ornate borders, patterns
- ❌ Rounded corners or drop shadows (the 70/20/10 minimal preset is zero-radius, rule-separated)
- ❌ Cluttered grids or dense data layouts (Exaggerated Minimalism is _not_ for dashboards)
- ❌ Emojis as icons — SVG only (Phosphor)
- ❌ Missing `cursor: pointer` on clickable elements
- ❌ Layout-shifting hovers (scale transforms that shift layout)
- ❌ Low-contrast text (< 4.5:1); accent text below 14px must use `--color-accent-strong`
- ❌ Instant state changes (use 100–300ms transitions)
- ❌ Invisible focus states (visible focus ring required)
- ❌ Muted gray-on-gray body text

---

## Pre-Delivery Checklist

- [ ] Giant display type present on statement/hero sections
- [ ] Extreme whitespace: nothing cramped, section padding ≥ 96px
- [ ] 70/20/10 respected; exactly one accent color
- [ ] Zero radius and no shadows in the minimal preset
- [ ] Technical metadata set in Space Mono; everything else in Inter
- [ ] Elements minimal; one statement per section
- [ ] No emojis as icons (Phosphor SVGs)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (100–300ms)
- [ ] Text contrast 4.5:1 minimum (small accent text uses `--color-accent-strong`)
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 640px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Product/price/forms remain legible and usable (e-commerce guardrail)
