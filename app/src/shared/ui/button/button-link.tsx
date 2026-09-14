import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router';
import {
  ButtonContent,
  buttonClassName,
  type ButtonIconPosition,
  type ButtonVariant,
} from './button-shared';

export interface ButtonLinkProps extends ComponentProps<'a'> {
  /** `solid` (accent fill), `outline` (transparent + border), `stark` (structure fill). */
  variant?: ButtonVariant;
  /** Glyph rendered inside the button, on the side set by `iconPosition`. */
  icon?: ReactNode;
  /** Side the icon sits on. Defaults to `left`. */
  iconPosition?: ButtonIconPosition;
}

function isInternalHref(href: string | undefined): href is string {
  return Boolean(href && (href.startsWith('/') || href.startsWith('.')) && !href.startsWith('//'));
}

export function ButtonLink({
  children,
  className,
  href,
  icon,
  iconPosition,
  ref,
  variant = 'outline',
  ...props
}: ButtonLinkProps) {
  const classes = buttonClassName(variant, className);
  const content = (
    <ButtonContent icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  );

  if (isInternalHref(href)) {
    return (
      <Link {...props} className={classes} prefetch="intent" ref={ref} to={href}>
        {content}
      </Link>
    );
  }

  return (
    <a {...props} className={classes} href={href} ref={ref}>
      {content}
    </a>
  );
}
