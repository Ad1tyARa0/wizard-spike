# Theme Capability — Delta

## ADDED Requirements

### Requirement: header-loading-state

The Theme MUST render a skeleton for the WHOLE header (logo row, nav row, and search + cart icon blocks) while the header data is pending or the client has not yet hydrated, matching the header's zone layout and height so the real header replaces it without layout shift. It MUST NOT show an isolated skeleton for a single header control.

#### Scenario: skeleton-while-header-loads

- **WHEN** the header data is pending or the client has not yet hydrated
- **THEN** a skeleton placeholder matching the header's zone layout renders in the header's place
- **AND** the placeholder occupies the same height as the header

#### Scenario: whole-header-skeleton

- **WHEN** the header loading state renders
- **THEN** the placeholder contains a logo row, a nav row, and icon blocks for the search and cart controls
- **AND** no isolated skeleton appears for a single control

#### Scenario: header-replaces-skeleton

- **WHEN** the header data resolves and the client has hydrated
- **THEN** the header renders in place of the skeleton with no layout shift

#### Scenario: skeleton-reduced-motion

- **WHEN** the user's system requests reduced motion
- **THEN** the header skeleton renders without animation

### Requirement: skeleton-primitives

The Theme MUST provide reusable skeleton primitives (block, icon, and row variants) in the shared UI layer that any loading state can compose, styled from theme tokens and honoring reduced motion.

#### Scenario: skeleton-primitives-available

- **WHEN** a developer builds a loading state anywhere in the app
- **THEN** they compose it from the shared skeleton primitives (block / icon / row)
- **AND** no loading state re-implements skeleton styling

#### Scenario: skeleton-token-driven

- **WHEN** the theme changes the secondary color or motion tokens
- **THEN** the skeleton primitives render with the updated tokens without code edits
