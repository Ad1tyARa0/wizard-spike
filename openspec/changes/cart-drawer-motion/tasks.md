# Cart Drawer Motion — Tasks

## Spec

- [x] Add `cart-drawer-motion` requirement to the Cart capability (this change's delta)

## Implementation

- [x] Animate the cart drawer open in `app/src/shared/styles/drawer.css`:
  - [x] `.drawer` eases in from the right (`translateX(0)` transitioned from `translateX(100%)` via `@starting-style`) using `var(--duration-base)` + `var(--ease-out)`
  - [x] `.drawer-backdrop` fades in (`opacity: 1` from `0` via `@starting-style`) using the same tokens
- [x] Align the shared `Aside` drawers in `app/src/shared/styles/app.css` to the same motion tokens (`transform` and `opacity` transitions)

## Verification

- [x] Compiled CSS (Lightning CSS) contains the `@starting-style` rules and token references — no hardcoded durations
- [x] Token-driven check: resolving the `minimal` and `playful` presets emits different `--duration-base` / `--ease-out` values (250ms/350ms), and the drawer styles reference those variables
- [x] `bun run typecheck` clean
- [x] `bun run lint` clean
- [x] `bun test` passes
- [ ] Visual check: cart drawer eases in on open; `prefers-reduced-motion` shows no animation
