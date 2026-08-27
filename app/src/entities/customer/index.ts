/**
 * FSD public API — entities/customer.
 * External modules may only import from this file, never from internals.
 */
export { AppSession } from './api/session';
export {
  buildOrderSearchQuery,
  ORDER_FILTER_FIELDS,
  parseOrderFilters,
} from './model/order-filters';
export type { OrderFilterParams } from './model/order-filters';
export {
  CREATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  UPDATE_ADDRESS_MUTATION,
} from './api/graphql/customer-address-mutations';
export { CUSTOMER_DETAILS_QUERY, CUSTOMER_FRAGMENT } from './api/graphql/customer-details-query';
export { CUSTOMER_ORDER_QUERY } from './api/graphql/customer-order-query';
export {
  CUSTOMER_ORDERS_FRAGMENT,
  CUSTOMER_ORDERS_QUERY,
  ORDER_ITEM_FRAGMENT,
} from './api/graphql/customer-orders-query';
export { CUSTOMER_UPDATE_MUTATION } from './api/graphql/customer-update-mutation';
