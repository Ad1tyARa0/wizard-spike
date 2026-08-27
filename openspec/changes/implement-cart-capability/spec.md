# Cart Capability — Delta

## ADDED Requirements

### Requirement: server-cart-bridge

The Cart MUST reconcile its Redux view-model with the authoritative Hydrogen server cart: hydration from loaders, optimistic operations dispatched through server actions, and reconciliation via listener middleware.

#### Scenario: hydrate-on-load

- **WHEN** a page loads with an existing server cart
- **THEN** the cart slice is hydrated from the loader-provided cart via `cartHydrated`

#### Scenario: optimistic-add-reconciled

- **WHEN** a customer adds an item to the cart
- **THEN** the line is optimistically added to the slice and a server action is dispatched
- **AND** the slice is replaced by the server-confirmed cart when the action resolves

#### Scenario: failure-rollback

- **WHEN** the server action fails
- **THEN** the slice enters the error state and the optimistic change is rolled back to the last server-confirmed cart

### Requirement: drawer-server-integration

The Cart drawer MUST reflect server-confirmed totals and offer the server-provided checkout path.

#### Scenario: drawer-totals

- **WHEN** the cart drawer is open
- **THEN** subtotal and quantity come from the server-confirmed cart state

#### Scenario: checkout-handoff

- **WHEN** a customer clicks checkout in the drawer
- **THEN** they are taken to the server-provided checkout URL, or to the cart page when checkout is not yet available
