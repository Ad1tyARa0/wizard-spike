# Infinite Scroll — Tasks

## Spec

- [ ] Add the `infinite-scroll-pagination` requirement to the Catalog capability (this change's delta)

## Shared primitive

- [ ] `shared/lib/use-intersection-observer.ts` — framework-agnostic hook: observes a ref, fires when the target intersects (options: `rootMargin`, `threshold`), disconnects on unmount; no React Router/Hydrogen imports
- [ ] Export from `shared/lib` public API

## Widget

- [ ] `widgets/paginated-resource-section/paginated-resource-section.tsx` — add an `infinite?: boolean` prop (default `false` = existing button pagination)
- [ ] In `infinite` mode: accumulate nodes in local state (initial `connection.nodes` + appended pages)
- [ ] Render the loading trigger as `<a href={nextPageUrl}>` where `nextPageUrl` is the next cursor page (`?cursor=<endCursor>&direction=next`) — real link for crawler/no-JS fallback
- [ ] Observe the anchor with `useIntersectionObserver`; when it intersects and `hasNextPage` and not loading, run the same activation handler a click/Enter runs
- [ ] Activation handler: `preventDefault()` → `useFetcher` load the next cursor → append the returned connection's nodes → update `endCursor` + `hasNextPage`; with JS off the `href` navigates normally
- [ ] Loading spinner while `fetcher.state !== 'idle'`; visually-hidden `aria-live="polite"` status region announces loading + completion; hide anchor when `!hasNextPage`
- [ ] The widget needs to map a fetcher response back to the connection — add a minimal `loadMore` prop so each route supplies its own loader-shape extraction; keep the widget otherwise generic

## Routes

- [ ] `routes/collections/all.tsx` — opt in with `infinite` + `loadMore`
- [ ] `routes/collections/$handle.tsx` — opt in with `infinite` + `loadMore`

## Verification

- [ ] `bun run typecheck` clean
- [ ] `bun run lint` clean (oxlint + FSD boundaries + filenames)
- [ ] `bun test` passes (existing 43 + any new assertions)
- [ ] `bun run lint:circular` — no circular dependency
- [ ] `bun run check:specs` passes; this change's `spec.md` matches the requirement/scenario grammar
- [ ] Manual: on `/collections/all` with >8 products, scrolling auto-loads and appends; tab reaches the anchor and Enter loads; the anchor `href` navigates with JS disabled; end-of-list hides the trigger
