# Theme Capability — Delta

## ADDED Requirements

### Requirement: header-composition

The Theme MUST render the storefront header as one sticky bar on the canvas surface with a 1px structure bottom rule and an inner container capped at the layout container max. The bar MUST carry three zones — brand, navigation, and utilities (search, account, bag) — whose order changes by viewport.

#### Scenario: desktop-composition

- **WHEN** the header renders at or above the medium breakpoint
- **THEN** the brand sits at the leading edge
- **AND** the primary navigation is centered
- **AND** the search, account, and bag controls sit at the trailing edge in that order

#### Scenario: mobile-composition

- **WHEN** the header renders below the medium breakpoint
- **THEN** the menu toggle sits at the leading edge
- **AND** the brand follows it and truncates with an ellipsis when the shop name is long
- **AND** the search, account, and bag controls sit at the trailing edge
- **AND** the account label collapses so the control is icon-only below the small breakpoint

#### Scenario: technical-typography

- **WHEN** the header renders
- **THEN** the brand and navigation labels render in the mono font family, uppercase
- **AND** the brand uses the label-lg type step and the navigation uses the label-sm step

#### Scenario: compact-utility-controls

- **WHEN** a header utility control renders
- **THEN** it uses the shared button primitive at its compact size
- **AND** its icon is the 16px icon token, thin weight under the minimal preset and bold under playful
- **AND** the control has an accessible name, `cursor: pointer`, and a visible focus ring

#### Scenario: account-control

- **WHEN** the header renders
- **THEN** an account control links to `/account`
- **AND** its label is visible at or above the small breakpoint and hidden below it
- **AND** when hidden, the control is an icon-only square with the same padding as the other icon controls

#### Scenario: bag-control

- **WHEN** the bag control renders
- **THEN** it uses the shared button primitive's `stark` variant with the `ShoppingCart` glyph and a `Bag` label
- **AND** it shows a two-digit accent count badge only when the cart has items
- **AND** the badge is hidden when the count is zero

#### Scenario: header-responsive-no-overflow

- **WHEN** the header renders at 375, 768, 1024, and 1440 pixel viewports
- **THEN** the correct zone order shows for that viewport
- **AND** the brand truncates rather than causing horizontal overflow
