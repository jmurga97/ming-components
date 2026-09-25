import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Badge } from '../../atoms/badge/badge';
import { SidebarNav } from '../../organisms/sidebar_nav/sidebar_nav';
import { AppShell } from './app_shell';

const meta = {
  title: 'Templates/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  args: {
    header: <strong>Shared admin core</strong>,
    navigation: (
      <SidebarNav
        ariaLabel="Workspace navigation"
        items={[
          { id: 'overview', label: 'Overview', current: true },
          { id: 'sessions', label: 'Sessions' },
        ]}
      />
    ),
    children: (
      <section>
        <h1>Restaurant settings</h1>
        <p>Manage the public details for this restaurant.</p>
        <Badge tone="success">Published</Badge>
      </section>
    ),
    onOpenChange: fn(),
    open: true,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workspace: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Hide navigation' }));
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const NavigationClosed: Story = { args: { open: false } };
