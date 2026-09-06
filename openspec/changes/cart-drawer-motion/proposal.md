# Cart Drawer Motion

## Why

The cart drawer currently appears and disappears instantly: `CartDrawer` mounts and unmounts, and `.drawer` / `.drawer-backdrop` define no transition. That feels abrupt and inconsistent with the Exaggerated Minimalism motion language (design-system/e-commerce-website/MASTER.md: 150–400ms ease-out motion, no instant state changes). The store owner asked for a smooth ease-in when the drawer opens.

The drawer visuals (colors) and motion (duration, easing) must also stay **token-driven** so that switching theme preset (or applying config overrides) updates them without code edits — the same guarantee the Theme capability's `design-tokens` requirement makes site-wide.

## What Changes

- The cart drawer panel eases in from the right and the backdrop fades in on open, using the theme's motion tokens (`--duration-base`, `--ease-out`) — not hardcoded values.
- The animation uses CSS `@starting-style` so it works with the existing mount-on-open component structure (no JS/component changes); `prefers-reduced-motion` stays honored by the existing global reduced-motion rule.
- The search/mobile-menu drawers (the shared `Aside` in `app.css`) are aligned to the same motion tokens so every drawer animates with the active theme.
- `openspec/changes/cart-drawer-motion/` records the requirement and the token-driven guarantee.

## Impact

- Opening the cart drawer reads as a smooth, on-brand ease-in instead of a hard cut.
- Because the transition references `--duration-base` / `--ease-out`, the `playful` preset (350ms, different curve) and any `design.motion` config override flow through automatically.
- No changes to drawer logic, a11y behavior (focus, Escape, body scroll lock), or the Redux cart state.
