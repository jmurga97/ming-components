import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '../../atoms/button';
import { CloseIcon, MenuIcon } from '../../internal/icon';
import { cn } from '../../../lib/cn';

import type { ReactNode } from 'react';

export interface AppShellProps {
  children: ReactNode;
  className?: string;
  header: ReactNode;
  navigation: ReactNode;
  navigationLabel?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function AppShell({
  children,
  className,
  header,
  navigation,
  navigationLabel = 'Primary navigation',
  onOpenChange,
  open = true,
}: AppShellProps): React.JSX.Element {
  const navigationId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(max-width: 56rem)');
    const update = (): void => {
      setMobile(media.matches);
    };
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  const toggle = onOpenChange ? (
    <Button
      aria-controls={navigationId}
      aria-expanded={open}
      aria-label={open ? 'Hide navigation' : 'Show navigation'}
      className="ming-app-shell__toggle"
      onClick={() => {
        onOpenChange(!open);
      }}
      ref={toggleRef}
      size="sm"
      variant="ghost"
    >
      <MenuIcon />
    </Button>
  ) : null;

  return (
    <div className={cn('ming-app-shell', className)} data-navigation-open={open}>
      {!mobile && open ? (
        <aside
          aria-label={navigationLabel}
          className="ming-app-shell__navigation"
          id={navigationId}
        >
          {navigation}
        </aside>
      ) : null}
      <header className="ming-app-shell__header">
        {toggle}
        {header}
      </header>
      <main className="ming-app-shell__main">{children}</main>
      {mobile && onOpenChange ? (
        <Dialog.Root
          onOpenChange={(nextOpen) => {
            onOpenChange(nextOpen);
          }}
          open={open}
        >
          <Dialog.Portal className="ming-portal">
            <Dialog.Backdrop className="ming-dialog__backdrop" />
            <Dialog.Viewport className="ming-dialog__viewport ming-app-shell__mobile-viewport">
              <Dialog.Popup
                className="ming-app-shell__mobile-navigation"
                finalFocus={toggleRef}
                id={navigationId}
              >
                <Dialog.Title className="ming-visually-hidden">{navigationLabel}</Dialog.Title>
                <Dialog.Close
                  aria-label="Close navigation"
                  className="ming-app-shell__mobile-close"
                  render={<Button size="sm" variant="ghost" />}
                >
                  <CloseIcon />
                </Dialog.Close>
                {navigation}
              </Dialog.Popup>
            </Dialog.Viewport>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </div>
  );
}
