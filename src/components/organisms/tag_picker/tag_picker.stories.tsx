import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { TagPicker } from './tag_picker';

const meta = {
  title: 'Organisms/TagPicker',
  component: TagPicker,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Select session tags',
    onValueChange: fn(),
    options: [
      { id: 'editorial', label: 'Editorial' },
      { id: 'portrait', label: 'Portrait' },
      { id: 'still-life', label: 'Still life' },
    ],
    value: ['portrait'],
  },
} satisfies Meta<typeof TagPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchAndSelect: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('option', { name: 'Editorial' }));
    await expect(args.onValueChange).toHaveBeenCalledWith(['portrait', 'editorial']);
  },
};

export const Disabled: Story = { args: { disabled: true } };
