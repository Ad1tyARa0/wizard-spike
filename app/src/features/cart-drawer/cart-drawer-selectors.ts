/**
 * Cart drawer selectors (FSD: features/cart-drawer). `state` is typed
 * structurally so the features layer never imports `RootState`.
 */
import type { CartDrawerState } from './cart-drawer-reducer';

export const selectCartDrawerOpen = (state: { cartDrawer: CartDrawerState }) =>
  state.cartDrawer.isOpen;
