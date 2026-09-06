# Architecture Capability — Delta

## ADDED Requirements

### Requirement: module-folder-organization

The Architecture MUST organize every module in the `widgets/` and `shared/ui/` layers as a kebab-case folder containing the module's files and a public `index.ts`, grouping related files together, so the composition layers follow the same module-per-folder convention as `features/` and `entities/`.

#### Scenario: widget-module-in-folder

- **WHEN** a developer adds or moves a widget
- **THEN** the widget's files live in their own kebab-case folder under `widgets/`
- **AND** the folder exposes a public `index.ts`

#### Scenario: related-widget-files-grouped

- **WHEN** a widget has related sub-modules
- **THEN** they share one folder, e.g. `widgets/header/` contains `header.tsx` and `header-skeleton.tsx`, and `widgets/cart/` contains `cart-main.tsx`, `cart-line-item.tsx`, `cart-summary.tsx`, and `cart-types.ts`

#### Scenario: ui-module-in-folder

- **WHEN** a developer adds or moves a shared UI primitive
- **THEN** it lives in its own kebab-case folder under `shared/ui/`
- **AND** the folder exposes a public `index.ts`

#### Scenario: public-api-preserved

- **WHEN** a module outside the layer imports a widget or shared UI primitive
- **THEN** the import resolves through the layer's top-level public API (`~/src/widgets` / `~/src/shared/ui`)
