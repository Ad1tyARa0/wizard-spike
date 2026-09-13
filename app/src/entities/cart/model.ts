/**
 * Cart domain model — view-model shapes used by the Redux cart slice.
 * Server source of truth: Shopify Storefront API cart object (via Hydrogen
 * server actions / loaders). These types are the client-side projection.
 */

export interface Money {
  amount: string;
  currencyCode: string;
}

/** One line in the client cart view-model. */
export interface CartLineVM {
  /** Server line id, or a temporary client key while optimistic. */
  key: string;
  /** Product variant gid, e.g. gid://shopify/ProductVariant/... */
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  quantity: number;
  unitPrice: Money;
  imageUrl?: string;
  /** Product path (e.g. /products/handle) for line links. */
  url: string;
}

export interface CartVM {
  /** Server cart id (gid). Absent while the cart has not been created. */
  id?: string;
  lines: CartLineVM[];
  totalQuantity: number;
  subtotal: Money;
  status: 'idle' | 'syncing' | 'error';
  error?: string;
}

/** The cart slice's state shape (the view-model plus slice bookkeeping). */
export interface CartState extends CartVM {}

export const EMPTY_CART: CartVM = {
  lines: [],
  totalQuantity: 0,
  subtotal: { amount: '0.00', currencyCode: 'USD' },
  status: 'idle',
};

/**
 * Minimal structural shape of a product variant (Storefront API fragment).
 * Kept structural so entities/product stays the single owner of the real
 * GraphQL fragment types.
 */
export interface VariantLike {
  id: string;
  title: string;
  price?: { amount: string; currencyCode: string } | null;
  image?: { url?: string } | null;
  product?: { title?: string; handle?: string } | null;
}

/** Build an optimistic cart line from a variant for `cartLineAdded`. */
export function cartLineFromVariant(variant: VariantLike, quantity = 1, key?: string): CartLineVM {
  return {
    key: key ?? `optimistic-${variant.id}-${Date.now()}`,
    merchandiseId: variant.id,
    productTitle: variant.product?.title ?? '',
    variantTitle: variant.title,
    quantity,
    unitPrice: {
      amount: variant.price?.amount ?? '0.00',
      currencyCode: variant.price?.currencyCode ?? 'USD',
    },
    imageUrl: variant.image?.url,
    url: variant.product?.handle ? `/products/${variant.product.handle}` : '#',
  };
}
