# Catalog Capability

## Purpose

Covers product and collection discovery: browsing product listings, viewing product detail with variants and availability, exploring collections, searching, and filtering/sorting the catalog. All data is read from Shopify's Storefront API through entity services, with the Storefront API as the source of truth.

## Requirements

### Requirement: product-listing

The catalog MUST render published products as a listing with title, formatted price, and primary image.

#### Scenario: listing-loads

- **WHEN** a product listing page loads
- **THEN** it renders published products with title, formatted price, and primary image

#### Scenario: listing-pagination

- **WHEN** the listing has more products than the page size
- **THEN** pagination controls load the next page from the Storefront API

### Requirement: product-detail

The catalog MUST render a product detail page showing media, description, variants, prices, availability, and a product form for adding to cart.

#### Scenario: variant-selection

- **WHEN** a customer selects a variant
- **THEN** the displayed price and availability update to match that variant

#### Scenario: unavailable-variant

- **WHEN** a variant has no available inventory
- **THEN** the product form disables purchase and shows the availability state

### Requirement: collection-browsing

The catalog MUST render collection listings and a collection detail page listing the products assigned to that collection.

#### Scenario: collection-page-loads

- **WHEN** a collection page loads
- **THEN** it lists the products assigned to that collection with pagination

#### Scenario: empty-collection

- **WHEN** a collection contains no products
- **THEN** the page renders an empty state with a path back to the catalog

### Requirement: product-search

The catalog MUST provide product search and predictive search through the Storefront API search capability.

#### Scenario: search-query

- **WHEN** a customer submits a search query
- **THEN** matching products render with the query echoed in the results header

#### Scenario: predictive-results

- **WHEN** a customer types in the search field
- **THEN** predictive suggestions render without a full page navigation

### Requirement: filtering-and-sorting

Collection and search listings MUST support filtering by price, availability, and tags, and sorting by price, newest, and best selling.

#### Scenario: apply-filter

- **WHEN** a customer applies a filter
- **THEN** the listing updates with the filtered result set and the active filter is reflected in the URL

#### Scenario: apply-sort

- **WHEN** a customer selects a sort order
- **THEN** the listing re-orders and the choice persists across pagination

### Requirement: seo-metadata

Product and collection pages MUST emit SEO metadata including title, description, canonical URL, and Open Graph tags.

#### Scenario: social-share

- **WHEN** a product page is shared on a social platform
- **THEN** the Open Graph metadata is present and correct

#### Scenario: canonical-url

- **WHEN** a product page renders with URL parameters
- **THEN** the canonical link points at the clean product URL

### Requirement: inventory-awareness

Product availability MUST reflect the Storefront API inventory policy and `quantityAvailable` where exposed.

#### Scenario: low-stock

- **WHEN** a variant's available quantity is at or below the storefront threshold
- **THEN** a low-stock indicator renders on the product form

#### Scenario: stock-restored

- **WHEN** a previously unavailable variant becomes available
- **THEN** the product form re-enables purchase without a page reload
