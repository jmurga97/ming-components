import { Button as BaseButton } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('ming-button', {
  variants: {
    size: {
      sm: 'ming-button--sm',
      md: 'ming-button--md',
      lg: 'ming-button--lg',
    },
    variant: {
      primary: 'ming-button--primary',
      secondary: 'ming-button--secondary',
      ghost: 'ming-button--ghost',
      destructive: 'ming-button--destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export interface ButtonProps
  extends Omit<BaseButton.Props, 'className'>, VariantProps<typeof buttonVariants> {
  className?: string;
}

export function Button({
  className,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <BaseButton
      className={cn(buttonVariants({ size, variant }), className)}
      type={type}
      {...props}
    />
  );
}
