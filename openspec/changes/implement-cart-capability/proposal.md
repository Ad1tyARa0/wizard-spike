# Implement Cart Capability

## Why

The Cart capability spec describes optimistic line management, persistence,
summary, and a drawer — all currently unimplemented. The scaffolded Hydrogen
skeleton ships a server-rendered cart page with server actions, but no Redux
view-model, no listener-driven reconciliation, and no drawer. This change
builds the client cart foundation on the chosen stack (Redux Toolkit +
createListenerMiddleware) and bridges it to Hydrogen's server cart.

## What Changes

- Cart spec gains `server-cart-bridge` (hydration, optimistic ops reconciled
  through listener middleware, failure rollback) and `drawer-server-integration`
  (server-confirmed totals + checkout handoff) requirements.
- Implemented foundation (this change):
  - `entities/cart`: cart view-model (`model.ts`) + slice (`cartSlice.ts`)
    with `cartHydrated`, optimistic line ops, `cartSyncSucceeded/Failed`.
  - `app`: Redux store (`store.ts`) + listener middleware
    (`listenerMiddleware.ts`) persisting the cart id to localStorage.
  - `features/cart-drawer`: UI model, `CartDrawer`, `CartToggle`
    (client-only, accessible dialog).
- Remaining work (tracked in tasks.md): wire the drawer into the header and
  root, bridge server cart data into the slice, route the drawer's add/update
  flows through Hydrogen server actions, and verify against mock.shop.

## Impact

- Cart state becomes testable in isolation (pure slice + selectors).
- Listener middleware becomes the single place for cart side effects
  (persistence today, server reconciliation next).
- The drawer gives the storefront its first Exaggerated Minimalism surface
  and the cart page remains fully functional meanwhile.
