# Theme Capability — Delta

## ADDED Requirements

### Requirement: icon-size-scale

The Theme MUST provide a predefined icon-size scale (xs / sm / md / lg) in the central token set, and every icon control in the storefront MUST size itself from that scale rather than scattered size literals. The scale MUST be theme-configurable so presets or config overrides can change icon sizes without code edits.

#### Scenario: predefined-scale

- **WHEN** a developer sizes any icon component
- **THEN** the size comes from the xs / sm / md / lg scale in the token set
- **AND** no ad-hoc pixel sizes appear in component code

#### Scenario: header-icons-standardized

- **WHEN** the header renders
- **THEN** the menu (list), search, and cart icon controls all render at the same size (md)

#### Scenario: scale-theme-configurable

- **WHEN** a theme preset or config override changes an icon-size token
- **THEN** icon controls render at the updated size without code edits

#### Scenario: icon-tokens-emitted-as-css-vars

- **WHEN** the active theme resolves
- **THEN** the icon-size tokens are emitted as CSS custom properties (`--icon-sm`, `--icon-md`, `--icon-lg`)
