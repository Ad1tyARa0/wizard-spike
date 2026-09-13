# Redesign Minimal Home Body — Tasks

## Spec

- [x] Add `home-body-editorial-statement` requirement (this change's delta) and amend `component-theming` with the heading/order scenarios

## Design direction (ui-ux-pro-max)

- [x] Run skill design-system/style queries; confirm locked Exaggerated Minimalism language wins over dataset output (style record `exaggerated-minimalism`, hero-centric landing guidance, subtle scroll-reveal preset)
- [x] Author `design-system/e-commerce-website/home-body-wireframes.html` with Variant A/B/C switchable wireframes (+ mobile snapshots + config mapping)
- [x] User sign-off: **Variant A — Editorial Statement**; Variants B (Inverted Drama) and C (Swiss Hairline) **discarded**
- [x] Reduce the wireframe artifact to the chosen Editorial direction only (B/C removed)
- [x] Persist page-level design decisions in `design-system/e-commerce-website/pages/home.md`; cross-reference in `MASTER.md`

## Implementation

- [x] `app/routes/_index/route.tsx`: restructure hero, featured collection, and recommended products to Variant A markup
  - [x] Editorial index numerals derived from `layout.homeSectionOrder` (never hard-coded)
  - [x] Exactly one `h1` (hero); featured + recommended titles become `h2`s
  - [x] Featured: media link + side column (kicker / title / underline CTA with Phosphor gold arrow); side omitted when no image
  - [x] Recommended: editorial section head (index / title / deferred `NN items` count) + `RecommendedSkeleton` loading grid
- [x] Home "featured collection" block lists that collection's own products under the editorial header (feedback: "no products under Automated Collection heading"):
  - [x] `FEATURED_COLLECTION_QUERY` + generated types now fetch `collection.products(first: 4)`
  - [x] Render those products in the shared hairline editorial grid below the featured header, with graceful empty state
  - [x] Border cleanup (feedback: "too many borders"): hero keeps one bottom hairline; featured products band and recommended use spacing + card separators instead of stacked section rules
- [x] Hero full-bleed media backdrop (feedback: "first page just has text and a giant button"):
  - [x] `content.hero.image` config field (theme types/schema/presets/resolver) — config image wins, then live `shop.brand.coverImage`, then no media
  - [x] Critical loader fetches the shop cover (deferred root header is unusable for hero); passes it into `resolveHeroContent`
  - [x] Viewport-wide centered backdrop (`100vw` breakout + `object-position: center`) so the crop is correct on mobile and ultrawide (feedback: "image doesn't work on other resolutions")
  - [x] Gradient primary-token scrim (stronger top + bottom where text sits) for ≥ 4.5:1 contrast over any photo; text flips to `--color-on-primary`
  - [x] Removed the giant statement from the visual hero; it stays as the accessible `sr-only` `h1` (feedback: "remove the big welcome text")
  - [x] CTA is now **hollow** — transparent fill, thin `1px` `currentColor` border, invert-on-hover; full-width with a stacked foot below 768px
  - [x] Playful preset keeps its wash-band hero (media layer hidden under `[data-theme='playful']`)
- [x] Fix: `hydrogen.config.json` was never read on the worker runtime (`node:fs` unavailable), so merchant copy silently fell back to generic "Welcome"/"Shop now" — the project-root config is now a build-time JSON import in `load-config.ts`, with the explicit-path read kept for tests/tooling
- [x] `app/src/shared/styles/app.css`: Variant A home-body styles
  - [x] Hero: full-viewport image-led hero, optional full-bleed centered media + gradient scrim, meta row, foot (lead + hollow CTA); hairline kept only when there is no photo
  - [x] Featured split `2fr/1fr` (16:9), single-column stack + 4:3 crop below 1100px, products band beneath
  - [x] Recommended: section head styles, hairline-separated grid (1/2/4-up), skeleton card styles — whitespace separation, no section rule lines
  - [x] Marquee quiet editorial band for minimal; loud ✦ Anton band gated to `[data-theme='playful']`
  - [x] Playful-preset reconciliation for the shared markup (`[data-theme='playful']` gating: banded hero without index numerals/media, stacked featured, auto-fit recommended grid)
- [x] Remove orphaned stale `app/src/widgets/Header.tsx` (leftover from the module-folder refactor; the live widget is `widgets/header/header.tsx`) so the filename lint gate passes

## Verification

- [x] `bun run typecheck` clean
- [x] `bun run lint` clean (0 errors, FSD + filenames OK)
- [x] `bun test` passes (37 pass)
- [x] `bun run build` succeeds
- [x] Changed files individually Prettier-clean (repo-wide `format:check` has pre-existing drift in unrelated skill/doc files)
- [ ] Visual check at 375 / 768 / 1024 / 1440 in the browser: hero presence, featured split stacking, recommended 1/2/4-up, no horizontal scroll
