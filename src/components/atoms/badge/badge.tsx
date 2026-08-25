import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

export const badgeVariants = cva('ming-badge', {
  variants: {
    tone: {
      neutral: 'ming-badge--neutral',
      info: 'ming-badge--info',
      success: 'ming-badge--success',
      warning: 'ming-badge--warning',
      error: 'ming-badge--error',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export interface BadgeProps
  extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
