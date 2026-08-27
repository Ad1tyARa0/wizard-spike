# Cart Capability

## Purpose

The Cart capability covers the client-side shopping cart domain of the Hydrogen headless storefront: managing line items through Shopify's Storefront API cart mutations, restoring and persisting the cart across sessions, computing accurate summary totals from the server cart object, and driving the cart drawer's UI state. The Redux store holds the ephemeral cart UI state while async side effects (optimistic mutations reconciled with the Storefront API) run through Redux Toolkit's createListenerMiddleware, so the UI stays responsive and converges on the server's authoritative cart.

## Requirements

### Requirement: cart-line-management

The Cart MUST add, update, and remove line items through the Storefront API cartLinesAdd, cartLinesUpdate, and cartLinesRemove mutations, applying optimistic UI updates that are reconciled with the mutation responses via listener middleware.

#### Scenario: add item optimistically

- **WHEN** a shopper clicks "Add to cart" for a product variant
- **THEN** the line is optimistically inserted into the Redux cart state immediately
- **AND** a cartLinesAdd mutation is dispatched to the Storefront API with the variant id and quantity
- **AND** the local state is replaced by the returned cart when the mutation resolves

#### Scenario: update line quantity

- **WHEN** a shopper changes the quantity of an existing line in the cart
- **THEN** the line quantity is optimistically updated in Redux
- **AND** a cartLinesUpdate mutation is dispatched with the line id and new quantity
- **AND** the displayed quantity converges to the quantity returned by the Storefront API

#### Scenario: remove line item

- **WHEN** a shopper removes a line item from the cart
- **THEN** the line is optimistically removed from the Redux cart state
- **AND** a cartLinesRemove mutation is dispatched with that line id
- **AND** the line no longer appears in the drawer once the mutation response is applied

#### Scenario: reconcile failed mutation

- **WHEN** a cart mutation fails with an error from the Storefront API
- **THEN** the listener middleware re-fetches the authoritative cart and replaces the optimistic state with it
- **AND** a user-visible error is surfaced in the cart drawer

### Requirement: cart-retrieval

The Cart MUST restore an existing cart on load by resolving a cart id from the URL or from a persisted id, and MUST create a new cart when no id is available.

#### Scenario: restore cart from url

- **WHEN** a page loads with a cart id in the URL
- **THEN** the store fetches the cart from the Storefront API using that cart id
- **AND** the drawer renders that cart's line items once the fetch resolves

#### Scenario: restore cart from persisted id

- **WHEN** a page loads without a cart id in the URL but a cart id exists in localStorage
- **THEN** the store fetches the cart using the persisted id
- **AND** the persisted cart is hydrated into Redux before the drawer is opened

#### Scenario: create cart when missing

- **WHEN** a page loads with neither a URL cart id nor a persisted cart id
- **THEN** a cartCreate mutation is dispatched
- **AND** the returned empty cart becomes the active cart in the store

#### Scenario: restore invalid cart id

- **WHEN** the cart id found in the URL or localStorage is rejected by the Storefront API as invalid
- **THEN** the store discards the stale id and creates a new cart
- **AND** the new cart id replaces the stale one in localStorage

### Requirement: cart-persistence

The Cart MUST persist its id in localStorage after every cart-creating or cart-altering operation so the cart can be recovered across sessions.

#### Scenario: persist cart id on create

- **WHEN** a cart is created or its id changes after a mutation
- **THEN** the new cart id is written to localStorage
- **AND** the stored id is used on the next page load to restore the cart

#### Scenario: recover cart across sessions

- **WHEN** a shopper closes the browser and returns to the storefront later
- **THEN** the cart id read from localStorage is used to re-fetch the cart
- **AND** previously added line items are present in the cart

#### Scenario: handle unreadable storage

- **WHEN** localStorage is unavailable or contains a corrupt cart id
- **THEN** the store proceeds with a fresh cart instead of failing
- **AND** no exception from storage access surfaces in the UI

### Requirement: cart-summary

The Cart MUST expose an accurate line count, subtotal, and totals derived from the server cart object, formatted in the cart's currency.

#### Scenario: line count sums quantities

- **WHEN** a cart contains multiple lines, some with quantity greater than one
- **THEN** the displayed line count is the sum of all line quantities from the cart object
- **AND** the count updates whenever a mutation response replaces the cart

#### Scenario: subtotal uses cart cost

- **WHEN** the cart summary is rendered
- **THEN** the subtotal is read from the cart cost subtotal amount returned by the Storefront API
- **AND** the amount is formatted with the currency code reported by the cart

#### Scenario: empty cart summary

- **WHEN** the cart has no line items
- **THEN** the summary shows a subtotal of zero in the cart's currency
- **AND** the line count shows zero

### Requirement: cart-drawer

The Cart MUST keep drawer visibility state in Redux and MUST render the latest cart state whenever the drawer is open.

#### Scenario: open and close drawer

- **WHEN** a shopper opens the cart drawer and later closes it
- **THEN** the open state is toggled in the Redux store
- **AND** the drawer is hidden only after the close action is dispatched

#### Scenario: drawer reflects latest cart

- **WHEN** a cart mutation resolves while the drawer is open
- **THEN** the drawer re-renders with the line items, quantities, and totals from the updated cart
- **AND** the drawer never displays stale line data from a previous cart state

#### Scenario: drawer reflects optimistic updates

- **WHEN** a shopper updates a line quantity while the drawer is open and the mutation is still in flight
- **THEN** the drawer immediately shows the optimistic quantity
- **AND** it settles on the server-confirmed quantity when the mutation response arrives
