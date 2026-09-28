import styles from './status_region.module.css';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../atoms/button';
import { inlineMessageVariants } from '../../atoms/inline_message';
import { CloseIcon } from '../../atoms/icon';
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
  // Stays mounted after `open` turns false so the exit transition can play.
  const [mounted, setMounted] = useState(open);
  const regionRef = useRef<HTMLDivElement>(null);
  if (open && !mounted) setMounted(true);

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

  useEffect(() => {
    if (open || !mounted) return;
    let cancelled = false;
    const unmount = (): void => {
      if (!cancelled) setMounted(false);
    };
    const animations = regionRef.current?.getAnimations?.() ?? [];
    Promise.all(animations.map((animation) => animation.finished)).then(unmount, unmount);
    return () => {
      cancelled = true;
    };
  }, [mounted, open]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles['ming-status-region']}
      data-ending-style={open ? undefined : ''}
      data-ming-portal="status"
      ref={regionRef}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/noNoninteractiveElementInteractions: Pauses auto-dismiss while hovered or focused. */}
      <div
        className={cn(
          inlineMessageVariants({ tone }),
          styles['ming-status-region__message'],
          className,
        )}
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
        <div className={styles['ming-status-region__content']}>{label}</div>
        <Button
          aria-label={dismissLabel}
          iconOnly
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
