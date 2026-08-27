# Implement Cart Capability — Tasks

## Client cart foundation (done in this change)

- [x] `entities/cart/model.ts` — CartVM / CartLineVM / Money types
- [x] `entities/cart/cartSlice.ts` — hydration, optimistic line ops, sync success/failure, selectors
- [x] `app/store.ts` — configureStore with cart + cartDrawer reducers, listener middleware prepended
- [x] `app/listenerMiddleware.ts` — cart-id persistence to localStorage
- [x] `features/cart-drawer/model.ts` — drawer open/close slice
- [x] `features/cart-drawer/CartDrawer.tsx` — accessible client-only drawer (dialog role, Esc, focus, scroll lock, empty state, totals)
- [x] `features/cart-drawer/CartToggle.tsx` — client-only trigger with live count
- [ ] Mount `<CartToggle />` in the header and `<CartDrawer />` in the root (client-only)

## Server bridge (next step, tracked here)

- [ ] Dispatch `cartHydrated` from the cart route loader with the server cart
- [ ] Recover persisted cart id on boot (localStorage → server cart lookup)
- [ ] Route drawer add/update/remove through Hydrogen server actions with optimistic updates
- [ ] On action failure, roll back to the last server-confirmed cart (`cartSyncFailed` + re-hydrate)
- [ ] Surface server-provided checkout URL in the drawer footer; fall back to `/cart`

## Verification

- [ ] `bun run typecheck` clean
- [ ] Add flow works end-to-end against mock.shop (add → drawer updates → totals match server cart)
- [ ] Persistence: cart survives reload via stored cart id
- [ ] `bun run lint` clean
- [ ] Archive this change once the server bridge ships
