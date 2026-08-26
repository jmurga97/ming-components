import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { axeVerify } from '../../../test/helpers';
import { TagList } from './tag_list';

const ITEMS = [
  { id: 'editorial', label: 'Editorial' },
  { id: 'portrait', label: 'Portrait' },
];

function InteractiveHarness({
  onChange,
}: {
  onChange?: (ids: string[]) => void;
}): React.JSX.Element {
  const [value, setValue] = useState<string[]>([]);
  return (
    <TagList
      interactive
      items={ITEMS}
      onValueChange={(ids) => {
        onChange?.(ids);
        setValue(ids);
      }}
      value={value}
    />
  );
}

describe('TagList', () => {
  it('toggles membership with multi-select payloads in insertion order', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<InteractiveHarness onChange={onValueChange} />);

    const editorial = screen.getByRole('button', { name: 'Editorial' });
    await user.click(editorial);
    await user.click(screen.getByRole('button', { name: 'Portrait' }));

    expect(onValueChange).toHaveBeenNthCalledWith(1, ['editorial']);
    expect(onValueChange).toHaveBeenNthCalledWith(2, ['editorial', 'portrait']);
    expect(editorial).toHaveAttribute('aria-pressed', 'true');

    await user.click(editorial);
    expect(onValueChange).toHaveBeenLastCalledWith(['portrait']);
    await waitFor(() => {
      expect(editorial).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('exposes an interactive group with the default label', () => {
    render(<TagList interactive items={ITEMS} value={['portrait']} />);

    const group = screen.getByRole('group', { name: 'Tags' });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Portrait' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Editorial' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('renders static spans without interactive affordances by default', () => {
    render(<TagList ariaLabel="Session tags" items={ITEMS} />);

    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Editorial')).toBeVisible();
  });

  it('blocks toggles while disabled at either level', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <TagList disabled interactive items={ITEMS} onValueChange={onValueChange} value={[]} />,
    );

    await user.click(screen.getByRole('button', { name: 'Editorial' }));
    expect(onValueChange).not.toHaveBeenCalled();

    rerender(
      <TagList
        interactive
        items={[
          { ...ITEMS[0], disabled: true } as (typeof ITEMS)[number],
          ITEMS[1] as (typeof ITEMS)[number],
        ]}
        onValueChange={onValueChange}
        value={[]}
      />,
    );
    expect(screen.getByRole('button', { name: 'Editorial' })).toBeDisabled();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<TagList interactive items={ITEMS} value={['portrait']} />);
    await axeVerify(container);
  });
});
