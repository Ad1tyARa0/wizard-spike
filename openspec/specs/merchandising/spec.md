# Merchandising Capability

## Purpose

The Merchandising capability drives product discovery and conversion on the Hydrogen storefront by surfacing related, recently viewed, featured, and complementary products to shoppers. It covers recommendation rails on product pages backed by the Storefront API `productRecommendations` query, a recently-viewed rail persisted in Redux and localStorage, curated featured content on the home page configured through storefront settings, and cross-sell surfaces in the cart drawer that never block the checkout flow.

## Requirements

### Requirement: product-recommendations

The Merchandising capability MUST surface related and upsell products on product pages using the Storefront API `productRecommendations` query, fetched in the Remix loader.

#### Scenario: related-products-rail-on-product-page

- **WHEN** a shopper opens a product page and the loader resolves `productRecommendations` with a non-empty list
- **THEN** the page renders a related products rail containing each recommended product
- **AND** each rail item links to its product handle and displays title, price, and image

#### Scenario: recommendations-api-returns-empty

- **WHEN** the `productRecommendations` query returns an empty list or an error for the current product
- **THEN** the product page renders without the related products rail
- **AND** no error or placeholder is shown to the shopper

#### Scenario: recommended-product-is-unavailable

- **WHEN** a recommended product is no longer active or its variant is sold out
- **THEN** the rail omits that product while still rendering the remaining recommendations

### Requirement: recently-viewed

The Merchandising capability MUST track the products a shopper views in Redux, persist that history to localStorage, and render it as a recently-viewed rail.

#### Scenario: view-tracks-product

- **WHEN** a shopper navigates to a product page and the product id is not already first in the recently-viewed list
- **THEN** the product is prepended to the recently-viewed list in the Redux store
- **AND** the updated list is written to localStorage

#### Scenario: recently-viewed-persists-across-reload

- **WHEN** a shopper reloads the page or returns in a later session with existing recently-viewed data in localStorage
- **THEN** the store is rehydrated from localStorage on boot and the recently-viewed rail renders the persisted products

#### Scenario: recently-viewed-rail-cap

- **WHEN** the recently-viewed list exceeds the configured maximum count
- **THEN** the oldest entries are trimmed from the list and the rail renders only the most recent items

### Requirement: featured-merchandising

The Merchandising capability MUST render curated featured collections and products on the home page according to storefront settings configured in the Shopify admin.

#### Scenario: home-page-renders-featured-content

- **WHEN** the home page loader fetches the configured featured collections and products from the Storefront API
- **THEN** the home page renders those collections and products in the curated merchandising sections

#### Scenario: featured-content-unconfigured

- **WHEN** no featured collections or products are configured in storefront settings
- **THEN** the home page renders with the featured sections hidden instead of showing empty blocks

#### Scenario: featured-product-data-refreshes

- **WHEN** storefront settings change in the Shopify admin and a shopper requests the home page
- **THEN** the loader returns the updated featured content from the Storefront API without a code deployment

### Requirement: cross-sell

The Merchandising capability MUST surface complementary products in the cart drawer without blocking the shopper's ability to complete checkout.

#### Scenario: cart-drawer-shows-complementary-products

- **WHEN** a shopper opens the cart drawer with at least one item in the cart
- **THEN** the drawer renders a cross-sell section with complementary products for the cart contents

#### Scenario: cross-sell-does-not-block-checkout

- **WHEN** a cross-sell product query is pending or fails while the cart drawer is open
- **THEN** the checkout button remains visible, enabled, and functional

#### Scenario: cross-sell-add-to-cart

- **WHEN** a shopper adds a cross-sell product to the cart from the drawer
- **THEN** the item is added to the cart, the cart totals update, and the drawer stays open for further browsing
