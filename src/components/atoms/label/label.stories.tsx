import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../input/input';
import { Label } from './label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Restaurant name', htmlFor: 'restaurant-name' },
  render: (args) => (
    <div>
      <Label {...args} />
      <Input id="restaurant-name" />
    </div>
  ),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AssociatedControl: Story = {};
