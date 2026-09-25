import type { Meta, StoryObj } from '@storybook/react-vite';

import { OverviewPanel } from './overview_panel';

const meta = {
  title: 'Organisms/OverviewPanel',
  component: OverviewPanel,
  tags: ['autodocs'],
  args: {
    description: 'Operational blocks keep data, actions and state explicit.',
    stats: [
      { id: 'sessions', label: 'Sessions', value: '12' },
      { id: 'photos', label: 'Photos', value: '184' },
      { id: 'tags', label: 'Tags', value: '9' },
    ],
    status: { label: 'Live data', tone: 'success' },
    title: 'Portfolio health',
  },
} satisfies Meta<typeof OverviewPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {};
export const Loading: Story = { args: { loading: true } };
