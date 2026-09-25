import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Button } from '../../atoms/button/button';
import { BulkActions } from './bulk_actions';

const meta = {
  title: 'Organisms/BulkActions',
  component: BulkActions,
  tags: ['autodocs'],
  args: {
    actions: (
      <Button size="sm" variant="secondary">
        Archive
      </Button>
    ),
    count: 2,
    onClearSelection: fn(),
    status: '2 sessions selected',
  },
} satisfies Meta<typeof BulkActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Clear selection' }));
    await expect(args.onClearSelection).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = { args: { disabled: true } };
