import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { NavList } from './nav_list';

const meta = {
  title: 'Molecules/NavList',
  component: NavList,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'overview', label: 'Overview', current: true, description: 'Portfolio summary' },
      { id: 'media', label: 'Media', description: 'Images and assets' },
    ],
    onNavigate: fn(),
  },
} satisfies Meta<typeof NavList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /media/i }));
    await expect(args.onNavigate).toHaveBeenCalledWith('media');
  },
};

export const Collapsed: Story = { args: { collapsed: true } };
