import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { SidebarNav } from './sidebar_nav';

describe('SidebarNav', () => {
  it('renders header, primary items and footer items in one landmark', () => {
    render(
      <SidebarNav
        footerItems={[{ id: 'logout', label: 'Sign out' }]}
        header={<strong>QMenut</strong>}
        items={[{ current: true, id: 'menu', label: 'Menu' }]}
      />,
    );

    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(nav).toHaveTextContent('QMenut');
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });

  it('shares one onNavigate contract across primary and footer lists', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <SidebarNav
        footerItems={[{ id: 'logout', label: 'Sign out' }]}
        items={[{ id: 'menu', label: 'Menu' }]}
        onNavigate={onNavigate}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sign out' }));
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'logout');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'menu');
  });

  it('renames the landmark and keeps collapsed copy accessible', () => {
    render(
      <SidebarNav
        ariaLabel="Client sections"
        collapsed
        items={[{ description: 'Seasonal plates', id: 'menu', label: 'Menu' }]}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Client sections' })).toBeInTheDocument();
    const copy = screen.getByText('Menu').parentElement;
    expect(copy).toHaveClass('ming-visually-hidden');
  });

  it('renders a free-form footer node beside the footer list', () => {
    render(
      <SidebarNav
        footer={<span>Service online</span>}
        footerItems={[{ id: 'logout', label: 'Sign out' }]}
        items={[]}
      />,
    );

    expect(screen.getByText('Service online')).toBeInTheDocument();
  });

  it('omits the footer region entirely when nothing is provided', () => {
    const { container } = render(<SidebarNav items={[{ id: 'menu', label: 'Menu' }]} />);

    expect(container.querySelector('footer')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <SidebarNav
        footerItems={[{ href: '/logout', id: 'logout', label: 'Sign out' }]}
        items={[{ current: true, href: '/overview', id: 'overview', label: 'Overview' }]}
      />,
    );
    await axeVerify(container);
  });
});
