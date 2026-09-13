# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** E-Commerce Website
**Updated:** 2026-08-19 (user-mandated design language)
**Category:** E-commerce (headless Hydrogen storefront)

> **Decision note:** The ui-ux-pro-max skill's aggregated recommendation was
> "Minimalism & Swiss Style". Per skill policy, dataset output is a
> recommendation that never overrides the user — the user explicitly chose
> **Exaggerated Minimalism**, which is the binding design language here.

---

## Style: Exaggerated Minimalism

Bold minimalism, oversized typography, high contrast, negative space, loud
minimal, statement design.

| Principle            | Rule                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| Typography oversized | Display type `clamp(3rem, 10vw, 12rem)`, weight 900, `letter-spacing: -0.05em`        |
| White space extreme  | Section padding ≥ 96px; hero padding `8rem`; nothing crowded                          |
| Black/white dominant | `#000000` primary, `#FFFFFF` background — no other neutrals in hero/statement areas   |
| Single accent only   | Exactly ONE vibrant accent (`--color-accent`). No secondary accent, no gradient mixes |
| Elements minimal     | One statement per view; remove anything that does not earn its place                  |
| Statement clear      | Every section communicates one idea in one glance                                     |

### Color Palette

| Role                 | Hex       | CSS Variable               |
| -------------------- | --------- | -------------------------- |
| Primary / Foreground | `#000000` | `--color-primary`          |
| On Primary           | `#FFFFFF` | `--color-on-primary`       |
| Background           | `#FFFFFF` | `--color-background`       |
| On Background        | `#000000` | `--color-foreground`       |
| Accent (single)      | `#D4AF37` | `--color-accent`           |
| On Accent            | `#000000` | `--color-on-accent`        |
| Secondary (surface)  | `#F5F5F4` | `--color-secondary`        |
| On Secondary         | `#000000` | `--color-on-secondary`     |
| Muted                | `#A8A29E` | `--color-muted`            |
| Muted Foreground     | `#57534E` | `--color-muted-foreground` |
| Border               | `#000000` | `--color-border`           |
| Destructive          | `#DC2626` | `--color-destructive`      |
| On Destructive       | `#FFFFFF` | `--color-on-destructive`   |
| Ring (focus)         | `#D4AF37` | `--color-ring`             |

**Color Notes:** Black/white dominant with a single gold accent (`#D4AF37`,
vibrant, luxury-appropriate). The accent is used sparingly: CTAs, focus rings,
selected states, and one editorial highlight per view. Never a second accent.

### Typography

- **Display:** Montserrat 900 — giant statements, `clamp(3rem, 10vw, 12rem)`, `letter-spacing: -0.05em`, `text-transform: uppercase` for hero statements
- **Editorial:** Cormorant 400–700 — product names, quotes, refined accents
- **Body/UI:** Montserrat 300–500 — readable 16px+ body, labels 500
- **Google Fonts:** [Cormorant + Montserrat](https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap)

**Type scale (tokens):**

| Token              | Value                         | Usage              |
| ------------------ | ----------------------------- | ------------------ |
| `--type-giant`     | `clamp(3rem, 10vw, 12rem)`    | Hero statements    |
| `--type-display`   | `clamp(2.25rem, 5vw, 4.5rem)` | Section headlines  |
| `--type-heading`   | `clamp(1.5rem, 2.5vw, 2rem)`  | Product titles     |
| `--type-body`      | `1rem` / `1.125rem`           | Body copy          |
| `--type-label`     | `0.8125rem`                   | Labels, meta       |
| `--weight-black`   | `900`                         | Display            |
| `--tracking-tight` | `-0.05em`                     | Display            |
| `--tracking-wide`  | `0.08em`                      | Labels (uppercase) |

### Spacing (Extreme)

_Density: 1/10 — Spacious_

