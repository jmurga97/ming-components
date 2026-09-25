import styles from './badge.module.css';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

export const badgeVariants = cva(styles['ming-badge'], {
  variants: {
    tone: {
      neutral: styles['ming-badge--neutral'],
      info: styles['ming-badge--info'],
      success: styles['ming-badge--success'],
      warning: styles['ming-badge--warning'],
      error: styles['ming-badge--error'],
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export interface BadgeProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
