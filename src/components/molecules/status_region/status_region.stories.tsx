import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { StatusRegion } from './status_region';

const meta = {
  title: 'Molecules/StatusRegion',
  component: StatusRegion,
  tags: ['autodocs'],
  args: {
    label: 'Your changes were saved.',
    onOpenChange: fn(),
    open: true,
    tone: 'success',
  },
} satisfies Meta<typeof StatusRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  play: async ({ args, canvasElement, userEvent }) => {
    const notice = within(canvasElement.ownerDocument.body).getByRole('status');
    await userEvent.click(within(notice).getByRole('button', { name: 'Dismiss notification' }));
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const Failure: Story = { args: { label: 'Could not save changes.', tone: 'error' } };
