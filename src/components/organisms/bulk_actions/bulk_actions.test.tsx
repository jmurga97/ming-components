import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../atoms/button';
import { StatusText } from '../../atoms/status_text';
import { axeVerify } from '../../../test/helpers';
import { BulkActions } from './bulk_actions';

describe('BulkActions', () => {
  it('connects the clear action to the selection contract', async () => {
    const user = userEvent.setup();
    const onClearSelection = vi.fn();
    render(
      <BulkActions
        actions={<Button size="sm">Archive</Button>}
        count={2}
        onClearSelection={onClearSelection}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Clear selection' }));

    expect(onClearSelection).toHaveBeenCalledOnce();
  });

  it('announces the selection size with a toolbar role', () => {
    render(<BulkActions actions={null} count={7} onClearSelection={vi.fn()} />);

    const toolbar = screen.getByRole('toolbar', { name: 'Bulk actions' });
    expect(toolbar).toHaveTextContent('7 selected');
  });

  it('accepts custom labels and a status slot', () => {
    render(
      <BulkActions
        actions={null}
        clearLabel="Deselect all"
        count={3}
        label="Three rows ready"
        onClearSelection={vi.fn()}
        status={<StatusText tone="warning">2 locked</StatusText>}
      />,
    );

    expect(screen.getByRole('toolbar', { name: 'Bulk actions' })).toHaveTextContent(
      'Three rows ready',
    );
    expect(screen.getByRole('button', { name: 'Deselect all' })).toBeInTheDocument();
    expect(screen.getByText('2 locked')).toBeInTheDocument();
  });

  it('marks the action area unavailable while disabled without hiding it', async () => {
    const user = userEvent.setup();
    const onClearSelection = vi.fn();
    render(
      <BulkActions
        actions={<Button size="sm">Archive</Button>}
        count={2}
        disabled
        onClearSelection={onClearSelection}
      />,
    );

    expect(screen.getByRole('button', { name: 'Archive' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Archive' }).closest('.ming-bulk-actions__actions'),
    ).toHaveAttribute('aria-disabled', 'true');

    await user.click(screen.getByRole('button', { name: 'Clear selection' }));

    expect(onClearSelection).not.toHaveBeenCalled();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <BulkActions
        actions={<Button size="sm">Archive</Button>}
        count={4}
        onClearSelection={vi.fn()}
      />,
    );
    await axeVerify(container);
  });
});
