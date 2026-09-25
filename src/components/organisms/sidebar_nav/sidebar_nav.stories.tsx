import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { StatusText } from '../../atoms/status_text/status_text';
import { SidebarNav } from './sidebar_nav';

const meta = {
  title: 'Organisms/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Workspace navigation',
    header: <strong>Casa Ming</strong>,
    footer: <StatusText tone="success">Service online</StatusText>,
    items: [
      { id: 'overview', label: 'Overview', current: true },
      { id: 'media', label: 'Media' },
      { id: 'settings', label: 'Settings' },
    ],
    onNavigate: fn(),
  },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Media' }));
    await expect(args.onNavigate).toHaveBeenCalledWith('media');
  },
};

export const Collapsed: Story = { args: { collapsed: true, footer: undefined, header: undefined } };
