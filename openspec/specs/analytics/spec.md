# Analytics Capability

## Purpose

The Analytics capability provides a single, vendor-agnostic pipeline for capturing storefront events and delivering them to analytics destinations. It defines a canonical event layer whose events are emitted from Redux side-effect flows, integrates with the Shopify web pixel extension for forwarding to configured destinations, gates all emission on visitor consent via the Shopify consent API, and guarantees payloads carry identifiers suitable for server-side reconciliation.

## Requirements

### Requirement: event-layer

The Analytics capability MUST emit canonical events through a shared, vendor-agnostic event layer with a consistent payload shape for view_item, add_to_cart, begin_checkout, search, and view_item_list.

#### Scenario: product-view-emits-view-item

- **WHEN** a shopper views a product page and the product data is available
- **THEN** the event layer emits a view_item event with the product and variant identifiers and price

#### Scenario: add-to-cart-emits-add-to-cart

- **WHEN** a shopper adds a variant to the cart
- **THEN** the event layer emits an add_to_cart event carrying the variant id, quantity, price, and currency

#### Scenario: checkout-initiated-emits-begin-checkout

- **WHEN** a shopper initiates checkout from the cart
- **THEN** the event layer emits a begin_checkout event listing the cart items with quantities and totals

#### Scenario: consistent-payload-shape

- **WHEN** any canonical event is emitted
- **THEN** it uses the shared event schema with the same top-level fields and unit conventions as every other event

### Requirement: pixel-integration

The Analytics capability MUST deliver storefront events to the Shopify web pixel extension so configured destinations receive them.

#### Scenario: events-forwarded-to-pixel

- **WHEN** the web pixel extension is present and the event layer emits a canonical event
- **THEN** the pixel receives that event with its full payload

#### Scenario: destination-forwarding

- **WHEN** the pixel extension has configured analytics destinations
- **THEN** each canonical event is forwarded to those destinations with the canonical identifiers intact

#### Scenario: pixel-absent-storefront-still-works

- **WHEN** the web pixel extension is not installed on the store
- **THEN** the storefront continues to function normally and no analytics errors are thrown

### Requirement: consent-gating

The Analytics capability MUST NOT emit analytics events until the visitor has granted consent, and MUST respect the persisted consent state on reload.

#### Scenario: no-events-before-consent

- **WHEN** a visitor has not yet granted consent
- **THEN** the event layer suppresses all analytics events

#### Scenario: events-emit-after-consent

- **WHEN** a visitor grants consent through the cookie banner
- **THEN** the event layer begins emitting canonical events for subsequent shopper actions

#### Scenario: consent-persists-across-reload

- **WHEN** a consenting visitor reloads the page or returns in a later session
- **THEN** the storefront reads the consent state via the Shopify consent API and continues emitting events without re-prompting

#### Scenario: consent-revoked-stops-emission

- **WHEN** a visitor revokes consent
- **THEN** the event layer stops emitting analytics events immediately and does not resume until consent is granted again

### Requirement: data-quality

The Analytics capability MUST attach canonical identifiers and commerce fields to every event payload so the data is suitable for server-side reconciliation.

#### Scenario: event-carries-canonical-identifiers

- **WHEN** the event layer emits an event for a product or variant
- **THEN** the payload includes the canonical product id, variant id, price, currency, and quantity

#### Scenario: currency-and-price-consistency

- **WHEN** a price or total is included in an event payload
- **THEN** it uses the storefront's active currency and the same numeric precision as the Storefront API response

#### Scenario: reconciliation-ready-payload

- **WHEN** an event is emitted
- **THEN** its identifiers match those returned by the Storefront API so an external system can reconcile the event against order and product data
