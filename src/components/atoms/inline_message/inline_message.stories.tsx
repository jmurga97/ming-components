import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineMessage } from './inline_message';

const meta = {
  title: 'Atoms/InlineMessage',
  component: InlineMessage,
  tags: ['autodocs'],
  args: {
    title: 'Published',
    message: 'All public changes are live.',
    tone: 'success',
  },
} satisfies Meta<typeof InlineMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const Failure: Story = {
  args: {
    title: 'Schedule conflict',
    message: 'Check the closing time and try again.',
    tone: 'error',
  },
};
