/**
 * FSD public API — widgets (single composition slice).
 * External modules may only import from this file, never from internals.
 * Intra-widget imports (e.g. PageLayout → Header) stay relative.
 */
export { CartLineItem } from './cart-line-item';
export { CartMain } from './cart-main';
export { CartSummary } from './cart-summary';
export { Footer } from './footer';
export { Header } from './header';
export { MockShopNotice } from './mock-shop-notice';
export { PageLayout } from './page-layout';
export { PaginatedResourceSection } from './paginated-resource-section';
export { ProductItem } from './product-item';
export type { CartLayout, CartLine, LineItemChildrenMap } from './cart-types';
