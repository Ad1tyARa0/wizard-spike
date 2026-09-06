/**
 * FSD public API — widgets (composed blocks).
 * Every widget module lives in its own kebab-case folder with a public
 * index.ts (e.g. widgets/header/, widgets/cart/); external modules import
 * only from this top-level file, never from internals.
 * Intra-widget imports (e.g. PageLayout → Header) stay relative.
 */
export { CartLineItem, CartMain, CartSummary } from './cart';
export type { CartLayout, CartLine, LineItemChildrenMap } from './cart';
export { Footer } from './footer';
export { Header, HeaderMenu, HeaderSkeleton } from './header';
export { Marquee } from './marquee';
export { MockShopNotice } from './mock-shop-notice';
export { PageLayout } from './page-layout';
export { PaginatedResourceSection } from './paginated-resource-section';
export { ProductItem } from './product';
