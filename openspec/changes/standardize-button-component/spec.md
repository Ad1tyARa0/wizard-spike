# Theme Capability — Delta

## ADDED Requirements

### Requirement: shared-button-primitive

The storefront MUST own exactly one reusable button primitive in the shared UI
layer (`shared/ui/button/`), exposing the layer public API, and every text
call-to-action in the app MUST render that primitive instead of a bare
`<button>` with call-site styling. Appearance MUST be owned by the primitive and
its stylesheet, so restyling every button is a single-module change.

#### Scenario: single-owned-primitive

- **WHEN** a developer needs a button anywhere in the app
- **THEN** they import `Button` or `ButtonLink` from `~/src/shared/ui`
- **AND** the module lives in its own kebab-case folder with a public `index.ts`

#### Scenario: no-ad-hoc-cta-styling

- **WHEN** the app is searched for text call-to-action elements
- **THEN** they render the shared primitive
- **AND** no per-feature CSS rule re-declares button background, border, radius, or padding

#### Scenario: restyle-from-one-place

- **WHEN** the button's appearance changes in the shared primitive
- **THEN** every call site in the app reflects the change with no per-call-site edits

### Requirement: hollow-button-appearance

The button MUST render as a hollow minimal surface: a transparent fill with a
single 1px border in `currentColor`, a 4px corner radius taken from the theme
token (never a per-instance literal or prop), and no shadow — no drop shadow and
no inset highlight — in any state. Its label MUST follow the type system
(uppercase, `--type-label`, `--weight-bold`, `--tracking-label`).

#### Scenario: hollow-at-rest

- **WHEN** a button renders
- **THEN** its background is transparent and its border is 1px in the inherited text color
- **AND** its corner radius is 4px from the theme token

#### Scenario: no-shadow-any-state

- **WHEN** a button is at rest, hovered, focused, pressed, or disabled
- **THEN** the primitive paints no box-shadow, drop shadow, or inset highlight of its own
- **AND** any decoration is composed by a non-minimal preset rather than baked into the primitive

#### Scenario: adapts-to-context

- **WHEN** a button sits on a dark or photographic background that sets an inverted text color
- **THEN** its border and label follow that color without a variant prop

#### Scenario: minimum-target-size

- **WHEN** a button renders
- **THEN** its hit area is at least 44px tall

### Requirement: button-shimmer-animation

The button MUST port the Magic UI shimmer sweep — a blurred spinning
conic-gradient arc whose container slides across the button — as plain CSS with
no Tailwind and no per-instance `<style>` element. The sweep MUST be confined to
a rim that hugs the border, so it reads as a dot travelling along the border:
upstream confines it with an inset copy of its opaque fill, and this port MUST
preserve that confinement while keeping the face hollow (a ring mask). The rim
MUST sit on the border and extend outward from it, and MUST NOT paint inside the
button — an inner line would read as a second border drawn around the label.

The dot MUST be drawn in the border colour by default and MUST fade out at both
ends of its spread, so it reads as a soft floating dot rather than a hard-edged
comet; its colour, size, duration and spread MUST remain overridable.

Hover and focus MUST NOT add a fill, tint or highlight to the button surface —
the dot is the only hover feedback — while the button MUST keep a visible
keyboard focus indicator.

The button MUST expose a `shimmer` prop with three states: `'hover'` (default),
`'always'`, and `'none'`. `'hover'` keeps the animation dormant until the button
is hovered, keyboard-focused, or pressed; `'always'` runs it continuously;
`'none'` never renders it.

#### Scenario: hover-only-default

- **WHEN** a button renders without a `shimmer` prop
- **THEN** no animation is visible at rest
- **AND** the dot becomes visible while hovered

#### Scenario: dot-travels-along-the-border

- **WHEN** a button renders with any shimmer state
- **THEN** the dot hugs the border from outside it, as a band `shimmerSize` (2px default) thick
- **AND** nothing is painted anywhere inside the button — no inner ring around the label and no fill or gradient across the face

#### Scenario: hover-adds-no-surface

- **WHEN** a button is hovered or focused
- **THEN** its surface gains no fill, tint or highlight
- **AND** keyboard focus still draws a visible ring outside the button

#### Scenario: dot-matches-the-border-colour

- **WHEN** a button renders without a `shimmerColor` override
- **THEN** the dot is drawn in the same colour as the border
- **AND** an inverted-context button (hero over media) gets a dot matching its inverted border

#### Scenario: dot-has-a-soft-gradient

- **WHEN** the dot is rendered
- **THEN** it holds a solid core and fades to transparent at both ends of its spread
- **AND** no hard-edged cut is visible at its trailing edge

#### Scenario: always-on-opt-in

- **WHEN** a button renders with `shimmer="always"`
- **THEN** the sweep is visible continuously, without hover

#### Scenario: effect-removable

- **WHEN** a button renders with `shimmer="none"`
- **THEN** no shimmer element or animation is rendered

#### Scenario: keyboard-and-touch-reach-the-effect

- **WHEN** a `'hover'`-mode button receives keyboard focus or is pressed
- **THEN** the sweep becomes visible
- **AND** the shimmer layer stays hidden from assistive technology

#### Scenario: shimmer-is-themeable

- **WHEN** a call site passes `shimmerColor`, `shimmerSize`, `shimmerDuration`, or `background`
- **THEN** those values drive the dot and surface
- **AND** the defaults resolve against theme values (`currentColor`, `--border-width`) rather than hard-coded colors

### Requirement: button-radius-token

The button corner radius MUST be part of the config-driven token set as
`radius.button`, emitted as the `--radius-button` custom property, so a preset or
a `design.radius` override changes it without code edits.

#### Scenario: radius-emitted-as-css-var

- **WHEN** the active theme resolves
- **THEN** the button radius is emitted as `--radius-button`
- **AND** the static stylesheet carries the same default for pre-JS render

#### Scenario: minimal-preset-default

- **WHEN** the `minimal` preset is active
- **THEN** `--radius-button` resolves to `4px`

#### Scenario: preset-overrides-radius

- **WHEN** a preset or `design.radius.button` override changes the value
- **THEN** buttons render at the updated radius with no code edits

### Requirement: button-link-parity

The shared layer MUST expose an anchor form of the button (`ButtonLink`) for
navigational calls-to-action that renders the identical appearance and behavior —
hollow surface, token radius, shimmer prop — and remains a real link (keyboard
and assistive-technology semantics preserved).

#### Scenario: hero-cta-uses-the-primitive

- **WHEN** the home hero renders its call-to-action
- **THEN** it renders `ButtonLink` and looks identical to a `Button`
- **AND** it is still an anchor with an `href`

#### Scenario: page-layout-hooks-survive

- **WHEN** a page needs layout-only adjustments to a button (e.g. full width on mobile, inverted color on media)
- **THEN** it passes `className` and styles layout/color only, not the button's surface

### Requirement: button-motion-accessibility

The shimmer MUST respect motion preferences and the button's interactive states:
`prefers-reduced-motion: reduce` renders the button static, and a disabled button
shows no animation.

#### Scenario: reduced-motion-static

- **WHEN** the user prefers reduced motion
- **THEN** the shimmer is not rendered and no sweep animation runs
- **AND** the button keeps its hollow appearance and hover background feedback

#### Scenario: disabled-shows-no-animation

- **WHEN** a button is disabled
- **THEN** no shimmer sweep is visible
- **AND** the cursor communicates unavailability

#### Scenario: focus-is-visible

- **WHEN** a button receives keyboard focus
- **THEN** a visible focus ring in the theme ring color is drawn outside the button
