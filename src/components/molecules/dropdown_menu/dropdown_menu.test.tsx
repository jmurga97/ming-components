import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { PortalHost, axeVerify } from '../../../test/helpers';
import { DropdownMenu } from './dropdown_menu';

function ControlledHarness(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu
      ariaLabel="Table actions"
      items={[{ id: 'details', label: 'Show details', onSelect: vi.fn() }]}
      onOpenChange={setOpen}
      open={open}
      trigger="Actions"
    />
  );
}

describe('DropdownMenu', () => {
  it('operates with arrow keys and restores focus after selection', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu
        ariaLabel="Menu actions"
        items={[
          { id: 'edit', label: 'Edit', onSelect },
          { disabled: true, id: 'archive', label: 'Archive', onSelect },
        ]}
        trigger="Actions"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Menu actions' });
    await user.click(trigger);
    expect(await screen.findByRole('menu')).toBeVisible();
    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    });

    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <DropdownMenu
        ariaLabel="Menu actions"
        items={[{ id: 'edit', label: 'Edit', onSelect: vi.fn() }]}
        onOpenChange={onOpenChange}
        trigger="Actions"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Menu actions' });
    await user.click(trigger);
    await screen.findByRole('menu');
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('keeps the menu closed while controlled until the parent opens it', async () => {
    const user = userEvent.setup();
    render(<ControlledHarness />);

    const trigger = screen.getByRole('button', { name: 'Table actions' });
    await user.click(trigger);

    expect(await screen.findByRole('menu')).toBeVisible();
  });

  it('marks destructive and separated items for styling', () => {
    render(
      <DropdownMenu
        ariaLabel="Row actions"
        defaultOpen
        items={[
          { id: 'duplicate', label: 'Duplicate', onSelect: vi.fn() },
          {
            id: 'remove',
            label: 'Remove',
            onSelect: vi.fn(),
            separatorBefore: true,
            tone: 'destructive',
          },
        ]}
        trigger="Row"
      />,
    );

    expect(screen.getByRole('menuitem', { name: 'Remove' })).toHaveClass(
      'ming-dropdown-menu__item--destructive',
      'ming-dropdown-menu__item--separated',
    );
  });

  it('ignores disabled items', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu
        ariaLabel="Row actions"
        defaultOpen
        items={[{ disabled: true, id: 'archive', label: 'Archive', onSelect }]}
        trigger="Row"
      />,
    );

    const item = await screen.findByRole('menuitem', { name: 'Archive' });
    expect(item).toHaveAttribute('aria-disabled', 'true');

    await user.click(item);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('stays closed while the trigger is disabled', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        ariaLabel="Row actions"
        disabled
        items={[{ id: 'edit', label: 'Edit', onSelect: vi.fn() }]}
        trigger="Row"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Row actions' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders inside an injected portal container', async () => {
    render(
      <PortalHost>
        {(container) =>
          container ? (
            <DropdownMenu
              ariaLabel="Table actions"
              defaultOpen
              items={[{ id: 'details', label: 'Show details', onSelect: vi.fn() }]}
              portalContainer={container}
              trigger="Actions"
            />
          ) : null
        }
      </PortalHost>,
    );

    const menu = await screen.findByRole('menu');
    expect(menu.closest('[data-testid="portal-host"]')).toBeInTheDocument();
  });

  it('has no detectable accessibility violations while open', async () => {
    function OpenMenu(): React.JSX.Element {
      const [host, setHost] = useState<HTMLDivElement | null>(null);
      return (
        <main>
          <div ref={setHost} />
          {host ? (
            <DropdownMenu
              ariaLabel="Table actions"
              defaultOpen
              items={[{ id: 'details', label: 'Show details', onSelect: vi.fn() }]}
              portalContainer={host}
              trigger="Actions"
            />
          ) : null}
        </main>
      );
    }

    const { container } = render(<OpenMenu />);
    await screen.findByRole('menu');
    await axeVerify(container.ownerDocument.body);
  });
});
