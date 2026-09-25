import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { RelationshipPanel } from './relationship_panel';

const meta = {
  title: 'Organisms/RelationshipPanel',
  component: RelationshipPanel,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'evening', label: 'Evening editorial', description: '24 photos' },
      { id: 'portrait', label: 'Studio portraits', description: '18 photos' },
    ],
    onValueChange: fn(),
    title: 'Related sessions',
  },
} satisfies Meta<typeof RelationshipPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLinks: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /evening editorial/i }));
    await expect(args.onValueChange).toHaveBeenCalledWith('evening');
  },
};

export const Empty: Story = { args: { items: [], onValueChange: undefined } };
