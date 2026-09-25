import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Input } from './input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Restaurant name',
    defaultValue: 'Casa Ming',
    onValueChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Restaurant name' });
    await userEvent.clear(input);
    await userEvent.type(input, 'Casa Ming');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('Casa Ming', expect.anything());
  },
};

export const Invalid: Story = { args: { invalid: true, 'aria-label': 'Invalid name' } };
