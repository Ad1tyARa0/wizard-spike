# Infinite Scroll

## Why

Product grids currently paginate only through explicit "Load more" / "Load previous" buttons (Hydrogen `Pagination` inside `widgets/paginated-resource-section`). A modern storefront expects a scroll-driven experience: the next page loads automatically as the visitor reaches the bottom, with no click. This is the first "Discovery & navigation" feature to move past the skeleton baseline, and it should generalize — both product grids (`collections/all` and `collections/$handle`) already reuse the same `PaginatedResourceSection`, so one change covers both.

## What Changes

- **An `infinite` mode on `PaginatedResourceSection`.** The existing button pagination stays as the default and as the no-JS fallback; `infinite` is opt-in.
- **The loading trigger is a real anchor, not a button.** In `infinite` mode the "Load more" control renders as `<a href={nextPageUrl}>` where `nextPageUrl` is the next cursor page (`?cursor=<endCursor>&direction=next`). This keeps deep pages crawler-discoverable and reachable without JavaScript — the same URL the current `NextLink` produces.
- **Scroll auto-activation.** A framework-agnostic `useIntersectionObserver` hook in `shared/lib` watches the anchor; when it scrolls into view and another page exists, the widget activates it programmatically — the same handler a click or Enter runs. Pointer users get true infinite scroll; keyboard and crawler users still reach the anchor.
- **Client-side accumulation via `useFetcher`.** On activation the widget `preventDefault()`s and loads the next cursor with `useFetcher`, appending the returned products to the grid in place — no scroll jump, no lost position. With JS off, the anchor's `href` navigates normally, so pagination still works.
- **Loading + status semantics.** A spinner replaces the anchor while a fetch is in flight, and a visually-hidden `aria-live="polite"` region announces "loading more" and completion to assistive technology. The anchor is hidden once `hasNextPage` is false.
- **Loader unchanged.** The cursor-based loader (`getPaginationVariables`) already returns one page per request; the widget now requests subsequent cursors via `useFetcher` instead of full navigation.

## Impact

- Scroll-driven discovery on both listing and collection pages with no per-route logic.
- Accessibility and SEO preserved by design: the trigger is a real link (keyboard-operable, screen-reader-announced, crawler-followable) that also auto-activates on scroll, and an `aria-live` status reports progress.
- The Storefront query and loader contract are untouched — only the presentation of pagination changes.
- A new reusable primitive (`shared/lib/use-intersection-observer`) becomes available to future infinite/auto-load features.

## Out of scope

- Faceted filtering and sorting (separate catalog capability work).
- Virtualization / windowing of very long lists (not needed at the current page size of 8).
- Any change to the server loader's query or pagination variables.
