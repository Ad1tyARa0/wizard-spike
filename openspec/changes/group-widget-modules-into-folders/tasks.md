# Group Widget and UI Modules into Folders — Tasks

## Spec

- [x] Add `module-folder-organization` requirement to the Architecture capability (this change's delta)

## Implementation

- [x] Move `widgets/` modules into folders:
  - [x] `widgets/header/` — `header.tsx`, `header-skeleton.tsx`
  - [x] `widgets/cart/` — `cart-main.tsx`, `cart-line-item.tsx`, `cart-summary.tsx`, `cart-types.ts`
  - [x] `widgets/footer/`, `widgets/marquee/`, `widgets/mock-shop-notice/`, `widgets/page-layout/`, `widgets/paginated-resource-section/`, `widgets/product/`
- [x] Move `shared/ui/` modules into folders:
  - [x] `shared/ui/aside/`, `shared/ui/client-only/`, `shared/ui/product/` (image + price), `shared/ui/skeleton/`, `shared/ui/sticker-hover/`, `shared/ui/theme/`
- [x] Add per-folder `index.ts` public APIs
- [x] Rewrite top-level barrels `widgets/index.ts` + `shared/ui/index.ts` to re-export the folders
- [x] Update intra-layer relative imports for the new depth (`../` → `../../`; `./header-skeleton` → `../header`)

## Documentation

- [x] Add the module-folder rule to `docs/architecture.md` (tree + rules) and `AGENTS.md`

## Verification

- [x] `bun run typecheck` clean
- [x] `bun run lint` clean (oxlint + FSD 114 modules + filenames)
- [x] `bun test` passes
- [x] Prettier clean on changed files (docs/architecture.md has pre-existing drift, untouched)
- [x] `bun run build` succeeds
