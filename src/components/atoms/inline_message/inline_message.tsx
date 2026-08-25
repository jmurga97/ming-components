import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const inlineMessageVariants = cva('ming-inline-message', {
  variants: {
    tone: {
      info: 'ming-inline-message--info',
      success: 'ming-inline-message--success',
      warning: 'ming-inline-message--warning',
      error: 'ming-inline-message--error',
    },
  },
  defaultVariants: { tone: 'info' },
});

export interface InlineMessageProps
  extends
    Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
    VariantProps<typeof inlineMessageVariants> {
  message?: ReactNode;
  title?: ReactNode;
}

export function InlineMessage({
  children,
  className,
  message,
  title,
  tone,
  ...props
}: InlineMessageProps): React.JSX.Element {
  const isError = tone === 'error';
  return (
    <div
      className={cn(inlineMessageVariants({ tone }), className)}
      role={isError ? 'alert' : 'status'}
      {...props}
    >
      {title ? <strong className="ming-inline-message__title">{title}</strong> : null}
      <div className="ming-inline-message__content">{message ?? children}</div>
    </div>
  );
}
