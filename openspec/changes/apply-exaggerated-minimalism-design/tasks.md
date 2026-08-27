# Apply Exaggerated Minimalism Design Language — Tasks

## Token foundation

- [x] Author `app/src/shared/styles/tokens.css` (colors, type, spacing, motion, z-index per MASTER.md)
- [x] Author `app/src/shared/styles/tokens.ts` (typed mirror of the CSS tokens)
- [x] Import `tokens.css` + `drawer.css` from `shared/styles/app.css`
- [x] Load Cormorant + Montserrat via self-hosted `@fontsource-variable/*` (imported in `app.css`; `tokens.{css,ts}` reference `Montserrat Variable` / `Cormorant Variable`)

## Design language in components

- [x] Apply statement typography to hero/section headlines — Home statement hero (`clamp(3rem,10vw,12rem)`, weight 900, `-0.05em`), collection/product titles via `--type-display`
- [x] Restrict palette to black/white + single gold accent (`app.css` uses only tokens; accent reserved for CTAs/focus)
- [x] Apply extreme whitespace (section padding ≥ 96px, hero 8rem, page padding `--space-2xl`)
- [x] Restyle shared UI primitives per MASTER.md (buttons: sharp radius, 1px borders, 150–250ms hover; inputs: 1px black border + accent focus ring; product cards: uppercase labels, tabular prices)
- [x] Style cart drawer + toggle with the design language (`drawer.css`)

## Usability guardrails

- [x] Product titles/prices/forms legible (body 16px, black-on-white, tabular figures)
- [x] Visible focus rings from the accent token on all interactive elements (`:focus-visible` + input/button focus)
- [x] Respect `prefers-reduced-motion` (global reduce in `app.css`)

## Verification

- [x] Pre-delivery checklist on Home, Collection, Product, Cart (statement type, whitespace, single accent, no emoji icons, cursor-pointer, focus, reduced-motion)
- [x] `bun run typecheck` clean · `bun run lint` clean (0 errors) · `bun run format:check` clean
- [ ] Responsive check at 375 / 768 / 1024 / 1440; no horizontal scroll (pending visual QA in browser)
- [ ] Archive this change once the language is applied storefront-wide
