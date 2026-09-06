# Header Suspense Skeleton — Tasks

## Spec

- [x] Add `header-loading-state` requirement (whole-header skeleton, no isolated per-control skeletons)
- [x] Add `skeleton-primitives` requirement (reusable block / icon / row primitives)

## Implementation

- [x] Defer the header query in `app/root.tsx` (moved from `loadCriticalData` to `loadDeferredData`, kept `CacheLong()` + error-tolerant catch)
- [x] Reusable skeleton primitives in `app/src/shared/ui/skeleton.tsx` (`Skeleton`, `SkeletonIcon`, `SkeletonRow`) + export from `shared/ui/index.ts`
- [x] `HeaderSkeleton` (`app/src/widgets/header-skeleton.tsx`) composed from the primitives: logo row, nav row, search + cart icon blocks (plus the mobile menu block)
- [x] `app/src/widgets/page-layout.tsx`: whole header gated on hydration via `<ClientOnly fallback={<HeaderSkeleton />}>` wrapping `<Suspense fallback={<HeaderSkeleton />}>` + `<Await>`
- [x] `app/src/widgets/header.tsx`: removed the isolated cart-only skeleton (no `ClientOnly` around `CartToggle` — the whole header is client-gated)
- [x] Skeleton CSS in `app/src/shared/styles/app.css`: `.skeleton` primitives (secondary token, pulse scaled off `--duration-base`) + `.header-skeleton` zone-mirroring rules; reduced-motion collapses the pulse via the global rule
- [x] Skeleton sizing per design review: icon blocks 36px, rows 32px (all vertically centered); desktop nav row spans 50% of the header width

## Verification

- [x] `bun run typecheck` clean (prop types for deferred header)
- [x] `bun run lint` clean
- [x] `bun test` passes
- [x] Prettier clean on changed files
- [ ] Visual check: whole header shows as a skeleton (logo row, nav row, search + cart blocks) until hydration, then swaps in with no height jump; no isolated cart block; `prefers-reduced-motion` shows a static skeleton
