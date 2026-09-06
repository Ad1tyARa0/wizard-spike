# Cart Capability — Delta

## ADDED Requirements

### Requirement: cart-drawer-motion

The Cart MUST open the drawer with a smooth ease-in transition driven by the theme's motion tokens, so that the animation stays consistent and updateable when the theme preset or config overrides change.

#### Scenario: drawer-ease-in-open

- **WHEN** a shopper opens the cart drawer
- **THEN** the drawer panel eases in from the right edge of the viewport
- **AND** the backdrop fades in behind it
- **AND** both use the theme's motion duration and easing tokens rather than hardcoded values

#### Scenario: drawer-motion-token-driven

- **WHEN** a theme preset or config override changes the motion tokens
- **THEN** the cart drawer transition uses the updated duration and easing without any code edits

#### Scenario: drawer-reduced-motion

- **WHEN** the user's system requests reduced motion
- **THEN** the cart drawer and backdrop appear without animation
