import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export function Button({ children, ref, type = 'button', ...props }: ButtonProps) {
  return (
    <button {...props} ref={ref} type={type}>
      {children}
    </button>
  );
}
