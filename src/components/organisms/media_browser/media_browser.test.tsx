import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { MediaBrowser } from './media_browser';

const ITEMS = [
  { id: 'portrait', src: '/portrait.jpg', thumbnailSrc: '/portrait-thumb.jpg', alt: 'Portrait' },
  { id: 'kitchen', src: '/kitchen.jpg', alt: 'Kitchen' },
];

describe('MediaBrowser', () => {
  it('reports single selection through onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<MediaBrowser items={ITEMS} onValueChange={onValueChange} selectedId="portrait" />);

    await user.click(screen.getByRole('button', { name: 'Kitchen' }));

    expect(onValueChange).toHaveBeenCalledWith('kitchen');
  });

  it('follows the controlled selected id', async () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <MediaBrowser items={ITEMS} onValueChange={onValueChange} selectedId="portrait" />,
    );

    expect(screen.getByRole('img', { name: 'Portrait' })).toHaveAttribute('src', '/portrait.jpg');
    expect(screen.getByRole('button', { name: 'Portrait' })).toHaveAttribute(
      'aria-current',
      'true',
    );

    rerender(<MediaBrowser items={ITEMS} onValueChange={onValueChange} selectedId="kitchen" />);
    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Kitchen' })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Kitchen' })).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByRole('img', { name: 'Portrait' })).not.toBeInTheDocument();
  });

  it('falls back to the first item when the selected id is missing', () => {
    render(<MediaBrowser items={ITEMS} selectedId="missing" />);

    expect(screen.getByRole('img', { name: 'Portrait' })).toBeInTheDocument();
  });

  it('shows thumbnails before falling back to the full source', () => {
    render(<MediaBrowser items={ITEMS} />);

    expect(screen.getByRole('button', { name: 'Portrait' }).querySelector('img')).toHaveAttribute(
      'src',
      '/portrait-thumb.jpg',
    );
    expect(screen.getByRole('button', { name: 'Kitchen' }).querySelector('img')).toHaveAttribute(
      'src',
      '/kitchen.jpg',
    );
  });

  it('hides the rail for a single item or when showRail is false', () => {
    const { rerender } = render(<MediaBrowser items={[ITEMS[0] as (typeof ITEMS)[number]]} />);

    expect(screen.queryByRole('list', { name: 'Media thumbnails' })).not.toBeInTheDocument();

    rerender(<MediaBrowser items={ITEMS} showRail={false} />);
    expect(screen.queryByRole('list', { name: 'Media thumbnails' })).not.toBeInTheDocument();

    rerender(<MediaBrowser items={ITEMS} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders captions under the figure', () => {
    render(
      <MediaBrowser
        items={[
          { caption: 'Evening service', id: 'dining', src: '/dining.jpg', alt: 'Dining room' },
        ]}
      />,
    );

    expect(screen.getByText('Evening service').tagName).toBe('FIGCAPTION');
  });

  it('blocks selection while disabled', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<MediaBrowser disabled items={ITEMS} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Kitchen' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows the empty label instead of a figure', () => {
    render(<MediaBrowser emptyLabel="No preview" items={[]} />);

    expect(screen.getByText('No preview')).toBeVisible();
    expect(document.querySelector('img')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <MediaBrowser
        items={[...ITEMS, { id: 'bar', src: '/bar.jpg', alt: 'Bar counter' }]}
        selectedId="kitchen"
      />,
    );
    await axeVerify(container);
  });
});
