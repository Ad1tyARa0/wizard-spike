import type { ComponentProps } from 'react';
import { Link } from 'react-router';

export type ButtonLinkProps = ComponentProps<'a'>;

function isInternalHref(href: string | undefined): href is string {
  return Boolean(href && (href.startsWith('/') || href.startsWith('.')) && !href.startsWith('//'));
}

export function ButtonLink({ children, className, href, ref, ...props }: ButtonLinkProps) {
  const classes = className ? `btn ${className}` : 'btn';

  if (isInternalHref(href)) {
    return (
      <Link {...props} className={classes} prefetch="intent" ref={ref} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <a {...props} className={classes} href={href} ref={ref}>
      {children}
    </a>
  );
}
