import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { ResourceEditor } from './resource_editor';

interface EditorHarnessProps {
  dirty?: boolean;
  deleting?: boolean;
  onDelete?: () => void;
  saving?: boolean;
}

function EditorHarness({
  dirty = true,
  deleting = false,
  onDelete = () => {},
  saving = false,
}: EditorHarnessProps): React.JSX.Element {
  return (
    <ResourceEditor
      aside={<p>Metadata</p>}
      deleting={deleting}
      dirty={dirty}
      onCancel={vi.fn()}
      onDelete={onDelete}
      onSave={vi.fn()}
      resourceTitle="Session"
      saving={saving}
    >
      <label>
        Title
        <input />
      </label>
    </ResourceEditor>
  );
}

describe('ResourceEditor', () => {
  it('reports save, cancel and delete through callbacks', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onDelete = vi.fn();
    const onSave = vi.fn();
    render(
      <ResourceEditor
        dirty
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        resourceTitle="Session"
      >
        Content
      </ResourceEditor>,
    );

    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onSave).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('submits the underlying form on request', () => {
    const onSave = vi.fn();
    const { container } = render(
      <ResourceEditor dirty onCancel={vi.fn()} onSave={onSave} resourceTitle="Session">
        <label>
          Title
          <input />
        </label>
      </ResourceEditor>,
    );

    const form = container.querySelector('form');
    if (!form) throw new Error('Missing form');
    fireEvent.submit(form);

    expect(onSave).toHaveBeenCalledOnce();
  });

  it('keeps Save unavailable until the editor is dirty', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const { rerender } = render(
      <ResourceEditor onCancel={vi.fn()} onSave={onSave} resourceTitle="Session">
        Content
      </ResourceEditor>,
    );

    const save = screen.getByRole('button', { name: 'Save changes' });
    expect(save).toBeDisabled();

    rerender(
      <ResourceEditor dirty onCancel={vi.fn()} onSave={onSave} resourceTitle="Session">
        Content
      </ResourceEditor>,
    );
    await user.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(onSave).toHaveBeenCalledOnce();
  });

  it('disables every action and renames the pending buttons while saving', () => {
    render(<EditorHarness saving />);

    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('renames the delete button while deleting', () => {
    render(<EditorHarness deleting />);

    expect(screen.getByRole('button', { name: 'Deleting…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
  });

  it('announces draft state through the polite live region', () => {
    const { rerender } = render(
      <ResourceEditor dirty onCancel={vi.fn()} onSave={vi.fn()} resourceTitle="Session">
        Content
      </ResourceEditor>,
    );

    expect(screen.getByText('Unsaved changes')).toHaveAttribute('aria-live', 'polite');

    rerender(
      <ResourceEditor onCancel={vi.fn()} onSave={vi.fn()} resourceTitle="Session">
        Content
      </ResourceEditor>,
    );
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('renders the error banner and omits the delete button when no handler is given', () => {
    render(
      <ResourceEditor
        error="The server rejected the last change."
        onCancel={vi.fn()}
        onSave={vi.fn()}
        resourceTitle="Session"
      >
        Content
      </ResourceEditor>,
    );

    expect(screen.getByText('The server rejected the last change.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations while dirty with an error', async () => {
    const { container } = render(
      <ResourceEditor
        dirty
        error="Check the schedule conflicts."
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        onSave={vi.fn()}
        resourceTitle="Session"
        status={<span>Autosave paused</span>}
      >
        <label>
          Title
          <input />
        </label>
      </ResourceEditor>,
    );
    await axeVerify(container);
  });
});
