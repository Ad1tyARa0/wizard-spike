# Theme Capability — Delta

## ADDED Requirements

### Requirement: shared-button-primitive

The storefront MUST own exactly one reusable button primitive in the shared UI layer (`shared/ui/button/`), exposing `Button` (button element) and `ButtonLink` (anchor) through the layer public API, and every text call-to-action in the app MUST render that primitive instead of a bare `<button>` with call-site styling. Appearance MUST be owned by the primitive and its stylesheet, so restyling every button is a single-module change.

#### Scenario: single-owned-primitive

- **WHEN** a developer needs a button anywhere in the app
- **THEN** they import `Button` or `ButtonLink` from `~/src/shared/ui`
- **AND** the module lives in its own kebab-case folder with a public `index.ts`

#### Scenario: icon-passed-from-call-site

- **WHEN** a button needs a glyph
- **THEN** the call site passes it through the `icon` prop and selects the side with `iconPosition` (`'left'` default)
- **AND** the primitive renders the glyph on that side of the label without baking any specific icon into the primitive

#### Scenario: no-ad-hoc-cta-styling

- **WHEN** the app is searched for text call-to-action elements
- **THEN** they render the shared primitive and its variants
- **AND** no per-feature CSS rule re-declares button background, border, radius, or padding

### Requirement: button-variants

The primitive MUST expose three variants: `solid` (accent fill, high-intent CTA), `outline` (transparent fill with a structure border, the default), and `stark` (structure fill with an on-primary label).

#### Scenario: solid-variant

- **WHEN** a button renders with `variant="solid"`
- **THEN** its fill is `--color-accent` with an `--color-on-accent` label
- **AND** hover fills with `--color-primary` and an `--color-on-primary` label

#### Scenario: outline-variant

- **WHEN** a button renders with `variant="outline"` or no variant
- **THEN** its fill is transparent with a 1px structure border in the inherited/primary color
- **AND** hover fills with `--color-primary` and an `--color-on-primary` label

#### Scenario: stark-variant

- **WHEN** a button renders with `variant="stark"`
- **THEN** its fill is `--color-primary` with an `--color-on-primary` label
- **AND** hover fills with `--color-accent` and an `--color-on-accent` label

### Requirement: button-sizes

The primitive MUST expose a default call-to-action size (44px minimum height, label type step) and a compact `sm` size (32px minimum height, label-sm type step) used by utility controls. An icon-only button MUST render as a square with equal padding, and a control whose label collapses to icon-only at a breakpoint MUST use the same padding.

#### Scenario: default-cta-size

- **WHEN** a button renders without a size class
- **THEN** its hit area is at least 44px tall
- **AND** its label uses the label type step

#### Scenario: compact-size

- **WHEN** a button renders with the `sm` size
- **THEN** its minimum height is 32px and its label uses the label-sm type step
- **AND** icon-only `sm` controls render as a square with `--space-sm` padding on the icon token

#### Scenario: collapsed-label-control

- **WHEN** a control with the collapse modifier hides its label below a breakpoint
- **THEN** its padding becomes `--space-sm`, identical to the icon-only controls
- **AND** the padding is owned by the primitive, not redeclared per call site

### Requirement: button-radius-token

The button corner radius MUST come from `radius.button` (emitted as `--radius-button`), so a preset or `design.radius` override changes it without code edits. Under the 70/20/10 system the token resolves to `0`.

#### Scenario: radius-emitted-as-css-var

- **WHEN** the active theme resolves
- **THEN** the button radius is emitted as `--radius-button`
- **AND** the static stylesheet carries the same default for pre-JS render

#### Scenario: zero-radius-default

- **WHEN** the minimal preset is active
- **THEN** `--radius-button` resolves to `0`

### Requirement: button-link-parity

`ButtonLink` MUST render the identical appearance and behaviour to `Button` — same variants, sizes, radius, and icon API — while navigating: internal hrefs MUST render a router `Link` (client navigation + prefetch) and external hrefs MUST render a plain anchor.

#### Scenario: internal-href-uses-router-link

- **WHEN** a `ButtonLink` receives an internal href (`/…` or `./…`)
- **THEN** it renders a router `Link` with prefetch
- **AND** it is still an anchor to assistive technology

#### Scenario: external-href-stays-anchor

- **WHEN** a `ButtonLink` receives an external href
- **THEN** it renders a plain `<a>` element

### Requirement: button-motion-accessibility

The primitive MUST keep a visible keyboard focus indicator, communicate disabled state, and respect `prefers-reduced-motion`.

#### Scenario: focus-is-visible

- **WHEN** a button receives keyboard focus
- **THEN** a 2px focus ring in `--color-ring` is drawn with a 2px offset

#### Scenario: disabled-state

- **WHEN** a button is disabled
- **THEN** it renders at reduced opacity with a `not-allowed` cursor
- **AND** hover does not paint a fill

#### Scenario: reduced-motion

- **WHEN** the user prefers reduced motion
- **THEN** button transitions collapse while the surface and focus ring remain
