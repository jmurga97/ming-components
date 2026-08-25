import { cn } from '../../../lib/cn';
import { Button } from '../../atoms/button';

import type { ReactNode } from 'react';

export interface BulkActionsProps {
  actions: ReactNode;
  ariaLabel?: string;
  className?: string;
  clearLabel?: string;
  count: number;
  disabled?: boolean;
  label?: string;
  onClearSelection: () => void;
  status?: ReactNode;
}

export function BulkActions({
  actions,
  ariaLabel = 'Bulk actions',
  className,
  clearLabel = 'Clear selection',
  count,
  disabled = false,
  label,
  onClearSelection,
  status,
}: BulkActionsProps): React.JSX.Element {
  return (
    <div aria-label={ariaLabel} className={cn('ming-bulk-actions', className)} role="toolbar">
      <strong>{label ?? `${String(count)} selected`}</strong>
      <div aria-disabled={disabled || undefined} className="ming-bulk-actions__actions">
        {actions}
      </div>
      {status ? <div className="ming-bulk-actions__status">{status}</div> : null}
      <Button disabled={disabled} onClick={onClearSelection} size="sm" variant="ghost">
        {clearLabel}
      </Button>
    </div>
  );
}
