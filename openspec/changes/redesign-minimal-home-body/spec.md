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

The Theme MUST render the minimal-preset home body as an editorial composition: an image-led hero (over an optional full-bleed config-driven image) with a meta row, a lead line and a single hollow CTA, a featured-collection editorial header with its own products, and a recommended-products section with an editorial section head and a whitespace-separated grid.

#### Scenario: hero-image-led

- **WHEN** the hero renders under the minimal preset
- **THEN** it fills the first viewport (`min-height: calc(100svh - header)`) centered with `--space-2xl` vertical padding
- **AND** the configured statement renders as the hero's giant display headline (and remains the page's accessible `h1`) with or without hero media, falling back to the shop name
- **AND** it shows a meta row (gold editorial index plus eyebrow) and a foot row with the editorial-italic lead on the left and the single CTA on the right

#### Scenario: hero-media-backdrop

- **WHEN** the hero renders with a config or live-shop cover image under the minimal preset
- **THEN** the image fills the hero as a decorative layer (`role="presentation"`, empty alt) that spans the full viewport width, centered at every resolution (`100vw` breakout, `object-position: center`)
- **AND** a primary-token gradient scrim keeps on-primary text at ≥ 4.5:1 contrast
- **AND** statement, lead and meta text flip to `--color-on-primary`
- **AND** under the playful preset the media layer is hidden and the wash-band hero is preserved

#### Scenario: hero-cta-hollow

- **WHEN** the hero CTA renders
- **THEN** it has no background fill and a single thin (`1px`) border drawn in the current text color
- **AND** it gives visible hover feedback by inverting to a filled block
- **AND** below 768px the hero foot stacks and the CTA spans the full width

#### Scenario: featured-editorial-header-and-products

- **WHEN** the featured collection renders under the minimal preset
- **THEN** it shows an editorial split when the collection has an image (16:9 media in a `2fr` column beside a `1fr` side column) and falls back to a text-only header when it has none
- **AND** the side column shows a gold-indexed kicker, the collection title as an `h2` at display size, and an underline "View collection" CTA with a gold arrow
- **AND** the collection's first products render beneath the header in the shared editorial product grid (graceful when empty)

#### Scenario: featured-split-stacks-mobile

- **WHEN** the featured collection renders below 1100px
- **THEN** it stacks into a single column
- **AND** the media crop becomes 4:3

#### Scenario: recommended-editorial-head-and-grid

- **WHEN** the recommended-products section renders under the minimal preset
- **THEN** it shows an editorial section head (gold-indexed title and a tabular item count) separated by whitespace rather than extra rule lines
- **AND** the product grid shows one column below 768px, two columns from 768px, and four columns at or above 1440px
- **AND** every cell is separated by whitespace (`--space-lg` column gap, `--space-xl` row gap) with no hairlines or shadows

#### Scenario: recommended-loading-skeleton

- **WHEN** the recommended products are still loading
- **THEN** the section shows skeleton cards that mirror the product-card anatomy (4:5 media plus meta rows) so no layout shift occurs

#### Scenario: marquee-quiet-band-minimal

- **WHEN** the marquee band renders under the minimal preset with non-empty content items
- **THEN** it renders as a quiet editorial band — primary-colored background, small-caps items, thin `|` separators — and stays within the reduced-motion rules
