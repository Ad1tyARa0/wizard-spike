# Theme Capability

## Purpose

The Theme capability is the storefront's headless visual design system and customization surface. Because there is no Shopify Theme Editor, all visual design — colors, typography, spacing, radii, and breakpoints — is expressed as a central token set consumed by themeable shared components, and merchant-facing storefront settings are driven by metafields or a config file rather than code edits. The capability also guarantees token-driven mobile-first layouts that remain usable at common viewport widths, and accessible behavior (color contrast, visible focus states, and prefers-reduced-motion) across every themed component.

## Requirements

### Requirement: design-tokens

The Theme MUST define colors, typography, spacing, radii, and breakpoints as a central token set rather than scattered literals.

#### Scenario: component styles reference tokens

- **WHEN** a developer inspects the styles of any shared component
- **THEN** every color, font size, spacing, radius, and breakpoint value is referenced from the central token set
- **AND** no hard-coded literal values appear in the component's style definitions

#### Scenario: token change propagates site-wide

- **WHEN** a token value is changed in the central token set
- **THEN** every component consuming that token renders with the new value without any further edits

#### Scenario: tokens are available to CSS and TypeScript

- **WHEN** a developer implements a new component
- **THEN** tokens are importable both as CSS custom properties and as typed TypeScript values

### Requirement: component-theming

The Theme MUST make shared UI primitives themeable through tokens, context, or props, with no hard-coded brand colors in component code.

#### Scenario: primitive applies variant styles from tokens

- **WHEN** a consumer renders a shared primitive such as Button with a variant prop
- **THEN** the rendered colors, spacing, and typography come from theme tokens for that variant
- **AND** the component contains no brand color literal

#### Scenario: theme context drives nested primitives

- **WHEN** a shared component tree is wrapped in a ThemeProvider with a given theme
- **THEN** all descendant primitives resolve their styles from that theme's tokens

#### Scenario: missing token falls back to the default theme

- **WHEN** a component references a token key that is missing from the active theme
- **THEN** the component renders using the default theme's fallback value
- **AND** no runtime crash or unstyled output occurs

### Requirement: storefront-customization

The Theme MUST let merchants change visible storefront settings, such as colors, text, or layout options, through metafields or a config file without code edits.

#### Scenario: metafield setting updates the storefront

- **WHEN** a merchant updates a storefront setting metafield on the shop or a resource
- **AND** the loader reads the metafield and passes it to the theme
- **THEN** the storefront renders with the updated setting on the next load without a code deployment

#### Scenario: config file drives settings

- **WHEN** a merchant edits a supported value in the storefront config file
- **THEN** the change is reflected in the rendered storefront once the config is loaded

#### Scenario: missing or malformed setting falls back to the default

- **WHEN** a metafield or config value is missing or malformed
- **THEN** the storefront uses the default theme value for that setting
- **AND** the page still renders without errors

### Requirement: responsive-layout

The Theme MUST produce mobile-first layouts driven by token-defined breakpoints so that all pages remain usable at common viewport widths.

#### Scenario: mobile-first default styles

- **WHEN** a page is rendered at a viewport narrower than the smallest breakpoint
- **THEN** the layout renders single-column mobile-first styles with no horizontal overflow

#### Scenario: breakpoint tokens upgrade the layout

- **WHEN** the viewport crosses a token-defined breakpoint
- **THEN** the layout upgrades to the multi-column arrangement defined for that breakpoint

#### Scenario: all pages usable at common viewport widths

- **WHEN** a page is rendered at common viewport widths such as 320, 768, 1024, and 1440 pixels
- **THEN** interactive elements remain reachable
- **AND** content is not clipped or overlapped

### Requirement: accessibility

The Theme MUST ensure themed components respect color contrast, visible focus states, and prefers-reduced-motion.

#### Scenario: color contrast meets WCAG AA

- **WHEN** any themed component renders text or interactive elements on a background
- **THEN** the contrast ratio between the text and its background meets WCAG AA minimums for the token palette

#### Scenario: visible focus indicator

- **WHEN** a user tabs to an interactive element
- **THEN** the element displays a visible focus ring derived from theme tokens

#### Scenario: reduced motion honored

- **WHEN** the user's operating system reports prefers-reduced-motion
- **THEN** themed animations and transitions are disabled or reduced to non-moving states
