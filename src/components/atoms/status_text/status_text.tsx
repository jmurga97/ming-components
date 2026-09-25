import styles from './status_text.module.css';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const statusTextVariants = cva(styles['ming-status-text'], {
  variants: {
    tone: {
      neutral: null,
      info: styles['ming-status-text--info'],
      success: styles['ming-status-text--success'],
      warning: styles['ming-status-text--warning'],
      error: styles['ming-status-text--error'],
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export interface StatusTextProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof statusTextVariants> {
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