| Token          | Value   | Usage                                |
| -------------- | ------- | ------------------------------------ |
| `--space-xs`   | `4px`   | Tight gaps                           |
| `--space-sm`   | `8px`   | Icon gaps                            |
| `--space-md`   | `24px`  | Standard padding                     |
| `--space-lg`   | `48px`  | Section breathing                    |
| `--space-xl`   | `96px`  | Section padding                      |
| `--space-2xl`  | `128px` | Hero padding, massive whitespace     |
| `--space-huge` | `8rem`  | Exaggerated whitespace (style token) |

### Effects

- **Radius:** sharp — `0` for statements/cards, `2px` max on interactive chips, `4px` for buttons (`--radius-button`)
- **Shadows:** avoid; use borders (`1px solid #000`) for separation
- **Hover:** 150–250ms opacity/translateY(-1px) transitions, `cursor: pointer`
- **Motion:** subtle scroll reveal (fade + y:12, 300–400ms, `power1.out`); respect `prefers-reduced-motion`; animate 1–2 key elements per view max

### Page Pattern: Editorial Statement

Hero (giant statement + single CTA) > Editorial product showcase (generous
grid, huge whitespace) > Single-accent merchandising band > Footer (minimal).

- One primary CTA per screen
- Product pages: giant title, price in tabular figures, one accent highlight
- Cart/forms: keep accessibility (labels, 4.5:1 contrast, visible focus)

### Home body (updated 2026-09-06)

Home-page-specific composition rules (hero / featured / recommended /
optional marquee) now live in `pages/home.md` (page override, Variant A —
Editorial Statement; validated via `home-body-wireframes.html`). This file
remains the storefront-wide Master; the home override applies only to the
home body under the minimal preset.

### Product Card (updated 2026-08-28)

**Portrait editorial composition** — crop product photos to **4:5 portrait**
(`layout.cardAspectRatio: "portrait"`, config-driven; square is the fallback
when the key is absent). Card anatomy, top to bottom:

- Image: 4:5 crop, `object-fit: cover`, subtle 1.02 scale on hover
  (disabled under reduced motion). The crop is forced over each photo's own
  intrinsic ratio so every card in a row is the same height.
- Meta row, pinned to the bottom of the card:
  - **Name** (left): display family (`--font-display`), bold, sentence case
    — the card's single statement
  - **Price** (right): muted foreground (`--color-muted-foreground`),
    tabular figures, nowrap

**No card shadows.** Shadows are an anti-pattern here (see Anti-Patterns:
"avoid; use borders for separation") — separation comes from the crop,
whitespace, and hover states (scale + underline), never a drop shadow.

Whitespace between cards stays exaggerated (`--space-xl` rows). Rationale:
1:1 square crops chop portrait product shots and read as squashed; 4:5 is
the standard premium e-commerce ratio. Validated via
`product-card-wireframes.html` (Variant B), then refined in implementation
(meta on one row, name/price baseline-aligned, price right-aligned).

---

### Header (updated 2026-08-31)

**Exaggerated Minimalism bar** — one ultra-minimal sticky bar, three zones
(`grid-template-areas`, swapped at the 768px breakpoint):

- **Desktop (≥ 768px):** `[logo] · [centered nav] · [search] [cart]` — logo at
  the extreme left, primary navigation centered, search + cart icon controls at
  the extreme right (search immediately left of cart).
- **Mobile (< 768px):** `[list] · [centered logo] · [search] [cart]` — list
  (menu) icon at the extreme left, logo centered, search + cart at the extreme
  right.
- **No account link** in the header (account stays reachable via `/account`).
- **Icons:** Phosphor **thin** (ultra-thin) weight, 44px touch targets; all
  header icon controls render at the predefined **md** size (24px):
  `List` (mobile menu), `MagnifyingGlass` (search), `ShoppingCart` (cart).
  The playful preset keeps bold icons.
- **Cart:** the cart control renders `ShoppingCart` at all times (no state
  swap); its weight is ultra-thin when the cart is empty and flips to the
  Phosphor **fill** weight once items are in the cart; the count badge is a
  circle in the primary token color with on-primary text (black circle, white
  number in the minimal preset).
