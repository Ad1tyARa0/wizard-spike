import type { ComponentProps } from 'react';

export type ButtonLinkProps = ComponentProps<'a'>;

export function ButtonLink({ children, ref, ...props }: ButtonLinkProps) {
  return (
    <a {...props} ref={ref}>
      {children}
    </a>
  );
}
