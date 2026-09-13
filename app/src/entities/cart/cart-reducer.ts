/**
 * Cart capability — Redux reducer (FSD: entities/cart).
 *
 * Client cart state. The server (Storefront API via Hydrogen) is the source
 * of truth; this slice holds the optimistic view-model that listener
 * middleware reconciles with server responses. The slice owns no actions of
 * its own — every case comes from `cart-actions.ts` via `extraReducers`.
 */
import { createSlice } from '@reduxjs/toolkit';
import {
  cartHydrated,
  cartIdSet,
  cartLineAdded,
  cartLineQuantityChanged,
  cartLineRemoved,
  cartSyncFailed,
  cartSyncSucceeded,
} from './cart-actions';
import { EMPTY_CART, type CartState } from './model';

const initialState: CartState = EMPTY_CART;

/** Recompute the cart's total quantity from its lines (single source of truth). */
function recountTotal(state: CartState) {
  state.totalQuantity = state.lines.reduce((sum, line) => sum + line.quantity, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartHydrated, (state, action) => {
        state.id = action.payload.id;
        state.lines = action.payload.lines;
        state.totalQuantity = action.payload.totalQuantity;
        state.subtotal = action.payload.subtotal;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(cartIdSet, (state, action) => {
        state.id = action.payload;
      })
      .addCase(cartLineAdded, (state, action) => {
        const existing = state.lines.find((l) => l.merchandiseId === action.payload.merchandiseId);
        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          state.lines.push(action.payload);
        }
        recountTotal(state);
        state.status = 'syncing';
        state.error = undefined;
      })
      .addCase(cartLineQuantityChanged, (state, action) => {
        const line = state.lines.find((l) => l.key === action.payload.key);
        if (!line) {
          return;
        }
        line.quantity = action.payload.quantity;
        recountTotal(state);
        state.status = 'syncing';
        state.error = undefined;
      })
      .addCase(cartLineRemoved, (state, action) => {
        state.lines = state.lines.filter((l) => l.key !== action.payload);
        recountTotal(state);
        state.status = 'syncing';
        state.error = undefined;
      })
      .addCase(cartSyncSucceeded, (state, action) => {
        state.id = action.payload.id ?? state.id;
        state.lines = action.payload.lines;
        state.totalQuantity = action.payload.totalQuantity;
        state.subtotal = action.payload.subtotal;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(cartSyncFailed, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;
