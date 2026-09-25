import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../../atoms/input/input';
import { FormField } from './form_field';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    children: <Input defaultValue="hello@example.com" type="email" />,
    hint: 'We use this address for account updates.',
    label: 'Email address',
    required: true,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {};
export const Invalid: Story = {
  args: {
    children: <Input aria-invalid="true" defaultValue="not-an-email" type="email" />,
    error: 'Enter a valid email address.',
    hint: undefined,
  },
};
