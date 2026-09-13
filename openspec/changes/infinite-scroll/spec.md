# Catalog Capability — Delta

## ADDED Requirements

### Requirement: infinite-scroll-pagination

Product listing and collection grids MUST support infinite scroll: when a visitor scrolls near the bottom of the grid and another page of products exists, the next page MUST load automatically and append to the list without replacing it. The loading trigger MUST remain a real hyperlink to the next page — keyboard-operable, screen-reader-announced, and crawler-followable without JavaScript — and a status region MUST announce loading progress and completion to assistive technology.

#### Scenario: auto-load-on-scroll

- **WHEN** a visitor scrolls near the bottom of a product grid
- **AND** another page of products exists
- **THEN** the next page loads automatically without a click

#### Scenario: append-not-replace

- **WHEN** a new page loads
- **THEN** the already-rendered products stay in place and the new products append below them
- **AND** the page does not jump back to the top

#### Scenario: trigger-is-a-real-link

- **WHEN** a crawler or a no-JavaScript visitor reaches the grid
- **THEN** a real link to the next page is present and navigable
- **AND** deeper pages remain discoverable without scroll or script

#### Scenario: keyboard-operable

- **WHEN** a keyboard user tabs to the loading trigger and activates it
- **THEN** the next page loads and appends
- **AND** the trigger is not dependent on scroll events

#### Scenario: loading-and-status-announced

- **WHEN** a page is being fetched and then completes
- **THEN** a loading indicator is shown while fetching
- **AND** an `aria-live` status region announces the loading and completion

#### Scenario: stop-at-last-page

- **WHEN** the final page has been loaded
- **THEN** no further requests are made
- **AND** the loading trigger is hidden
