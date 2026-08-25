import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const statusTextVariants = cva('ming-status-text', {
  variants: {
    tone: {
      neutral: 'ming-status-text--neutral',
      info: 'ming-status-text--info',
      success: 'ming-status-text--success',
      warning: 'ming-status-text--warning',
      error: 'ming-status-text--error',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export interface StatusTextProps
  extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof statusTextVariants> {
  label?: ReactNode;
  polite?: boolean;
}

export function StatusText({
  children,
  className,
  label,
  polite = true,
  tone,
  ...props
}: StatusTextProps): React.JSX.Element {
  return (
    <span
      aria-live={polite ? 'polite' : 'assertive'}
      className={cn(statusTextVariants({ tone }), className)}
      role="status"
      {...props}
    >
      {label ?? children}
    </span>
  );
}
