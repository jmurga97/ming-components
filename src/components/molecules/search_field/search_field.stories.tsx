import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { SearchField } from './search_field';

const meta = {
  title: 'Molecules/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Search media',
    placeholder: 'Search media',
    value: '',
    onValueChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('searchbox', { name: 'Search media' }), 'p');
    await expect(args.onValueChange).toHaveBeenCalledWith('p', expect.anything());
  },
};

export const WithQuery: Story = { args: { value: 'editorial' } };
