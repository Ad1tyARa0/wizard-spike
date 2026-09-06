# Theme Capability — Delta

## ADDED Requirements

### Requirement: config-file-driven-theming

The Theme MUST be configurable through a validated `hydrogen.config.json` that selects a theme preset and applies token, layout, and content overrides; missing or malformed values fall back to the preset defaults and the page still renders.

#### Scenario: preset-selection

- **WHEN** a merchant sets `theme` to a shipped preset name in the config file
- **THEN** the storefront renders that preset's tokens, layout flags, and content defaults across all pages without code edits

#### Scenario: token-override

- **WHEN** a merchant overrides a supported design token (e.g. a brand color) in the config file
- **THEN** the rendered storefront reflects the override once the config is loaded

#### Scenario: missing-config-falls-back

- **WHEN** the config file is absent, malformed, or fails schema validation
- **THEN** the storefront renders with the default preset's values
- **AND** no crash or unstyled output occurs

#### Scenario: additive-config-contract

- **WHEN** a newer template release reads a config written for an older release
- **THEN** all old keys keep working
- **AND** only newly added keys may be absent

### Requirement: runtime-token-resolution

The Theme MUST resolve the effective token set at runtime as a pure function of defaults, the selected preset, and overrides — exposed both as CSS custom properties and as typed TypeScript values.

#### Scenario: resolved-set-emitted

- **WHEN** the root loader resolves the effective token set
- **THEN** the rendered root emits the resolved values as CSS custom properties
- **AND** components consume those custom properties rather than literals

#### Scenario: typed-mirror

- **WHEN** a TypeScript consumer needs a token value at runtime
- **THEN** it imports the resolved, typed token set from the token module

#### Scenario: preview-config-source

- **WHEN** the storefront runs in a non-production environment and receives a config override at request time
- **THEN** the rendered output reflects the override without a rebuild or deployment
- **AND** in production the request-time override is ignored

#### Scenario: resolver-is-pure

- **WHEN** the resolver is given the same defaults, preset, and overrides
- **THEN** it returns the same resolved set every time
- **AND** it can be unit-tested without rendering

### Requirement: theme-presets

The Theme MUST ship at least two complete design-language presets — `minimal` (Exaggerated Minimalism) and `playful` (Playful DTC) — each defining the full token set (colors, typography, spacing, radii, breakpoints), layout defaults, and content defaults.

#### Scenario: preset-completeness

- **WHEN** a preset is selected
- **THEN** every token the Theme requires resolves from that preset's own defaults
- **AND** no preset relies on another preset's tokens

#### Scenario: preset-switch

- **WHEN** the selected preset changes in the config
- **THEN** all pages re-theme consistently under the new preset

#### Scenario: preset-parity

- **WHEN** any route renders under the `playful` preset
- **THEN** it renders without breakage, layout overflow, or missing styling, just as it does under `minimal`

### Requirement: layout-variant-flags

The Theme MUST vary layout structure through config-driven flags — header style, product-grid density, and home section order — without code edits.

#### Scenario: header-variant

- **WHEN** a merchant selects a header variant flag in the config
- **THEN** the header widget renders the selected variant

#### Scenario: grid-density

- **WHEN** a merchant changes the product-grid density flag
- **THEN** product grids render with the selected column density across catalog pages

#### Scenario: home-section-order

- **WHEN** a merchant reorders the home section list in the config
- **THEN** the home page renders sections in the configured order

### Requirement: playful-dtc-design-language

The Theme MUST implement the Playful DTC design language for the `playful` preset: cream-dominant background with paired light-wash/dark-accent hues, indigo-navy ink, condensed poster-gothic display type in uppercase, rounded product surfaces with square buttons, banded full-bleed sections with no vertical section spacing, marquee motion with pause-on-hover, and sticker-style hover (tilt + hard offset shadow), as defined by the playful design system master file.

#### Scenario: cream-dominant-palette

- **WHEN** any page renders under the `playful` preset
- **THEN** the base surface is the cream token
- **AND** accent hues appear as paired light-wash fills and dark-accent details rather than dominating the surface

#### Scenario: poster-typography

- **WHEN** a hero, section heading, or marquee renders under the `playful` preset
- **THEN** it uses the condensed poster display family in uppercase with the preset's tracking
- **AND** body copy uses the preset's geometric body family

#### Scenario: banded-sections

- **WHEN** a page renders under the `playful` preset
- **THEN** sections render as full-bleed color bands with zero vertical section spacing

#### Scenario: marquee-behavior

- **WHEN** a marquee section renders under the `playful` preset
- **THEN** its content loops continuously
- **AND** pauses on hover
- **AND** is disabled or reduced to a static state when the user requests reduced motion

#### Scenario: sticker-hover

- **WHEN** a user hovers a product image under the `playful` preset
- **THEN** the image tilts and gains a hard offset shadow in the preset's hero accent
- **AND** the transition is disabled under reduced motion

#### Scenario: ink-contrast

- **WHEN** text renders on the cream or a wash surface under the `playful` preset
- **THEN** the contrast ratio meets WCAG AA minimums for the preset palette

### Requirement: redistributable-fonts

The Theme MUST ship only fonts licensed for redistribution in a productized theme (Google Fonts or explicitly licensed), with a defined display/heading/body pairing per preset and a system fallback stack.

#### Scenario: no-proprietary-fonts

- **WHEN** an audit inspects every font family shipped in the storefront
- **THEN** each family is redistributable (Google Fonts or explicitly licensed)
- **AND** no commissioned or commercially-restricted face is bundled

#### Scenario: per-preset-pairing

- **WHEN** a preset is selected
- **THEN** the rendered storefront uses that preset's declared display, heading, and body families

#### Scenario: fallback-stack

- **WHEN** a webfont fails to load
- **THEN** the system fallback stack renders legibly
- **AND** layout does not break
