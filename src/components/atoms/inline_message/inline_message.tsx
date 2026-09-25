import styles from './inline_message.module.css';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const inlineMessageVariants = cva(styles['ming-inline-message'], {
  variants: {
    tone: {
      info: styles['ming-inline-message--info'],
      success: styles['ming-inline-message--success'],
      warning: styles['ming-inline-message--warning'],
      error: styles['ming-inline-message--error'],
    },
  },
  defaultVariants: { tone: 'info' },
});

export interface InlineMessageProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
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
      {title ? <strong className={styles['ming-inline-message__title']}>{title}</strong> : null}
      <div className={styles['ming-inline-message__content']}>{message ?? children}</div>
    </div>
  );
}
