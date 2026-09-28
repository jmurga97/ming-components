import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import * as icons from './icon';

const ENTRIES = Object.entries(icons).filter(([name]) => name.endsWith('Icon'));

const meta = {
  title: 'Atoms/Icon',
  component: icons.SearchIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof icons.SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <ul
      style={{
        display: 'grid',
        gap: 'var(--ming-space-4)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {ENTRIES.map(([name, Icon]) => (
        <li
          key={name}
          style={{ alignItems: 'center', display: 'flex', gap: 'var(--ming-space-3)' }}
        >
          <Icon />
          <code>{name}</code>
        </li>
      ))}
    </ul>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(ENTRIES.length);
  },
};

export const Labelled: Story = {
  args: { 'aria-label': 'Search' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Search' })).toBeVisible();
  },
};
