import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { DropdownMenu } from './dropdown_menu';

const refresh = fn();
const reset = fn();

const meta = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Example actions',
    trigger: <span>Actions</span>,
    items: [
      { id: 'refresh', label: 'Refresh examples', onSelect: refresh },
      { id: 'reset', label: 'Reset examples', onSelect: reset, separatorBefore: true },
    ],
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Example actions' }));
    await userEvent.click(
      await within(canvasElement.ownerDocument.body).findByRole('menuitem', {
        name: 'Refresh examples',
      }),
    );
    await expect(refresh).toHaveBeenCalledTimes(1);
  },
};

export const DestructiveAction: Story = {
  args: {
    items: [{ id: 'delete', label: 'Delete item', onSelect: fn(), tone: 'destructive' }],
  },
};