- **Loading:** while the header data loads or the client hydrates, the WHOLE
  header renders as a skeleton (logo row, nav row, search + cart icon blocks)
  composed from the reusable `shared/ui` skeleton primitives — never an
  isolated per-control skeleton. Icon blocks are 36px, skeleton rows 32px (all
  vertically centered), and the desktop nav row spans ~50% of the header width.
- Spec: OpenSpec change `openspec/changes/redesign-minimal-header/`.

### Icon size scale (predefined)

| Token       | Value  | Usage                                    |
| ----------- | ------ | ---------------------------------------- |
| `--icon-sm` | `20px` | Dense / inline icon affordances          |
| `--icon-md` | `24px` | Standard controls (header, drawer close) |
| `--icon-lg` | `32px` | Statement / empty-state icons            |

Icons are sized from this scale — never ad-hoc literals. The scale is part of
the config-driven token set (`design.icon` overrides apply without code edits).

### Button (shared primitive, updated 2026-09-10)

`shared/ui/button` — `Button` (button element) and `ButtonLink` (anchor) — is
the storefront's only button. Every text call-to-action renders it; no screen
styles its own button.

| Aspect   | Rule                                                                                                                                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface  | Hollow — transparent fill, `1px` border in `currentColor`, no shadow in any state                                                                                                                                                                                 |
| Radius   | `--radius-button` — `4px` (minimal preset) / `0` (playful); a token, never a prop                                                                                                                                                                                 |
| Label    | Uppercase, `--type-label`, `--weight-bold`, `--tracking-label`                                                                                                                                                                                                    |
| Size     | One size app-wide — `min-height: 44px`, `padding: 8px 24px`                                                                                                                                                                                                       |
| Hover    | No fill or tint — the dot is the only hover feedback; `translateY(-1px)` lift, press nudges down `1px`                                                                                                                                                            |
| Focus    | `2px` ring in `--color-ring`, `2px` offset                                                                                                                                                                                                                        |
| Disabled | `opacity: 0.5`, `not-allowed` cursor, no animation                                                                                                                                                                                                                |
| Shimmer  | `shimmer` prop — `hover` (default) / `always` / `none`; plain-CSS port of Magic UI's `ShimmerButton` (MIT): a soft gradient dot in the border colour, travelling as a band `shimmerSize` (2px) thick hugging the border from outside it — never inside the button |

Because the border is `currentColor`, a button inherits an inverted color over
photographic backgrounds (the hero CTA) with no variant prop. The playful
preset may still compose its own hard offset shadow on the hero CTA — that is
preset decoration, not part of the primitive. Icon-only controls (header
menu/search/cart, drawer close) and product variant chips are not CTAs and keep
their own treatment.

Spec: `openspec/changes/standardize-button-component/`.

---

## Anti-Patterns (Do NOT Use)

- ❌ Second accent color or multi-color palettes
- ❌ Decorations: gradients, heavy shadows, ornate borders, patterns
- ❌ Cluttered grids or dense data layouts (Exaggerated Minimalism is _not_ for dashboards)
- ❌ Emojis as icons — SVG only (Phosphor per skill default)
- ❌ Missing `cursor: pointer` on clickable elements
- ❌ Layout-shifting hovers (scale transforms that shift layout)
- ❌ Low-contrast text (< 4.5:1)
- ❌ Instant state changes (always 150–300ms transitions)
- ❌ Invisible focus states (visible focus ring required)
- ❌ Muted gray-on-gray body text

---

## Pre-Delivery Checklist

- [ ] Giant display type present on statement/hero sections
- [ ] Extreme whitespace: nothing cramped, section padding ≥ 96px
- [ ] Black/white dominant; exactly one accent color
- [ ] Single accent only — verified across the view
- [ ] Elements minimal; one statement per section
- [ ] No emojis as icons (Phosphor SVGs)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Product/price/forms remain legible and usable (e-commerce guardrail)
