import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export function Button({ children, className, ref, type = 'button', ...props }: ButtonProps) {
  return (
    <button {...props} className={className ? `btn ${className}` : 'btn'} ref={ref} type={type}>
      {children}
    </button>
  );
}
