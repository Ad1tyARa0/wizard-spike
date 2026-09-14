import type { ComponentProps, ReactNode } from 'react';
import {
  ButtonContent,
  buttonClassName,
  type ButtonIconPosition,
  type ButtonVariant,
} from './button-shared';

export interface ButtonProps extends ComponentProps<'button'> {
  /** `solid` (accent fill), `outline` (transparent + border), `stark` (structure fill). */
  variant?: ButtonVariant;
  /** Glyph rendered inside the button, on the side set by `iconPosition`. */
  icon?: ReactNode;
  /** Side the icon sits on. Defaults to `left`. */
  iconPosition?: ButtonIconPosition;
}

export function Button({
  children,
  className,
  icon,
  iconPosition,
  ref,
  type = 'button',
  variant = 'outline',
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={buttonClassName(variant, className)} ref={ref} type={type}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
