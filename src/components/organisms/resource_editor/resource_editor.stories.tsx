import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Field } from '../../atoms/field/field';
import { Input } from '../../atoms/input/input';
import { StatusText } from '../../atoms/status_text/status_text';
import { ResourceEditor } from './resource_editor';

const meta = {
  title: 'Organisms/ResourceEditor',
  component: ResourceEditor,
  tags: ['autodocs'],
  args: {
    children: (
      <Field label="Restaurant name" required>
        <Input defaultValue="Casa Ming" />
      </Field>
    ),
    aside: <p>Changes are visible to guests after saving.</p>,
    dirty: true,
    description: 'Update the public identity for this restaurant.',
    onCancel: fn(),
    onDelete: fn(),
    onSave: fn(),
    resourceTitle: 'Restaurant settings',
    status: <StatusText tone="warning">Unsaved changes</StatusText>,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ResourceEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dirty: Story = {};
export const Saving: Story = { args: { saving: true, status: 'Saving changes…' } };
