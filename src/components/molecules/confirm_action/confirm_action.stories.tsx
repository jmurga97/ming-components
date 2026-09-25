import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { ConfirmAction } from './confirm_action';

const meta = {
  title: 'Molecules/ConfirmAction',
  component: ConfirmAction,
  tags: ['autodocs'],
  args: {
    title: 'Delete seasonal menu?',
    message: 'The menu will be removed. This cannot be undone.',
    cancelLabel: 'Keep menu',
    confirmLabel: 'Delete menu',
    onCancel: fn(),
    onConfirm: fn(),
    onOpenChange: fn(),
    open: true,
  },
} satisfies Meta<typeof ConfirmAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ args, canvasElement, userEvent }) => {
    const dialog = within(canvasElement.ownerDocument.body).getByRole('alertdialog');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Delete menu' }));
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  },
};

export const Pending: Story = { args: { pending: true, pendingLabel: 'Removing menu…' } };
