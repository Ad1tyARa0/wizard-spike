# Theme Capability — Delta

## MODIFIED Requirements

### Requirement: component-theming

The Theme MUST make shared UI primitives themeable through tokens, context, or props, with no hard-coded brand colors in component code.

#### Scenario: home-body-markup-composes-through-config

- **WHEN** the home page renders
- **THEN** its body sections (hero, optional marquee, featured collection, recommended products) render in the order given by the active theme's `homeSectionOrder`
- **AND** each section's editorial index numeral is derived from that order at render time (never hard-coded)
- **AND** the page contains exactly one `h1` (the hero statement), with featured and recommended titles as `h2`s

#### Scenario: hero-image-config-first

- **WHEN** the hero renders and `content.hero.image` is set
- **THEN** that image renders as the hero's full-bleed backdrop
- **AND** when the config image is empty the hero falls back to the live shop `brand.coverImage`, and to no media otherwise

## ADDED Requirements

### Requirement: home-body-editorial-statement

The Theme MUST render the minimal-preset home body as an editorial composition: a full-bleed HeroUnit hero (a metadata tag, a display headline, then a responsive media/action grid with a floating highlight badge and a single solid CTA), a featured-collection editorial header with its own products, and a recommended-products section with an editorial section head and a whitespace-separated grid.

#### Scenario: hero-unit-composition

- **WHEN** the hero renders under the minimal preset
- **THEN** it shows a metadata tag of `{index} / {eyebrow}` in the mono label style (the numeral always renders; the eyebrow only when set)
- **AND** the configured statement renders as the hero's display headline (uppercase, `--type-hero`) and remains the page's accessible `h1`, falling back to the shop name
- **AND** the section spans the full viewport width with its own gutters (`--space-10 --space-4` mobile → `--space-20 --space-12` desktop) and a 1px hairline bottom rule

#### Scenario: hero-responsive-grid

- **WHEN** the hero renders below the medium breakpoint
- **THEN** the media canvas and the action block stack in a single column with a `--space-6` gap
- **AND** the lead description is visually hidden on mobile but kept in the accessibility tree (not removed with `display: none`)
- **WHEN** the hero renders at or above the medium breakpoint
- **THEN** the grid is `minmax(0, 1fr) 20rem` (media / action) with a `--space-8` gap, media aligned to the end
- **AND** the action block holds the description (top hairline) above the CTA, bottom-aligned

#### Scenario: hero-media-canvas

- **WHEN** the hero renders with a config or live-shop cover image under the minimal preset
- **THEN** the image renders inside the media canvas with `object-fit: cover` and `object-position: center`
- **AND** the canvas is `18.75rem` tall on mobile and `31.25rem` tall on desktop, filling the grid column
- **AND** when no image exists, the featured title or hero eyebrow labels the canvas instead (empty when neither is set)

#### Scenario: hero-highlight-badge

- **WHEN** the hero renders with an image and a featured collection exists
- **THEN** a floating badge over the media names it (`Featured lot: <title>`) in structure fill with a 10px mono label, capped to the canvas width
- **AND** without an image the canvas label names the highlight instead, so the title is never shown twice

#### Scenario: hero-cta-solid

- **WHEN** the hero CTA renders
- **THEN** it uses the shared button primitive's `solid` variant with a trailing right arrow
- **AND** it spans the full action column and grows taller than the default control (`padding-block: --space-4`)

#### Scenario: featured-editorial-header-and-products

- **WHEN** the featured collection renders under the minimal preset
- **THEN** it shows an editorial split when the collection has an image (16:9 media in a `2fr` column beside a `1fr` side column) and falls back to a text-only header when it has none
- **AND** the side column shows an accent-indexed kicker, the collection title as an `h2` at display size, and an underline "View collection" CTA with an accent arrow
- **AND** the collection's first products render beneath the header in the shared editorial product grid (graceful when empty)

#### Scenario: featured-split-stacks-mobile

- **WHEN** the featured collection renders below 1100px
- **THEN** it stacks into a single column
- **AND** the media crop becomes 4:3

#### Scenario: recommended-editorial-head-and-grid

- **WHEN** the recommended-products section renders under the minimal preset
- **THEN** it shows an editorial section head (accent-indexed title and a tabular item count) separated by whitespace rather than extra rule lines
- **AND** the product grid shows one column below 768px, two columns from 768px, and four columns at or above 1440px
- **AND** every cell is separated by whitespace (`--space-lg` column gap, `--space-xl` row gap) with no hairlines or shadows

#### Scenario: recommended-loading-skeleton

- **WHEN** the recommended products are still loading
- **THEN** the section shows skeleton cards that mirror the product-card anatomy (4:5 media plus meta rows) so no layout shift occurs

#### Scenario: marquee-quiet-band-minimal

- **WHEN** the marquee band renders under the minimal preset with non-empty content items
- **THEN** it renders as a quiet editorial band — primary-colored background, small-caps items, thin `|` separators — and stays within the reduced-motion rules
