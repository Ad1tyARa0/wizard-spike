import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router';

export interface ButtonLinkProps extends ComponentProps<'a'> {
  /** `solid` (accent fill, high-intent CTA) or `outline` (transparent + border). */
  variant?: 'solid' | 'outline';
  /** Icon rendered before the label (left). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label (right). */
  trailingIcon?: ReactNode;
}

function isInternalHref(href: string | undefined): href is string {
  return Boolean(href && (href.startsWith('/') || href.startsWith('.')) && !href.startsWith('//'));
}

export function ButtonLink({
  children,
  className,
  href,
  ref,
  variant = 'outline',
  leadingIcon,
  trailingIcon,
  ...props
}: ButtonLinkProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
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
