/**
 * FSD public API — features/cart-drawer.
 * External modules may only import from this file, never from internals.
 */
export {
  cartDrawerClosed,
  cartDrawerOpened,
  cartDrawerReducer,
  selectCartDrawerOpen,
} from './model';
export type { CartDrawerState } from './model';
export { CartDrawer } from './cart-drawer';
export { CartToggle } from './cart-toggle';
