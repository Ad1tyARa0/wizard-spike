# CSS Capability

## Purpose

Defines how stylesheets in the storefront are authored: class naming, token usage, specificity, layout, units, responsiveness, organization, and accessibility. It adapts the `css` skill's general guidelines to this repo (70/20/10 design system, kebab-case naming, config-driven tokens) so future agents and reviewers can keep the CSS consistent and maintainable. CSS for a module lives with that module as described here; the tokens themselves are owned by the Theme capability.

## Requirements

### Requirement: class-naming-convention

CSS class names MUST be lowercase kebab-case. Block and element names use hyphens (e.g. `.product-item`, `.header-logo`), and variants use a `--` modifier (e.g. `.btn--solid`). IDs MUST NOT be used for styling (reserved for JS hooks and fragment links), and states expressed in CSS MUST use attributes or modifier classes rather than new element/ID selectors.

#### Scenario: new-class-added

- **WHEN** a developer adds a class for a component or element
- **THEN** the class name is lowercase kebab-case with hyphens (or a `--` variant), matching the surrounding block's naming

#### Scenario: id-selector-rejected

- **WHEN** a rule targets an element by ID for styling
- **THEN** review rejects it and the rule is rewritten as a class or attribute selector

#### Scenario: state-via-attribute

- **WHEN** a component has a state (selected, available, current)
- **THEN** the state is expressed with a `data-*` attribute or `[aria-*]`/`[aria-current]` selector, not a bespoke ID

### Requirement: design-tokens-only

Every visual value (color, font, type size, spacing, radius, motion, icon size, breakpoint) MUST come from the central token set, referenced as a CSS custom property (e.g. `var(--color-primary)`, `var(--space-4)`). Stylesheets MUST NOT hard-code brand colors, font families, radii, or shadow values; the minimal preset is zero-radius and shadow-free.

#### Scenario: new-rule-uses-tokens

- **WHEN** a rule sets a color, spacing, type, radius, or motion value
- **THEN** it references a `var(--…)` token rather than a literal

#### Scenario: hardcoded-brand-color-rejected

- **WHEN** a stylesheet hard-codes a brand color (e.g. `#20242B`, `black`) instead of `var(--color-…)`
- **THEN** review flags it and it is replaced with the token

#### Scenario: token-scale-extended-not-inlined

- **WHEN** a needed value is missing from the scale
- **THEN** a token is added to the token set (theme-types + presets + tokens.css) rather than inlining the literal

### Requirement: low-specificity

Rules MUST keep specificity to a single class (0-1-0) where possible, MUST NOT use `!important` except for a documented global exception, and MUST NOT rely on deep descendant chains or element selectors when a class would do. The only permitted `!important` uses are: the global zero-radius/no-shadow reset, overriding Hydrogen `<Image>`'s inline `aspect-ratio`, and the `prefers-reduced-motion` duration collapse.

#### Scenario: single-class-selector

- **WHEN** a component style is authored
- **THEN** it is reachable with one class selector (plus optional `:hover`/`:focus-visible`/`[data-*]`), not a descendant or element chain

#### Scenario: new-important-rejected

- **WHEN** a change introduces `!important` outside the documented exceptions
- **THEN** review rejects it and the rule is restructured to win on specificity or source order

### Requirement: layout-primitives

Layouts MUST use Flexbox for one-dimensional and Grid for two-dimensional arrangement, MUST use the `gap` property (not sibling margins) for spacing between items, and SHOULD use logical properties (`margin-inline`, `padding-block`, `inset`) for direction-agnostic spacing. Element selectors are reserved for base/reset styles.

#### Scenario: flex-or-grid-for-layout

- **WHEN** a set of items is arranged in a row, column, or grid
- **THEN** the container uses `display: flex`/`grid` with `gap`, not floated or margin-spaced children

#### Scenario: gap-over-sibling-margins

- **WHEN** adjacent flex/grid items need separation
- **THEN** the spacing is set with `gap` on the container rather than a margin on each child

### Requirement: units-and-typography

Typography sizes MUST use `rem` (or `clamp()` for fluid type); pixel values are reserved for borders, hairlines, and fixed control geometry via tokens. Font families MUST come from the token set (`--font-display`, `--font-body`, `--font-mono`).

#### Scenario: relative-font-size

- **WHEN** a rule sets `font-size`
- **THEN** it uses `rem` or `clamp()` (never `px`)

#### Scenario: fluid-display-type

- **WHEN** a heading or statement scales with the viewport
- **THEN** it uses a `clamp()` token from the type scale

### Requirement: mobile-first-responsive

Media queries MUST be authored mobile-first using `min-width`, collapsing to a single column at narrow widths before adding columns. Breakpoints MUST correspond to the tokens in the responsive scale (375, 640, 768, 1024, 1440, 1920), and layouts MUST be verified with no horizontal overflow at each.

#### Scenario: min-width-media-query

- **WHEN** a layout changes at a breakpoint
- **THEN** the base rule is the mobile layout and the change is added in a `@media (min-width: …)` block

#### Scenario: no-horizontal-overflow

- **WHEN** a page is rendered at 375, 768, 1024, 1440, and 1920px
- **THEN** no element causes horizontal scroll

### Requirement: stylesheet-organization

Stylesheets MUST be organized into commented sections (base, layout, components, utilities) and kept modular — global tokens in `tokens.css`, resets in `reset.css`, component/layout rules in `app.css` (or a co-located module stylesheet). Property declarations SHOULD follow a consistent order within a rule, and non-obvious rules MUST carry a short comment explaining why.

#### Scenario: sectioned-stylesheet

- **WHEN** a stylesheet grows beyond base rules
- **THEN** its rules are grouped under section banner comments so a reader can navigate it

#### Scenario: modular-files

- **WHEN** a new style area is added
- **THEN** it lives in the appropriate stylesheet (tokens, reset, or component/layout) rather than an inline `<style>` element

### Requirement: inline-style-boundary

Presentational styles MUST live in stylesheets, not inline `style` attributes. Inline styles are permitted only for genuinely dynamic, data-driven values that cannot be expressed as a class (e.g. a product colour swatch, a computed width), and the static parts of such elements MUST still use classes.

#### Scenario: static-style-rejected

- **WHEN** a component writes a static colour, border, or spacing inline
- **THEN** review moves it to a stylesheet class

#### Scenario: dynamic-value-allowed

- **WHEN** a value is data-driven (user option, computed measurement)
- **THEN** it MAY be applied inline, scoped to that element

### Requirement: accessibility-in-css

CSS MUST provide sufficient color contrast (WCAG AA, 4.5:1 for normal text), a visible `:focus-visible` indicator on every interactive control, and a `prefers-reduced-motion` path that removes non-essential motion. Content MUST NOT be hidden in ways that remove it from the accessibility tree unless an accessible name is provided separately.

#### Scenario: focus-visible-present

- **WHEN** a keyboard user tabs to a control
- **THEN** a visible focus ring drawn from `--color-ring` is shown

#### Scenario: reduced-motion-respected

- **WHEN** the user prefers reduced motion
- **THEN** animations and transitions collapse while the static layout and focus styles remain

#### Scenario: visually-hidden-keeps-a-name

- **WHEN** a control's visible label is hidden at a breakpoint
- **THEN** the control still exposes an accessible name (e.g. `aria-label`)
