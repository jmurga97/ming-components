import { cn } from '../../../lib/cn';
import { Button } from '../../atoms/button';

import type { ReactNode, SyntheticEvent } from 'react';

export interface ResourceEditorProps {
  actions?: ReactNode;
  aside?: ReactNode;
  cancelLabel?: string;
  children: ReactNode;
  className?: string;
  deleteLabel?: string;
  deleting?: boolean;
  description?: ReactNode;
  dirty?: boolean;
  error?: ReactNode;
  onCancel: () => void;
  onDelete?: () => void;
  onSave: () => void;
  resourceTitle: ReactNode;
  saveLabel?: string;
  saving?: boolean;
  status?: ReactNode;
}

export function ResourceEditor({
  actions,
  aside,
  cancelLabel = 'Cancel',
  children,
  className,
  deleteLabel = 'Delete',
  deleting = false,
  description,
  dirty = false,
  error,
  onCancel,
  onDelete,
  onSave,
  resourceTitle,
  saveLabel = 'Save changes',
  saving = false,
  status,
}: ResourceEditorProps): React.JSX.Element {
  const pending = saving || deleting;
  function submit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSave();
  }
  return (
    <form className={cn('ming-resource-editor', className)} onSubmit={submit}>
      <header className="ming-resource-editor__header">
        <div>
          <h2>{resourceTitle}</h2>
          {description ? (
            <div className="ming-resource-editor__description">{description}</div>
          ) : null}
        </div>
        <div aria-live="polite" className="ming-resource-editor__state">
          {status ?? (dirty ? 'Unsaved changes' : 'Saved')}
        </div>
      </header>
      {error ? <div className="ming-resource-editor__error">{error}</div> : null}
      <div className="ming-resource-editor__layout">
        <main className="ming-resource-editor__main">{children}</main>
        {aside ? <aside className="ming-resource-editor__aside">{aside}</aside> : null}
      </div>
      <footer className="ming-resource-editor__actions">
        {actions}
        <span className="ming-resource-editor__spacer" />
        {onDelete ? (
          <Button disabled={pending} onClick={onDelete} type="button" variant="destructive">
            {deleting ? 'Deleting…' : deleteLabel}
          </Button>
        ) : null}
        <Button disabled={pending} onClick={onCancel} type="button" variant="secondary">
          {cancelLabel}
        </Button>
        <Button disabled={pending || !dirty} type="submit">
          {saving ? 'Saving…' : saveLabel}
        </Button>
      </footer>
    </form>
  );
}
