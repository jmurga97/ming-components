import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { PortalHost, axeVerify } from '../../../test/helpers';
import { Select } from './select';

describe('Select', () => {
  it('opens by keyboard, selects an option and reports the controlled sequence', async () => {
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

    const trigger = screen.getByRole('combobox', { name: 'Language' });
    await user.tab();
    await user.keyboard('{ArrowDown}');

    expect(await screen.findByRole('listbox')).toBeVisible();

    await user.click(screen.getByRole('option', { name: 'English' }));

    expect(onValueChange).toHaveBeenCalledWith('en');
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(trigger).toHaveTextContent('English');
  });

  it('moves focus into the list and restores it to the trigger on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Select
        ariaLabel="Language"
        defaultValue="es"
        options={[
          { id: 'es', label: 'Español' },
          { id: 'en', label: 'English' },
        ]}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: 'Language' }));
    const selectedOption = await screen.findByRole('option', { name: 'Español' });
    await waitFor(() => {
      expect(selectedOption).toHaveFocus();
    });

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('shows the placeholder before a value is chosen', () => {
    render(
      <Select
        ariaLabel="Language"
        options={[{ id: 'es', label: 'Español' }]}
        placeholder="Pick one"
      />,
    );

    expect(screen.getByRole('combobox', { name: 'Language' })).toHaveTextContent('Pick one');
  });

  it('ignores disabled options', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Select
        ariaLabel="Language"
        onValueChange={onValueChange}
        options={[
          { id: 'es', label: 'Español' },
          { disabled: true, id: 'eu', label: 'Euskara' },
        ]}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: 'Language' }));
    await user.click(await screen.findByRole('option', { name: 'Euskara' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('stays closed while disabled', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Select
        ariaLabel="Language"
        disabled
        onOpenChange={onOpenChange}
        options={[{ id: 'es', label: 'Español' }]}
      />,
    );

    await user.click(screen.getByRole('combobox', { name: 'Language' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('suppresses value changes while readOnly', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Select
        ariaLabel="Language"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        options={[{ id: 'es', label: 'Español' }]}
        readOnly
      />,
    );

    await user.click(screen.getByRole('combobox', { name: 'Language' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders its popup inside an injected portal container', async () => {
    render(
      <PortalHost>
        {(container) =>
          container ? (
            <Select
              ariaLabel="Language"
              defaultOpen
              options={[{ id: 'es', label: 'Español' }]}
              portalContainer={container}
            />
          ) : null
        }
      </PortalHost>,
    );

    const listbox = await screen.findByRole('listbox');
    expect(listbox.closest('[data-testid="portal-host"]')).toBeInTheDocument();
  });

  it('has no detectable accessibility violations when open', async () => {
    function OpenSelect(): React.JSX.Element {
      const [host, setHost] = useState<HTMLDivElement | null>(null);
      return (
        <main>
          <div ref={setHost} />
          {host ? (
            <Select
              ariaLabel="Language"
              defaultOpen
              options={[
                { id: 'es', label: 'Español' },
                { id: 'en', label: 'English' },
              ]}
              portalContainer={host}
            />
          ) : null}
        </main>
      );
    }

    const { container } = render(<OpenSelect />);
    await screen.findByRole('listbox');
    await axeVerify(container.ownerDocument.body);
  });
});
