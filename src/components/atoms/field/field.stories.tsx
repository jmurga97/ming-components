import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../input/input';
import { Field } from './field';

const meta = {
  title: 'Atoms/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    children: <Input defaultValue="Casa Ming" />,
    hint: 'Shown in the menu header.',
    label: 'Restaurant name',
    required: true,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {};
export const Invalid: Story = {
  args: {
    children: <Input aria-invalid="true" defaultValue="" />,
    error: 'Enter a restaurant name.',
    hint: undefined,
    invalid: true,
    required: false,
  },
};
