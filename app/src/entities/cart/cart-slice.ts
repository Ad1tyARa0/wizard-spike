import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type CartLineVM, type CartVM, EMPTY_CART } from './model';

/**
 * Client cart state. The server (Storefront API via Hydrogen) is the source
 * of truth; this slice holds the optimistic view-model that listener
 * middleware reconciles with server responses.
 *
 * FSD: entities/cart — owns the cart domain model + slice.
 */
export interface CartState extends CartVM {}

const initialState: CartState = EMPTY_CART;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /** Replace the whole cart with a server-fetched cart (hydration/bridge). */
    cartHydrated(state, action: PayloadAction<CartVM>) {
      state.id = action.payload.id;
      state.lines = action.payload.lines;
      state.totalQuantity = action.payload.totalQuantity;
      state.subtotal = action.payload.subtotal;
      state.status = 'idle';
      state.error = undefined;
    },
    /** Record the server cart id (also triggers persistence via listener). */
    cartIdSet(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    /** Optimistic add: merge by merchandiseId or append a new line. */
    cartLineAdded(state, action: PayloadAction<CartLineVM>) {
      const existing = state.lines.find((l) => l.merchandiseId === action.payload.merchandiseId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.lines.push(action.payload);
      }
      state.totalQuantity = state.lines.reduce((sum, l) => sum + l.quantity, 0);
      state.status = 'syncing';
      state.error = undefined;
    },
    /** Optimistic quantity change. */
    cartLineQuantityChanged(state, action: PayloadAction<{ key: string; quantity: number }>) {
      const line = state.lines.find((l) => l.key === action.payload.key);
      if (!line) {
        return;
      }
      line.quantity = action.payload.quantity;
      state.totalQuantity = state.lines.reduce((sum, l) => sum + l.quantity, 0);
      state.status = 'syncing';
      state.error = undefined;
    },
    /** Optimistic removal. */
    cartLineRemoved(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.key !== action.payload);
      state.totalQuantity = state.lines.reduce((sum, l) => sum + l.quantity, 0);
      state.status = 'syncing';
      state.error = undefined;
    },
    /** Server confirmed the cart — replace optimistic state. */
    cartSyncSucceeded(state, action: PayloadAction<CartVM>) {
      state.id = action.payload.id ?? state.id;
      state.lines = action.payload.lines;
      state.totalQuantity = action.payload.totalQuantity;
      state.subtotal = action.payload.subtotal;
      state.status = 'idle';
      state.error = undefined;
    },
    /** Server rejected the operation — surface error, keep last known cart. */
    cartSyncFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  cartHydrated,
  cartIdSet,
  cartLineAdded,
  cartLineQuantityChanged,
  cartLineRemoved,
  cartSyncSucceeded,
  cartSyncFailed,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// ---- Selectors ----
export const selectCart = (state: { cart: CartState }): CartState => state.cart;
export const selectCartLines = (state: { cart: CartState }) => state.cart.lines;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartSubtotal = (state: { cart: CartState }) => state.cart.subtotal;
export const selectCartStatus = (state: { cart: CartState }) => state.cart.status;
