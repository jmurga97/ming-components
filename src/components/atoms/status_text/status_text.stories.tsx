import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusText } from './status_text';

const meta = {
  title: 'Atoms/StatusText',
  component: StatusText,
  tags: ['autodocs'],
  args: { children: 'Service online', tone: 'success' },
} satisfies Meta<typeof StatusText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const Warning: Story = { args: { children: 'Action required', tone: 'warning' } };
