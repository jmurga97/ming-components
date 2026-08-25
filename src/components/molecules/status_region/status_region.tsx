import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../atoms/button';
import { inlineMessageVariants } from '../../atoms/inline_message';
import { CloseIcon } from '../../internal/icon';
import { cn } from '../../../lib/cn';

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

type StatusTone = NonNullable<VariantProps<typeof inlineMessageVariants>['tone']>;

export interface StatusRegionProps {
  autoDismiss?: false | number;
  className?: string;
  dismissLabel?: string;
  label: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  portalContainer?: HTMLElement | null;
  tone?: StatusTone;
}

export function StatusRegion({
  autoDismiss = false,
  className,
  dismissLabel = 'Dismiss notification',
  label,
  onOpenChange,
  open,
  portalContainer,
  tone = 'info',
}: StatusRegionProps): React.JSX.Element | null {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!open || !autoDismiss || paused) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timeout = window.setTimeout(() => {
      onOpenChange(false);
    }, autoDismiss);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [autoDismiss, onOpenChange, open, paused]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="ming-status-region" data-ming-portal="status">
      <div
        className={cn(inlineMessageVariants({ tone }), 'ming-status-region__message', className)}
        onBlur={() => {
          setPaused(false);
        }}
        onFocus={() => {
          setPaused(true);
        }}
        onMouseEnter={() => {
          setPaused(true);
        }}
        onMouseLeave={() => {
          setPaused(false);
        }}
        role={tone === 'error' ? 'alert' : 'status'}
      >
        <div className="ming-inline-message__content">{label}</div>
        <Button
          aria-label={dismissLabel}
          className="ming-status-region__dismiss"
          onClick={() => {
            onOpenChange(false);
          }}
          size="sm"
          variant="ghost"
        >
          <CloseIcon />
        </Button>
      </div>
    </div>,
    portalContainer ?? document.body,
  );
}
