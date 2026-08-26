import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { axeVerify } from '../../../test/helpers';
import { TagPicker } from './tag_picker';

const OPTIONS = [
  { id: 'editorial', label: 'Editorial' },
  { disabled: true, id: 'archived', label: 'Archived' },
  { id: 'portrait', label: 'Portrait' },
];

function PickerHarness({ onChange }: { onChange?: (ids: string[]) => void }): React.JSX.Element {
  const [value, setValue] = useState<string[]>([]);
  return (
    <TagPicker
      onValueChange={(ids) => {
        onChange?.(ids);
        setValue(ids);
      }}
      options={OPTIONS}
      value={value}
    />
  );
}

describe('TagPicker', () => {
  it('filters options case-insensitively as the query changes', async () => {
    const user = userEvent.setup();
    render(<PickerHarness />);

    await user.type(screen.getByRole('searchbox', { name: 'Select tags' }), 'POR');

    expect(screen.getByRole('option', { name: /Portrait/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Editorial/ })).not.toBeInTheDocument();
  });

  it('reports selection payloads in insertion order', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<PickerHarness onChange={onValueChange} />);

    await user.click(screen.getByRole('option', { name: /Portrait/ }));
    await user.click(screen.getByRole('option', { name: /Editorial/ }));

    expect(onValueChange).toHaveBeenNthCalledWith(1, ['portrait']);
    expect(onValueChange).toHaveBeenNthCalledWith(2, ['portrait', 'editorial']);
  });

  it('toggles previously selected options off through the controlled value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TagPicker onValueChange={onValueChange} options={OPTIONS} value={['portrait']} />);

    const portrait = screen.getByRole('option', { name: /Portrait/ });
    expect(portrait).toHaveAttribute('aria-selected', 'true');

    await user.click(portrait);

    expect(onValueChange).toHaveBeenCalledWith([]);
  });

  it('moves focus into the options with arrow keys and skips disabled rows', async () => {
    const user = userEvent.setup();
    render(<PickerHarness />);

    const input = screen.getByRole('searchbox', { name: 'Select tags' });
    await user.type(input, '{ArrowDown}');
    expect(screen.getByRole('option', { name: /Editorial/ })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: /Portrait/ })).toHaveFocus();

    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(screen.getByRole('option', { name: /Portrait/ })).toHaveFocus();

    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Portrait/ })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });

  it('keeps the multiselect listbox semantics and announces the count', () => {
    render(
      <TagPicker onValueChange={vi.fn()} options={OPTIONS} value={['editorial', 'portrait']} />,
    );

    const listbox = screen.getByRole('listbox', { name: 'Select tags' });
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByText('2 tags selected')).toBeInTheDocument();
  });

  it('shows the empty message when nothing matches', async () => {
    const user = userEvent.setup();
    render(<PickerHarness />);

    await user.type(screen.getByRole('searchbox', { name: 'Select tags' }), 'zzz');

    expect(screen.getByRole('listbox')).toHaveTextContent('No tags found.');
  });

  it('blocks filtering and selection while disabled', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TagPicker disabled onValueChange={onValueChange} options={OPTIONS} value={[]} />);

    const input = screen.getByRole('searchbox', { name: 'Select tags' });
    expect(input).toBeDisabled();

    await user.click(screen.getByRole('option', { name: /Editorial/ }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has no detectable accessibility violations with a selection pending', async () => {
    const { container } = render(
      <TagPicker
        ariaLabel="Session tags"
        onValueChange={vi.fn()}
        options={OPTIONS}
        value={['portrait']}
      />,
    );
    await axeVerify(container);
  });
});
