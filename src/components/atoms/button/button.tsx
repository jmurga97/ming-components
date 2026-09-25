import styles from './button.module.css';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(styles['ming-button'], {
  variants: {
    iconOnly: {
      true: styles['ming-button--icon-only'],
    },
    size: {
      sm: styles['ming-button--sm'],
      md: styles['ming-button--md'],
      lg: styles['ming-button--lg'],
    },
    variant: {
      primary: styles['ming-button--primary'],
      secondary: styles['ming-button--secondary'],
      ghost: styles['ming-button--ghost'],
      destructive: styles['ming-button--destructive'],
    },
  },
  defaultVariants: {
    iconOnly: false,
    size: 'md',
    variant: 'primary',
  },
});

export interface ButtonProps
  extends Omit<BaseButton.Props, 'className'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export function Button({
  className,
  iconOnly,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <BaseButton
      className={cn(buttonVariants({ iconOnly, size, variant }), className)}
      type={type}
      {...props}
    />
  );
}
