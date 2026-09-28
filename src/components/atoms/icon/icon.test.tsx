import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import * as icons from './icon';

const ENTRIES = Object.entries(icons).filter(([name]) => name.endsWith('Icon'));

describe('Icon', () => {
  it.each(ENTRIES)('%s renders a decorative 24-unit pixel icon', (_, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg?.childElementCount).toBeGreaterThan(0);
  });

  it('exposes a labelled icon as an image', () => {
    render(<icons.MailIcon aria-label="Email" />);
    expect(screen.getByRole('img', { name: 'Email' })).not.toHaveAttribute('aria-hidden');
  });

  it('fills the active sort direction', () => {
    const { container } = render(<icons.SortIcon direction="ascending" />);
    expect(container.querySelectorAll('polygon')).toHaveLength(1);
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <p>
        <icons.BellIcon /> Notifications <icons.WarningIcon aria-label="Warning" />
      </p>,
    );
    await axeVerify(container);
  });
});
