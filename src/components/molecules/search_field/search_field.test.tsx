import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { axeVerify } from '../../../test/helpers';
import { SearchField } from './search_field';

import type { ComponentProps } from 'react';

type SearchFieldProps = ComponentProps<typeof SearchField>;

interface HarnessProps extends Partial<SearchFieldProps> {
  initialValue?: string;
}

function ControlledSearchField({
  initialValue = '',
  onValueChange,
  ...props
}: HarnessProps): React.JSX.Element {
  const [value, setValue] = useState(initialValue);
  return (
    <SearchField
      aria-label="Search menus"
      onValueChange={(nextValue) => {
        onValueChange?.(nextValue);
        setValue(nextValue);
      }}
      value={value}
      {...props}
    />
  );
}

describe('SearchField', () => {
  it('reports typed values through onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ControlledSearchField onValueChange={onValueChange} />);

    await user.type(screen.getByRole('searchbox', { name: 'Search menus' }), 'rice');

    expect(onValueChange).toHaveBeenLastCalledWith('rice');
  });

  it('only shows the clear affordance once a value exists', async () => {
    const user = userEvent.setup();
    render(<ControlledSearchField />);

    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: 'Search menus' }), 'rice');
    expect(await screen.findByRole('button', { name: 'Clear search' })).toBeVisible();
  });

  it('clears through onClear without rewriting the value', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onValueChange = vi.fn();
    render(
      <ControlledSearchField initialValue="rice" onClear={onClear} onValueChange={onValueChange} />,
    );

    await user.click(await screen.findByRole('button', { name: 'Clear search' }));

    expect(onClear).toHaveBeenCalledOnce();
    expect(onValueChange).not.toHaveBeenCalledWith('');
  });

  it('falls back to clearing the value when no onClear is given', async () => {
    const user = userEvent.setup();
    render(<ControlledSearchField initialValue="rice" />);

    await user.click(await screen.findByRole('button', { name: 'Clear search' }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    });
    expect(screen.getByRole('searchbox', { name: 'Search menus' })).toHaveValue('');
  });

  it('renames the clear control for the context', async () => {
    const user = userEvent.setup();
    render(<ControlledSearchField clearLabel="Reset filters" />);

    await user.type(screen.getByRole('searchbox', { name: 'Search menus' }), 'tofu');

    expect(await screen.findByRole('button', { name: 'Reset filters' })).toBeInTheDocument();
  });

  it('disables input and clear action together', () => {
    render(<ControlledSearchField disabled initialValue="rice" />);

    expect(screen.getByRole('searchbox', { name: 'Search menus' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeDisabled();
  });

  it('exposes the region as a search landmark', () => {
    render(<ControlledSearchField />);

    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('has no detectable accessibility violations with a pending query', async () => {
    const { container } = render(
      <SearchField aria-label="Search menus" onValueChange={vi.fn()} value="ramen" />,
    );
    await axeVerify(container);
  });
});
