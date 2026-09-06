# Redesign Minimal Header — Tasks

## Spec

- [x] Add `header-composition` requirement to the Theme capability (this change's delta)

## Implementation

- [x] Restructure `app/src/widgets/header.tsx` into three zones:
  - [x] Desktop zone order: logo (left) → centered nav → search + cart (right)
  - [x] Mobile zone order: list icon (left) → centered logo → search + cart (right)
  - [x] Remove the account ("Sign in / Account") link from the header
  - [x] `SearchToggle` becomes an icon button using `MagnifyingGlass` (thin)
  - [x] Mobile menu toggle uses `List` (thin) instead of the ☰ glyph
  - [x] `CartToggle` accepts an icon `weight` prop; header passes `thin` for the minimal preset, `bold` otherwise (playful)
- [x] Restyle the header in `app/src/shared/styles/app.css`:
  - [x] Three-zone grid (`1fr auto 1fr`) with `grid-template-areas` swapping zones at the `--breakpoint-md` (768px) breakpoint
  - [x] Shared icon-button styles: 44px target, `cursor: pointer`, accent `:focus-visible` ring
  - [x] Remove account-link styling; keep the `chunky` headerStyle variant working
- [x] Document the header composition in `design-system/e-commerce-website/MASTER.md` (Header section)
- [x] Fix desktop leak of the mobile menu toggle: `display: none` at ≥48em was overridden by the later `.header-icon-button { display: inline-flex }` (equal specificity) — scoped the hide to `.header .header-menu-mobile-toggle` so the cascade can't win
- [x] Cart badge restyled: primary-filled circle with on-primary text (black circle / white number in minimal), replacing the gold accent badge
- [x] Cart icon is the single Phosphor `ShoppingCart` glyph at 32px, no state swap; weight flips from the theme weight (ultra-thin in minimal) to the Phosphor `fill` weight when the cart has items — the count badge carries the item count

## Verification

- [x] `bun run typecheck` clean
- [x] `bun run lint` clean
- [x] `bun test` passes
- [ ] `bun run format:check` clean (repo-wide check has pre-existing drift in unrelated files; changed files verified individually)
- [ ] Visual check at 320 / 768 / 1024 / 1440: correct zone order per viewport, no horizontal overflow
