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
  cartReducer,
  cartSyncFailed,
  cartSyncSucceeded,
  selectCart,
  selectCartLines,
  selectCartStatus,
  selectCartSubtotal,
  selectCartTotalQuantity,
} from './cart-slice';
export type { CartState } from './cart-slice';
export { EMPTY_CART, cartLineFromVariant } from './model';
export type { CartLineVM, CartVM, Money, VariantLike } from './model';
