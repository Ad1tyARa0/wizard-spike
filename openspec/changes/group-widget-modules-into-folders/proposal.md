# Group Widget and UI Modules into Folders

## Why

The `widgets/` and `shared/ui/` layers are flat, while `features/` and `entities/` already use the module-per-folder convention (folder + public `index.ts`). Related files have drifted apart at the layer root — e.g. `header.tsx` and `header-skeleton.tsx` are siblings but belong together, and the four cart widgets (`cart-main`, `cart-line-item`, `cart-summary`, `cart-types`) sit loose at the root. The store owner asked to group similar files into folders and to make the convention a remembered frontend-architecture rule so every agent follows it.

## What Changes

- Every module in `widgets/` moves into its own kebab-case folder with a public `index.ts`:
  - `widgets/header/` — `header.tsx`, `header-skeleton.tsx`
  - `widgets/cart/` — `cart-main.tsx`, `cart-line-item.tsx`, `cart-summary.tsx`, `cart-types.ts`
  - `widgets/footer/`, `widgets/marquee/`, `widgets/mock-shop-notice/`, `widgets/page-layout/`, `widgets/paginated-resource-section/`, `widgets/product/`
- Every module in `shared/ui/` moves into its own kebab-case folder with a public `index.ts`:
  - `shared/ui/aside/`, `shared/ui/client-only/`, `shared/ui/product/` (`product-image` + `product-price`), `shared/ui/skeleton/`, `shared/ui/sticker-hover/`, `shared/ui/theme/` (`theme-switcher`)
- Top-level barrels (`widgets/index.ts`, `shared/ui/index.ts`) re-export the folders; all external imports keep going through them (public API unchanged).
- Intra-layer relative imports are updated for the new depth.
- The convention becomes a rule in `docs/architecture.md` + `AGENTS.md` and a `module-folder-organization` requirement in the architecture spec.

## Impact

- All four `src/` layers follow the same module-per-folder convention — a crisp rule agents can follow without judgment calls.
- Public API unchanged: `~/src/widgets` and `~/src/shared/ui` still export the same surface, so routes/features are untouched.
- FSD checks unaffected (widgets/shared are single-slice layers; the checker classifies by first path segment).
