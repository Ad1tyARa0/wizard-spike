/**
 * Cart capability — Redux selectors (FSD: entities/cart).
 *
 * `state` is typed structurally (`{ cart: CartState }`) so the entities layer
 * never imports `RootState` from the app layer.
 */
import type { CartState } from './model';

export const selectCart = (state: { cart: CartState }): CartState => state.cart;
export const selectCartLines = (state: { cart: CartState }) => state.cart.lines;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartSubtotal = (state: { cart: CartState }) => state.cart.subtotal;
export const selectCartStatus = (state: { cart: CartState }) => state.cart.status;
