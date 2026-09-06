# Redesign Header for Exaggerated Minimalism

## Why

The current header still follows the Hydrogen skeleton's default composition: logo left, nav in the middle of the bar, and a text-based CTA cluster (☰ hamburger, "Sign in / Account", "Search", cart) on the right. That violates the Exaggerated Minimalism language (design-system/e-commerce-website/MASTER.md): a crowded control cluster, a text account link, and an emoji-style hamburger break the "elements minimal / one statement per view" and "no emojis as icons" rules. The store owner mandated a redesigned composition: one ultra-minimal bar driven by Phosphor thin (ultra-thin) icons.

## What Changes

- Theme spec gains a `header-composition` requirement: a three-zone bar (left / center / right) whose contents reorder by viewport:
  - Desktop (≥ 768px): logo at the extreme left, primary navigation centered, search + cart icon controls at the extreme right (search immediately left of cart).
  - Mobile (< 768px): list (menu) icon at the extreme left, logo centered, search + cart icon controls at the extreme right.
- The account ("Sign in / Account") link is removed from the header entirely.
- Header controls become Phosphor ultra-thin icon buttons: `List` (mobile menu), `MagnifyingGlass` (search), `ShoppingBag` (cart), each with an accessible name, 44px touch target, `cursor: pointer`, and an accent focus ring.
- `app/src/widgets/header.tsx` restructures into three grid zones; `app/src/shared/styles/app.css` supplies the responsive three-zone grid and icon-button styles. Drawer behavior (search aside, cart drawer, mobile menu drawer) is unchanged.

## Impact

- Header passes the Exaggerated Minimalism pre-delivery checklist: no emoji icons, minimal elements, cursor-pointer, visible focus, responsive 320–1440 with no horizontal overflow.
- The existing `chunky` headerStyle variant (playful preset) keeps working; cart icon weight stays bold for the playful preset and becomes thin for the minimal preset.
- Drawer triggers keep their current behavior, so no feature (search, cart, mobile menu) regresses.
