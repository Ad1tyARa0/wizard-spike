# Theme Capability — Delta

## ADDED Requirements

### Requirement: header-composition

The Theme MUST render the storefront header as one ultra-minimal bar whose left, center, and right zones reorder by viewport: logo left, navigation centered, and search + cart icon controls on the right at desktop widths; list (menu) icon left, logo centered, and search + cart icon controls on the right at mobile widths. The header MUST contain no account link.

#### Scenario: desktop-composition

- **WHEN** the header renders at a desktop viewport at or above the medium breakpoint
- **THEN** the logo sits at the extreme left of the bar
- **AND** the primary navigation is centered in the bar
- **AND** the search and cart icon controls sit at the extreme right with search immediately left of cart
- **AND** no account link appears in the header

#### Scenario: mobile-composition

- **WHEN** the header renders at a viewport below the medium breakpoint
- **THEN** the list (menu) icon control sits at the extreme left of the bar
- **AND** the logo is centered in the bar
- **AND** the search and cart icon controls sit at the extreme right
- **AND** no account link appears in the header

#### Scenario: mobile-menu-toggle-hidden-on-desktop

- **WHEN** the header renders at a desktop viewport at or above the medium breakpoint
- **THEN** the list (menu) icon control is hidden
- **AND** the desktop zone order (logo · centered nav · search + cart) remains unchanged

#### Scenario: ultra-thin-icons

- **WHEN** the minimal preset is active
- **THEN** every header icon control (menu, search, cart) renders a Phosphor icon at the thin weight

#### Scenario: cart-badge-high-contrast

- **WHEN** the cart has line items
- **THEN** the cart count badge renders as a circle filled with the primary token color
- **AND** the count text renders in the on-primary token color

#### Scenario: cart-icon-renders-shopping-cart

- **WHEN** the header renders
- **THEN** the cart icon control renders the Phosphor `ShoppingCart` glyph at 32px regardless of cart contents

#### Scenario: cart-icon-weight-empty

- **WHEN** the cart has no line items
- **THEN** the cart icon renders at the theme weight (ultra-thin in the minimal preset)

#### Scenario: cart-icon-weight-filled

- **WHEN** the cart has line items
- **THEN** the cart icon renders at the Phosphor fill weight

#### Scenario: header-controls-accessible

- **WHEN** a user tabs to or taps a header icon control
- **THEN** the control has an accessible name
- **AND** the control provides a minimum 44px touch target
- **AND** the control displays `cursor: pointer` and a visible accent focus ring on keyboard focus

#### Scenario: header-responsive-no-overflow

- **WHEN** the header renders at 320, 768, 1024, and 1440 pixel viewports
- **THEN** the bar shows the correct zone order for that viewport
- **AND** no horizontal overflow occurs
