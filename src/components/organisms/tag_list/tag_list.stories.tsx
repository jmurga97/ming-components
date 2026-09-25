import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { TagList } from './tag_list';

const meta = {
  title: 'Organisms/TagList',
  component: TagList,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Session tags',
    interactive: true,
    items: [
      { id: 'editorial', label: 'Editorial' },
      { id: 'portrait', label: 'Portrait' },
      { id: 'still-life', label: 'Still life' },
    ],
    onValueChange: fn(),
    value: ['portrait'],
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Editorial' }));
    await expect(args.onValueChange).toHaveBeenCalledWith(['portrait', 'editorial']);
  },
};

export const Static: Story = { args: { interactive: false, onValueChange: undefined } };
