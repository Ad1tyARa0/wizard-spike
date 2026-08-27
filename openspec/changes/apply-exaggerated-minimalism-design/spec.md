# Theme Capability — Delta

## ADDED Requirements

### Requirement: visual-design-language

The Theme MUST implement the Exaggerated Minimalism design language: a black/white dominant palette with exactly one accent color, oversized statement typography, and extreme whitespace, as defined by the design system master file.

#### Scenario: statement-typography

- **WHEN** a hero or statement section renders
- **THEN** it uses the giant display type token `clamp(3rem, 10vw, 12rem)` at weight 900 with tight tracking

#### Scenario: single-accent-palette

- **WHEN** any view renders
- **THEN** the palette is black and white plus exactly one accent color with no secondary accent

#### Scenario: extreme-whitespace

- **WHEN** a section renders
- **THEN** section padding is at least the huge spacing token (`8rem`) wherever the layout allows

### Requirement: design-usability-guardrails

The Theme MUST keep e-commerce usability intact under Exaggerated Minimalism: product information stays legible, forms remain accessible, contrast meets 4.5:1, focus states are visible, and reduced-motion preferences are honored.

#### Scenario: product-information-legible

- **WHEN** a product card or product page renders
- **THEN** title, price, and variant information remain legible at body size with 4.5:1 contrast

#### Scenario: forms-accessible

- **WHEN** a form control renders
- **THEN** it has a visible label and a focus ring derived from the accent token

#### Scenario: reduced-motion-honored

- **WHEN** the user requests reduced motion
- **THEN** reveal and transition animations are disabled and content renders in its final state
