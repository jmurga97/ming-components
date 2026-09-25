import styles from './confirm_action.module.css';
import { AlertDialog } from '@base-ui/react/alert-dialog';

import { Button } from '../../atoms/button';
import { cn } from '../../../lib/cn';

import type { ReactNode, RefObject } from 'react';

export interface ConfirmActionProps {
  cancelLabel?: ReactNode;
  className?: string;
  confirmLabel?: ReactNode;
  message: ReactNode;
  onCancel?: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  pending?: boolean;
  pendingLabel?: ReactNode;
  portalContainer?: HTMLElement | null;
  title?: ReactNode;
  triggerRef?: RefObject<HTMLElement | null>;
}

export function ConfirmAction({
  cancelLabel = 'Cancel',
  className,
  confirmLabel = 'Confirm',
  message,
  onCancel,
  onConfirm,
  onOpenChange,
  open,
  pending = false,
  pendingLabel = 'Working…',
  portalContainer,
  title = 'Confirm action',
  triggerRef,
}: ConfirmActionProps): React.JSX.Element {
  return (
    <AlertDialog.Root
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
      }}
      open={open}
    >
      <AlertDialog.Portal container={portalContainer}>
        <AlertDialog.Backdrop className={styles['ming-confirm-action__backdrop']} />
        <AlertDialog.Viewport className={styles['ming-confirm-action__viewport']}>
          <AlertDialog.Popup
            className={cn(styles['ming-confirm-action'], className)}
            finalFocus={triggerRef}
          >
            <AlertDialog.Title className={styles['ming-confirm-action__title']}>
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className={styles['ming-confirm-action__description']}>
              {message}
            </AlertDialog.Description>
            <div className={styles['ming-confirm-action__actions']}>
              <AlertDialog.Close
                disabled={pending}
                onClick={() => onCancel?.()}
                render={<Button variant="secondary" />}
              >
                {cancelLabel}
              </AlertDialog.Close>
              <Button
                aria-busy={pending}
                disabled={pending}
                focusableWhenDisabled
                onClick={onConfirm}
                variant="destructive"
              >
                {pending ? pendingLabel : confirmLabel}
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
