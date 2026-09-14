import type { ComponentProps, ReactNode } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  /** `solid` (accent fill, high-intent CTA) or `outline` (transparent + border). */
  variant?: 'solid' | 'outline';
  /** Icon rendered before the label (left). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label (right). */
  trailingIcon?: ReactNode;
}

export function Button({
  children,
  className,
  ref,
  type = 'button',
  variant = 'outline',
  leadingIcon,
  trailingIcon,
  ...props
}: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button {...props} className={classes} ref={ref} type={type}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
