import type { OptimisticCartLine } from '@shopify/hydrogen';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

/**
 * Shared cart-widget types. Extracted so CartMain/CartLineItem/CartSummary
 * do not form a circular type dependency (madge checks this).
 */
export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

export type CartLayout = 'page' | 'aside';

export type LineItemChildrenMap = { [parentId: string]: CartLine[] };
