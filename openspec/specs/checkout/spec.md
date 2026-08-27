# Checkout Capability

## Purpose

The Checkout capability owns the transition from the headless storefront cart to Shopify's hosted checkout: redirecting the shopper to the cart's checkoutUrl, carrying buyer identity into the checkout through the cartBuyerIdentity mutation, surfacing the order status URL returned after checkout, and guarding the handoff so it only happens for a cart that is ready to check out. The capability lives in the Redux store and listener middleware while the underlying cart and checkout data are provided by the Storefront API via Remix loaders.

## Requirements

### Requirement: checkout-handoff

The Checkout MUST redirect the shopper to the Shopify-hosted checkout using the active cart's checkoutUrl when checkout is initiated.

#### Scenario: redirect to hosted checkout

- **WHEN** a shopper clicks the checkout button on a cart that has a valid checkoutUrl
- **THEN** the store reads the checkoutUrl from the current cart
- **AND** the shopper's browser is redirected to that Shopify-hosted checkout URL

#### Scenario: checkout url missing

- **WHEN** a shopper clicks the checkout button but the cart exposes no checkoutUrl
- **THEN** no redirect is attempted
- **AND** an error is surfaced in the UI explaining that checkout is unavailable

#### Scenario: checkout url refreshed

- **WHEN** the cart's checkoutUrl is absent at page load but present after a cart mutation
- **THEN** the checkout button becomes enabled using the updated checkoutUrl
- **AND** the redirect uses the most recent checkoutUrl from the cart state

### Requirement: buyer-identity

The Checkout MUST carry the shopper's buyer identity (email, country, and delivery address where available) into checkout by applying a cartBuyerIdentityUpdate mutation before handoff.

#### Scenario: carry email into checkout

- **WHEN** a shopper has provided an email address and initiates checkout
- **THEN** a cartBuyerIdentityUpdate mutation is dispatched with the email set on the buyer identity
- **AND** the redirect to checkout occurs only after the mutation succeeds

#### Scenario: carry delivery address

- **WHEN** a shopper has provided a delivery address with country and postal code and initiates checkout
- **THEN** the delivery address fields are included in the cartBuyerIdentityUpdate mutation
- **AND** the hosted checkout is pre-filled with that address

#### Scenario: partial identity does not block

- **WHEN** only some identity fields (such as email) are known and others are empty
- **THEN** the known fields are still sent via cartBuyerIdentityUpdate
- **AND** checkout proceeds without requiring the missing fields

#### Scenario: identity mutation failure

- **WHEN** the cartBuyerIdentityUpdate mutation returns an error
- **THEN** the checkout redirect is blocked
- **AND** the error is shown to the shopper so they can correct the identity data

### Requirement: order-status

The Checkout MUST surface the orderStatusUrl returned by the checkout or order confirmation flow so the shopper can track the completed order.

#### Scenario: surface order status link

- **WHEN** a shopper completes checkout and the checkout response provides an orderStatusUrl
- **THEN** an order confirmation view renders a link to that orderStatusUrl
- **AND** the shopper can navigate to the order status page on Shopify

#### Scenario: order status from checkout url

- **WHEN** the checkout response carries an orderStatusUrl distinct from the checkoutUrl
- **THEN** the confirmation view uses the orderStatusUrl for order tracking
- **AND** it does not confuse it with the abandoned checkout URL

#### Scenario: order status missing

- **WHEN** the checkout response contains no orderStatusUrl
- **THEN** the confirmation view shows a generic order-placed message
- **AND** no broken link is rendered

### Requirement: checkout-readiness

The Checkout MUST block or disable the checkout handoff whenever the cart is empty or contains unavailable line items.

#### Scenario: block empty cart

- **WHEN** the cart contains zero line items
- **THEN** the checkout button is disabled
- **AND** no checkout handoff can be triggered from that state

#### Scenario: block unavailable lines

- **WHEN** the cart contains a line whose variant is unavailable for sale or has no available quantity
- **THEN** the checkout handoff is blocked
- **AND** the cart UI surfaces which line is unavailable

#### Scenario: enable ready cart

- **WHEN** the cart has at least one available line and a valid checkoutUrl
- **THEN** the checkout button is enabled
- **AND** initiating checkout redirects to the hosted checkout
