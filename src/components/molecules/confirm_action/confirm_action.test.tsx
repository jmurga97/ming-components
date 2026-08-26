import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

import { Button } from '../../atoms/button';
import { PortalHost, axeVerify } from '../../../test/helpers';
import { ConfirmAction } from './confirm_action';

interface TriggerHarnessProps {
  pending?: boolean;
  onConfirm?: () => void;
}

function TriggerHarness({ pending = false, onConfirm }: TriggerHarnessProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        ref={triggerRef}
      >
        Remove menu
      </Button>
      <ConfirmAction
        message="This cannot be undone."
        onConfirm={onConfirm ?? vi.fn()}
        onOpenChange={setOpen}
        open={open}
        pending={pending}
        triggerRef={triggerRef}
      />
    </>
  );
}

describe('ConfirmAction', () => {
  it('opens from its trigger and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<TriggerHarness />);

    const trigger = screen.getByRole('button', { name: 'Remove menu' });
    await user.click(trigger);

    expect(screen.getByRole('alertdialog')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    });

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('reports cancel intent and closes', async () => {
    const user = userEvent.setup();
    render(<TriggerHarness />);

    await user.click(screen.getByRole('button', { name: 'Remove menu' }));
    await user.click(await screen.findByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Remove menu' })).toHaveFocus();
  });

  it('confirms without closing while controlled', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmAction
        message="This cannot be undone."
        onConfirm={onConfirm}
        onOpenChange={vi.fn()}
        open
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.getByRole('alertdialog')).toBeVisible();
  });

  it('cancels through the callback contract', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <ConfirmAction
        message="This cannot be undone."
        onCancel={onCancel}
        onConfirm={vi.fn()}
        onOpenChange={onOpenChange}
        open
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables both actions and announces progress while pending', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmAction
        message="This cannot be undone."
        onConfirm={onConfirm}
        onOpenChange={vi.fn()}
        open
        pending
        pendingLabel="Deleting…"
      />,
    );

    const confirm = screen.getByRole('button', { name: 'Deleting…' });
    expect(confirm).toHaveAttribute('aria-busy', 'true');
    expect(confirm).toHaveAttribute('aria-disabled', 'true');

    await user.click(confirm);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('accepts custom copy for every label', () => {
    render(
      <ConfirmAction
        cancelLabel="Keep it"
        confirmLabel="Delete forever"
        message="Seasonal menu disappears."
        onConfirm={vi.fn()}
        onOpenChange={vi.fn()}
        open
        title="Delete menu?"
      />,
    );

    expect(screen.getByText('Delete menu?')).toBeInTheDocument();
    expect(screen.getByText('Seasonal menu disappears.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete forever' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep it' })).toBeInTheDocument();
  });

  it('renders inside an injected portal container', () => {
    render(
      <PortalHost>
        {(container) =>
          container ? (
            <ConfirmAction
              message="This cannot be undone."
              onConfirm={vi.fn()}
              onOpenChange={vi.fn()}
              open
              portalContainer={container}
            />
          ) : null
        }
      </PortalHost>,
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog.closest('[data-testid="portal-host"]')).toBeInTheDocument();
  });

  it('has no detectable accessibility violations while open', async () => {
    const { container } = render(
      <ConfirmAction
        message="The menu and its availability schedule will be removed."
        onConfirm={vi.fn()}
        onOpenChange={vi.fn()}
        open
        title="Delete seasonal menu?"
      />,
    );
    await axeVerify(container.ownerDocument.body);
  });
});
