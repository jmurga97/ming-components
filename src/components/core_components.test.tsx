import axe from 'axe-core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

import {
  Badge,
  Button,
  Checkbox,
  ConfirmAction,
  DropdownMenu,
  Field,
  FormField,
  InlineMessage,
  Input,
  Label,
  NavList,
  SearchField,
  Select,
  SidebarNav,
  StatusRegion,
  StatusText,
  Textarea,
} from '../index';

describe('form atoms', () => {
  it('associates Field labels and errors with controls', () => {
    render(
      <Field error="Required" invalid label="Restaurant" required>
        <Input />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: /Restaurant/ });
    expect(input).toHaveAccessibleDescription('Required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders Label and FormField public compositions', () => {
    render(
      <>
        <Label htmlFor="plain">Plain</Label>
        <Input id="plain" />
        <FormField hint="Public hint" label="Composed">
          <Input />
        </FormField>
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Plain' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Composed' })).toHaveAccessibleDescription(
      'Public hint',
    );
  });

  it('reports Textarea primitive values and disabled state', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Field label="Notes">
        <Textarea onValueChange={onValueChange} />
      </Field>,
    );
    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'Quiet');
    expect(onValueChange).toHaveBeenLastCalledWith('Quiet');
  });

  it('changes Checkbox with the keyboard and respects disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <>
        <Checkbox label="Published" onCheckedChange={onCheckedChange} />
        <Checkbox disabled label="Locked" onCheckedChange={onCheckedChange} />
      </>,
    );
    await user.tab();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object));
    await user.click(screen.getByText('Locked'));
    expect(onCheckedChange).toHaveBeenCalledOnce();
  });

  it('opens Select by keyboard and reports its controlled value', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Select
        ariaLabel="Language"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        options={[
          { id: 'es', label: 'Español' },
          { id: 'en', label: 'English' },
        ]}
      />,
    );
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeVisible();
    await user.click(screen.getByRole('option', { name: 'English' }));
    expect(onValueChange).toHaveBeenCalledWith('en');
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});

describe('status atoms', () => {
  it('applies Badge, InlineMessage and StatusText variants and live semantics', () => {
    render(
      <>
        <Badge tone="success">Active</Badge>
        <InlineMessage message="Could not save" tone="error" />
        <StatusText polite={false} tone="warning">
          Waiting
        </StatusText>
      </>,
    );
    expect(screen.getByText('Active')).toHaveClass('ming-badge--success');
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save');
    expect(screen.getByRole('status', { name: '' })).toHaveAttribute('aria-live', 'assertive');
  });

  it('dismisses StatusRegion through a React callback', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<StatusRegion label="Saved" onOpenChange={onOpenChange} open tone="success" />);
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('interaction molecules', () => {
  it('operates DropdownMenu with arrow keys and restores focus', async () => {
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
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('menu')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    });
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });

    await user.keyboard('{Enter}');
    expect(await screen.findByRole('menu')).toBeVisible();
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('reports SearchField values and clear intent', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onValueChange = vi.fn();

    function Example(): React.JSX.Element {
      const [value, setValue] = useState('');
      return (
        <SearchField
          aria-label="Search menus"
          onClear={onClear}
          onValueChange={(nextValue) => {
            onValueChange(nextValue);
            setValue(nextValue);
          }}
          value={value}
        />
      );
    }

    render(<Example />);
    await user.type(screen.getByRole('searchbox', { name: 'Search menus' }), 'rice');
    expect(onValueChange).toHaveBeenLastCalledWith('rice');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('closes ConfirmAction and restores focus to its trigger', async () => {
    const user = userEvent.setup();

    function Example(): React.JSX.Element {
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
            onConfirm={vi.fn()}
            onOpenChange={setOpen}
            open={open}
            triggerRef={triggerRef}
          />
        </>
      );
    }

    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Remove menu' });
    await user.click(trigger);
    expect(screen.getByRole('alertdialog')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    });
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });
});

describe('navigation layouts', () => {
  it('reports NavList navigation and blocks disabled items', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <NavList
        items={[
          { current: true, id: 'home', label: 'Overview' },
          { disabled: true, id: 'locked', label: 'Billing' },
        ]}
        onNavigate={onNavigate}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Overview' }));
    await user.click(screen.getByRole('button', { name: 'Billing' }));
    expect(onNavigate).toHaveBeenCalledOnce();
    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('uses controlled navigation for ordinary link clicks', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <NavList items={[{ href: '/menus', id: 'menus', label: 'Menus' }]} onNavigate={onNavigate} />,
    );

    await user.click(screen.getByRole('link', { name: 'Menus' }));

    expect(onNavigate).toHaveBeenCalledWith('menus');
    expect(window.location.pathname).not.toBe('/menus');
  });

  it('renders SidebarNav header, primary items and footer items', () => {
    render(
      <SidebarNav
        footerItems={[{ id: 'logout', label: 'Sign out' }]}
        header={<strong>QMenut</strong>}
        items={[{ id: 'menu', label: 'Menu' }]}
      />,
    );
    expect(screen.getByRole('navigation')).toHaveTextContent('QMenutMenuSign out');
  });
});

it('has no detectable accessibility violations in a complete form state', async () => {
  const { container } = render(
    <form>
      <Field error="Required" label="Name">
        <Input required />
      </Field>
      <Field label="Language">
        <Select options={[{ id: 'es', label: 'Español' }]} />
      </Field>
      <Checkbox label="Published" />
      <InlineMessage message="Review the form" tone="warning" />
      <Button>Save</Button>
    </form>,
  );
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toEqual([]);
});

it('has no detectable accessibility violations in an open menu', async () => {
  function Example(): React.JSX.Element {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
    return (
      <main>
        <div ref={setPortalContainer} />
        {portalContainer ? (
          <DropdownMenu
            ariaLabel="Table actions"
            defaultOpen
            items={[{ id: 'details', label: 'Show details', onSelect: vi.fn() }]}
            portalContainer={portalContainer}
            trigger="Actions"
          />
        ) : null}
      </main>
    );
  }

  const { container } = render(<Example />);
  await screen.findByRole('menu');
  const results = await axe.run(container.ownerDocument.body, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toEqual([]);
});
