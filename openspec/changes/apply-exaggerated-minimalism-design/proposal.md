# Apply Exaggerated Minimalism Design Language

## Why

The store owner mandated **Exaggerated Minimalism** (from the ui-ux-pro-max
skill's style catalog) as the design philosophy for the storefront. The design
system's persisted master file (`design-system/e-commerce-website/MASTER.md`)
already documents the language: black/white dominant palette with a single
gold accent, oversized statement typography
(`clamp(3rem, 10vw, 12rem)`, weight 900, `-0.05em` tracking), and extreme
whitespace. This change makes that language an enforceable requirement of the
Theme capability and implements its token foundation.

## What Changes

- Theme spec gains two requirements: `visual-design-language` (the style
  rules) and `design-usability-guardrails` (e-commerce usability under the
  style — legible prices, accessible forms, contrast/focus/reduced-motion).
- The token foundation is implemented as `app/src/shared/styles/tokens.css`
  (CSS custom properties) and `tokens.ts` (typed mirror), consumed by
  `shared/styles/app.css`.
- Components restyle progressively to the language per the master file's
  pre-delivery checklist.

## Impact

- Theme capability becomes testable against concrete style scenarios.
- A single source of truth (MASTER.md + tokens) keeps the design consistent
  across pages; the skill's hierarchical retrieval stays aligned.
- Usability guardrails prevent Exaggerated Minimalism from degrading
  e-commerce core flows (catalog legibility, forms, accessibility).
