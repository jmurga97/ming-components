import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import media from './media-example.svg';
import { MediaBrowser } from './media_browser';

const meta = {
  title: 'Organisms/MediaBrowser',
  component: MediaBrowser,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'editorial', alt: 'Editorial cover image', caption: 'Editorial', src: media },
      { id: 'still-life', alt: 'Still life cover image', caption: 'Still life', src: media },
    ],
    onValueChange: fn(),
    selectedId: 'editorial',
  },
} satisfies Meta<typeof MediaBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImages: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Still life cover image' }));
    await expect(args.onValueChange).toHaveBeenCalledWith('still-life');
  },
};

export const Empty: Story = {
  args: {
    items: [],
    onValueChange: undefined,
    emptyLabel: 'Add a public image URL to preview media.',
  },
};
