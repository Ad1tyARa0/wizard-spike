# Header Suspense Skeleton

## Why

The store owner noticed a slight delay before the header/cart area appears and assumed an API call is blocking it. Two real causes exist:

1. The header query (`HEADER_QUERY`) is **awaited critical data** in the root loader — the whole page (including the header and the cart icon's slot) waits on the Storefront API before first paint.
2. The cart toggle is rendered inside `ClientOnly`, so the cart icon only appears after client hydration.

The first iteration deferred the header query behind a Suspense skeleton, but with fast/cached data the whole-header skeleton was rarely visible — leaving only the **isolated cart-icon skeleton** (the `ClientOnly` fallback) on screen, which the owner found awkward. This iteration makes the WHOLE header skeletonize as one coherent unit and extracts reusable skeleton primitives.

## What Changes

- The root loader defers the header query (moved from critical to deferred data, same `CacheLong()` caching, error-tolerant like the footer query).
- The whole header is gated on hydration: `PageLayout` renders `HeaderSkeleton` until the client hydrates AND the header data resolves, then swaps in the real header — no isolated per-control skeletons (the `ClientOnly`-only cart skeleton is removed).
- `HeaderSkeleton` is composed of a logo row, a nav row, and icon blocks for the search + cart controls (plus the mobile menu block), mirroring the header's three-zone grid and 64px height so the swap has no layout shift.
- New reusable skeleton primitives in `shared/ui/skeleton.tsx`: `Skeleton` (block), `SkeletonIcon` (44px slot), `SkeletonRow` (bar) — token-styled (secondary background, pulse scaled off the theme's base duration), reduced-motion-safe, reusable by any future loading state in the app.
- `Footer` (which reads the header's primary domain) awaits the now-deferred header.

## Impact

- The loading state is a coherent whole-header skeleton instead of a lone cart block; the real header swaps in without height jump.
- Skeleton primitives are reusable across the app (product grids, sections, etc.) without re-implementing styling.
- Tradeoff: the header renders post-hydration (it was already deferred, so this does not regress first-paint vs. the prior iteration); the nav links leave the very first HTML stream, mitigated by the same nav in the footer and `CacheLong()` caching.
