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

- **Radius:** sharp — `0` for statements/cards, `2px` max on interactive chips
- **Shadows:** avoid; use borders (`1px solid #000`) for separation
- **Hover:** 150–250ms opacity/translateY(-1px) transitions, `cursor: pointer`
- **Motion:** subtle scroll reveal (fade + y:12, 300–400ms, `power1.out`); respect `prefers-reduced-motion`; animate 1–2 key elements per view max

### Page Pattern: Editorial Statement

Hero (giant statement + single CTA) > Editorial product showcase (generous
grid, huge whitespace) > Single-accent merchandising band > Footer (minimal).

- One primary CTA per screen
- Product pages: giant title, price in tabular figures, one accent highlight
- Cart/forms: keep accessibility (labels, 4.5:1 contrast, visible focus)

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
