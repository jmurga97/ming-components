import styles from './app_shell.module.css';
import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '../../atoms/button';
import { CloseIcon, MenuIcon } from '../../atoms/icon';
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
      iconOnly
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
    <div className={cn(styles['ming-app-shell'], className)} data-navigation-open={open}>
      {!mobile && open ? (
        <aside
          aria-label={navigationLabel}
          className={styles['ming-app-shell__navigation']}
          id={navigationId}
        >
          {navigation}
        </aside>
      ) : null}
      <header className={styles['ming-app-shell__header']}>
        {toggle}
        {header}
      </header>
      <main className={styles['ming-app-shell__main']}>{children}</main>
      {mobile && onOpenChange ? (
        <Dialog.Root
          onOpenChange={(nextOpen) => {
            onOpenChange(nextOpen);
          }}
          open={open}
        >
          <Dialog.Portal>
            <Dialog.Backdrop className={styles['ming-app-shell__dialog-backdrop']} />
            <Dialog.Viewport
              className={
                styles['ming-app-shell__dialog-viewport'] +
                ' ' +
                styles['ming-app-shell__mobile-viewport']
              }
            >
              <Dialog.Popup
                className={styles['ming-app-shell__mobile-navigation']}
                finalFocus={toggleRef}
                id={navigationId}
              >
                <Dialog.Title className={styles['ming-app-shell__mobile-title']}>
                  {navigationLabel}
                </Dialog.Title>
                <div className={styles['ming-app-shell__mobile-close-action']}>
                  <Dialog.Close
                    aria-label="Close navigation"
                    render={<Button iconOnly size="sm" variant="ghost" />}
                  >
                    <CloseIcon />
                  </Dialog.Close>
                </div>
                {navigation}
              </Dialog.Popup>
            </Dialog.Viewport>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </div>
  );
}
