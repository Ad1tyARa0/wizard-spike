import type { ReactNode } from 'react';

/** `solid` (accent fill), `outline` (transparent + border), `stark` (structure fill). */
export type ButtonVariant = 'solid' | 'outline' | 'stark';

/** Side the icon sits on. */
export type ButtonIconPosition = 'left' | 'right';

/** Shared class-name builder for `Button` and `ButtonLink`. */
export function buttonClassName(variant: ButtonVariant, className?: string): string {
  return ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
}

/** Shared icon + label composition for `Button` and `ButtonLink`. */
export function ButtonContent({
  children,
  icon,
  iconPosition = 'left',
}: {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
}) {
  return (
    <>
      {iconPosition === 'left' ? icon : null}
      {children}
      {iconPosition === 'right' ? icon : null}
    </>
  );
}
