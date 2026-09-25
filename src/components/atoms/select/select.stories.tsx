import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { Select } from './select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Primary language',
    options: [
      { id: 'es', label: 'Español' },
      { id: 'en', label: 'English' },
      { id: 'eu', label: 'Euskara' },
    ],
    onValueChange: fn(),
    value: 'es',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Primary language' }));
    await userEvent.click(
      await within(canvasElement.ownerDocument.body).findByRole('option', { name: 'English' }),
    );
    await expect(args.onValueChange).toHaveBeenCalledWith('en');
  },
};

export const Placeholder: Story = { args: { placeholder: 'Choose a language', value: null } };
