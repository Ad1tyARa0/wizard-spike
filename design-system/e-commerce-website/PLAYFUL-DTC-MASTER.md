# Playful DTC Design System Master

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** E-Commerce Website
**Updated:** 2026-08-28 (config-driven theming — theme preset #2)
**Category:** E-commerce (headless Hydrogen storefront)
**Preset:** `playful` — selected via `hydrogen.config.json` → `"theme": "playful"`

> **Origin:** Adapted from the Partake Foods reverse-engineered visual spec
> (cream-dominant DTC snack brand: paired hues, poster display, banded
> sections, marquee, sticker hovers). Partake's proprietary fonts
> (Toroka / Bunch / Gilroy) are **replaced** with Google Fonts licensed for
> redistribution (Archivo Black / Anton / Fredoka / Manrope) — see
> `openspec/changes/implement-config-driven-theming` requirement
> `redistributable-fonts`.

---

## Style: Playful DTC

Warm, snackable, brand-forward DTC. Cream-dominant surfaces, one bold
paired-hue palette (light wash fills + dark ink + magenta pop), condensed
poster-gothic display in uppercase, rounded product surfaces with square
buttons, full-bleed color bands with no vertical section spacing, marquee
motion, sticker-style hovers.

| Principle               | Rule                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| Cream dominant          | Base surface is cream `#FFF6EB` — never pure white, never busy                |
| Paired hues, one pop    | Light wash fills (`#E6EDFF`) + ink details (`#181B48`) + magenta pop (`#BE008B`) |
| Poster display          | Archivo Black / Anton, uppercase, tight-but-not-crushed tracking (`-0.02em`)  |
| Rounded surfaces        | Cards 2rem radius; badges pill; **buttons square (0px radius)**               |
| Banded sections         | Full-bleed color bands, **zero vertical section spacing** between them        |
| Motion with intent      | Marquee loops (pause on hover), sticker hovers — both honor reduced motion    |
| Voice                   | Copy-first, snackable, benefit-led ("Better-for-you treats, made for everyone") |

### Color Palette

| Role                 | Hex       | CSS Variable               | Notes                                  |
| -------------------- | --------- | -------------------------- | -------------------------------------- |
| Primary (ink)        | `#181B48` | `--color-primary`          | Indigo-navy — text, bands, borders     |
| On Primary           | `#FFF6EB` | `--color-on-primary`       | Cream on ink bands / buttons           |
| Background (cream)   | `#FFF6EB` | `--color-background`       | Dominant surface                       |
| Foreground (ink)     | `#181B48` | `--color-foreground`       | Body text                              |
| Accent (magenta)     | `#BE008B` | `--color-accent`           | The single pop — CTAs, focus, stickers |
| On Accent            | `#FFF6EB` | `--color-on-accent`        | Cream on magenta                       |
| Secondary (wash)     | `#E6EDFF` | `--color-secondary`        | Light indigo wash bands / surfaces     |
| On Secondary         | `#181B48` | `--color-on-secondary`     | Ink on wash                            |
| Muted                | `#8F93AE` | `--color-muted`            | Disabled / secondary text              |
| Muted Foreground     | `#575C7D` | `--color-muted-foreground` | Meta text                              |
| Border               | `#181B48` | `--color-border`           | Ink borders                            |
| Destructive          | `#C62828` | `--color-destructive`      | Errors (cream text)                    |
| On Destructive       | `#FFF6EB` | `--color-on-destructive`   |                                        |
| Ring (focus)         | `#BE008B` | `--color-ring`             | Visible focus outlines                 |
| Hero accent (sticker)| `#BE008B` | `--color-hero-accent`      | Sticker-hover hard offset shadow       |

**Color Notes:** One magenta pop per view. Accent hues appear as paired
**light-wash fills** (`--color-secondary`) and **dark-accent details**
(`--color-primary`) rather than dominating the surface. Ink-on-cream and
ink-on-wash both pass WCAG AA (see `scripts/check-contrast.mjs`).

### Typography

- **Display:** Archivo Black — hero statements, section headlines, uppercase
- **Condensed subheads + marquee:** Anton — uppercase, wide tracking
- **Headings (cards, subheads):** Fredoka — geometric, friendly
- **Body/UI:** Manrope — readable 16px+ body, labels 500, uppercase labels
- **Google Fonts (all redistributable):** Archivo Black, Anton, Fredoka,
  Manrope — via `@fontsource/*` packages
- **Fallback stacks:** `system-ui, sans-serif` (display/heading/body),
  `Georgia, serif` (editorial)

| Token               | Playful Value                  | Usage                          |
| ------------------- | ------------------------------ | ------------------------------ |
| `--type-giant`      | `clamp(2.5rem, 8vw, 7rem)`     | Hero statements                |
| `--type-display`    | `clamp(2rem, 5.5vw, 4rem)`     | Section headlines              |
| `--type-heading`    | `clamp(1.25rem, 2.5vw, 2rem)`  | Card titles                    |
| `--type-body`       | `1rem` / `1.125rem`            | Body copy                      |
| `--type-label`      | `0.8125rem`                    | Labels, meta, buttons          |
| `--tracking-tight`  | `-0.02em`                      | Display (poster, not crushed)  |
| `--tracking-label`  | `0.08em`                       | Labels (uppercase)             |

### Spacing

_Density: 5/10 — Bouncy but breathing. Bands carry the whitespace; sections
themselves have **zero** vertical gap (banded architecture)._

| Token          | Value    | Usage                          |
| -------------- | -------- | ------------------------------ |
| `--space-xs`   | `4px`    | Micro gaps                     |
| `--space-sm`   | `8px`    | Tight gaps                     |
| `--space-md`   | `16px`   | Inline gaps, button padding    |
| `--space-lg`   | `32px`   | Band padding, card gaps        |
| `--space-xl`   | `64px`   | Section padding                |
| `--space-2xl`  | `96px`   | Band padding (desktop)         |
| `--space-huge` | `6rem`   | Hero padding                   |

### Radii & Shape

| Token            | Value    | Usage                           |
| ---------------- | -------- | ------------------------------- |
| `--radius-none`  | `0`      | **Buttons** (square), inputs    |
| `--radius-sm`    | `4px`    | Small chips                     |
| `--radius-card`  | `2rem`   | Product images, cards, media    |
| `--radius-pill`  | `999px`  | Option badges, tags             |

### Motion

| Token                  | Playful Value               | Usage                          |
| ---------------------- | --------------------------- | ------------------------------ |
| `--duration-fast`      | `200ms`                     | Micro-interactions             |
| `--duration-base`      | `350ms`                     | Sticker hovers, transitions    |
| `--ease-out`           | `cubic-bezier(0.22,1,0.36,1)` | Decelerating feel            |
| Marquee speed          | fast 16s / default 28s / slow 40s | Full-loop duration       |
| Sticker hover          | `rotate(-2.5deg) translateY(-6px)` + `10px 10px 0 --color-hero-accent` | Product images |

**Motion rules:** marquee pauses on hover; under `prefers-reduced-motion`
the marquee becomes static (scrollable) and sticker hovers apply **no
transform and no shadow**.

### Section Architecture (Home)

Banded, full-bleed, zero vertical spacing. Order is config-driven
(`layout.homeSectionOrder`):

1. **Hero band** (wash `--color-secondary`) — eyebrow, poster statement,
   sub, square magenta CTA with hard ink shadow + slight rotation
2. **Marquee band** (ink `--color-primary`) — Anton uppercase loop with ✦
   separators, pauses on hover
3. **Featured collection band** (cream) — rounded 16:9 media, display title
4. **Recommended products band** (wash) — compact grid, rounded-square
   product images with sticker hovers

### Copy Voice

Copy-first, benefit-led, snackable. Short sentences. Brand values as
marquee items. Hero states a mood + benefit, not a feature list.

> **Shipping note (2026-08-28):** no brand copy ships in the storefront.
> Preset content defaults are neutral; all merchant copy (hero, marquee,
> footer taglines) is written by the wizard into `hydrogen.config.json`.
> The copy voice below is the style guide the wizard's copy should follow —
> the demo copy lives only in the repo's sample config file.

### Component Notes

- **Header (chunky):** tall banded header, Anton wordmark, ink bottom rule
- **Grid density (compact):** tighter columns/gaps vs minimal's comfortable
- **Focus:** magenta ring `--color-ring` on `:focus-visible`
- **Reduced motion:** global durations collapsed + marquee/sticker disabled
