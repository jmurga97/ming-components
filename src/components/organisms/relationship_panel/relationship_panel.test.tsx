import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { RelationshipPanel } from './relationship_panel';

const ITEMS = [
  { description: 'Thursdays 19:00', id: 'session', label: 'Evening session' },
  { disabled: true, id: 'locked', label: 'Private event' },
];

describe('RelationshipPanel', () => {
  it('reports activation through onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RelationshipPanel items={ITEMS} onValueChange={onValueChange} title="Related sessions" />,
    );

    await user.click(screen.getByRole('button', { name: /Evening session/ }));

    expect(onValueChange).toHaveBeenCalledWith('session');
  });

  it('renders static rows when no callback is provided', () => {
    render(<RelationshipPanel items={ITEMS} title="Related sessions" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Evening session')).toBeInTheDocument();
  });

  it('blocks disabled rows at both levels', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <RelationshipPanel
        items={[{ id: 'session', label: 'Evening session' }]}
        onValueChange={onValueChange}
        title="Related sessions"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Evening session' }));
    expect(onValueChange).toHaveBeenCalledTimes(1);

    rerender(
      <RelationshipPanel
        items={ITEMS}
        disabled
        onValueChange={onValueChange}
        title="Related sessions"
      />,
    );
    await user.click(screen.getByRole('button', { name: /Evening session/ }));

    expect(onValueChange).toHaveBeenCalledOnce();
  });

  it('shows the empty label without a list', () => {
    render(
      <RelationshipPanel emptyLabel="Nothing related yet." items={[]} title="Related sessions" />,
    );

    expect(screen.getByText('Nothing related yet.')).toBeInTheDocument();
    expect(document.querySelector('ul')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations in both modes', async () => {
    const interactive = render(
      <RelationshipPanel
        items={[{ id: 'session', label: 'Evening session' }]}
        onValueChange={vi.fn()}
        title="Related sessions"
      />,
    );
    await axeVerify(interactive.container);
  });
});
