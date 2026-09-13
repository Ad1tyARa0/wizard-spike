/**
 * FSD public API — entities/cart.
 * External modules may only import from this file, never from internals.
 */
export {
  cartHydrated,
  cartIdSet,
  cartLineAdded,
  cartLineQuantityChanged,
  cartLineRemoved,
  cartSyncFailed,
  cartSyncSucceeded,
  CartActionTypes,
} from './cart-actions';
export { cartReducer } from './cart-reducer';
export {
  selectCart,
  selectCartLines,
  selectCartStatus,
  selectCartSubtotal,
  selectCartTotalQuantity,
} from './cart-selectors';
export { EMPTY_CART, cartLineFromVariant } from './model';
export type { CartLineVM, CartState, CartVM, Money, VariantLike } from './model';
