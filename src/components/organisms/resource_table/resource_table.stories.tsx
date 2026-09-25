import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { ResourceTable } from './resource_table';

interface Session {
  id: string;
  photos: number;
  title: string;
}

const meta = {
  title: 'Organisms/ResourceTable',
  component: ResourceTable<Session>,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Recent sessions',
    columns: [
      { id: 'title', header: 'Session', render: (row) => row.title, sortable: true },
      { id: 'photos', header: 'Photos', render: (row) => row.photos, align: 'end' },
    ],
    getRowId: (row) => row.id,
    onSelectionChange: fn(),
    rows: [{ id: 'evening', title: 'Evening editorial', photos: 24 }],
    selectionLabels: { row: (row) => `Select row ${row.id}` },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ResourceTable<Session>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selectable: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select row evening' }));
    await expect(args.onSelectionChange).toHaveBeenCalledWith(['evening']);
  },
};

export const Empty: Story = { args: { rows: [], onSelectionChange: undefined } };
