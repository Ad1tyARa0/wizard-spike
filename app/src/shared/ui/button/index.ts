/**
 * FSD public API — shared/ui/button.
 * The app's single button primitive: `Button` (button element) and
 * `ButtonLink` (anchor). Both take `variant` (solid | outline | stark) and
 * `icon` + `iconPosition`; `ButtonLink` renders a router `Link` for internal
 * hrefs.
 */
export { Button, type ButtonProps } from './button';
export { ButtonLink, type ButtonLinkProps } from './button-link';
export type { ButtonIconPosition, ButtonVariant } from './button-shared';
