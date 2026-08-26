import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { NavList } from './nav_list';

describe('NavList', () => {
  it('reports button navigation and blocks disabled items', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <NavList
        items={[
          { current: true, id: 'home', label: 'Overview' },
          { disabled: true, id: 'locked', label: 'Billing' },
        ]}
        onNavigate={onNavigate}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Overview' }));
    await user.click(screen.getByRole('button', { name: 'Billing' }));

    expect(onNavigate).toHaveBeenCalledOnce();
    expect(onNavigate).toHaveBeenCalledWith('home');
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('activates buttons with Enter as well as click', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<NavList items={[{ id: 'home', label: 'Overview' }]} onNavigate={onNavigate} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('intercepts ordinary link clicks and reports the id instead', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <NavList
        items={[{ current: true, href: '/menus', id: 'menus', label: 'Menus' }]}
        onNavigate={onNavigate}
      />,
    );

    await user.click(screen.getByRole('link', { name: 'Menus' }));

    expect(onNavigate).toHaveBeenCalledWith('menus');
    expect(window.location.pathname).not.toBe('/menus');
    expect(screen.getByRole('link', { name: 'Menus' })).toHaveAttribute('aria-current', 'page');
  });

  it('lets modifier clicks fall through to native link behavior', () => {
    const onNavigate = vi.fn();
    render(
      <div
        onClickCapture={(event) => {
          if (event.metaKey || event.ctrlKey) event.preventDefault();
        }}
      >
        <NavList
          items={[{ href: '/menus', id: 'menus', label: 'Menus' }]}
          onNavigate={onNavigate}
        />
      </div>,
    );

    const link = screen.getByRole('link', { name: 'Menus' });
    fireEvent.click(link, { metaKey: true });
    fireEvent.click(link, { ctrlKey: true });

    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('ignores non-primary buttons', () => {
    const onNavigate = vi.fn();
    render(
      <div
        onClickCapture={(event) => {
          if (event.button !== 0) event.preventDefault();
        }}
      >
        <NavList
          items={[{ href: '/menus', id: 'menus', label: 'Menus' }]}
          onNavigate={onNavigate}
        />
      </div>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Menus' }), { button: 1 });

    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('keeps copy readable to assistive technology while collapsed', () => {
    render(
      <NavList
        collapsed
        items={[
          { description: 'Seasonal plates', icon: <span>▣</span>, id: 'menu', label: 'Menu' },
        ]}
      />,
    );

    const copy = screen.getByText('Menu').parentElement;
    expect(copy).toHaveClass('ming-visually-hidden');
    expect(screen.getByRole('button', { name: /Menu/ })).toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <NavList
        items={[
          { current: true, href: '/overview', id: 'overview', label: 'Overview' },
          { id: 'billing', label: 'Billing' },
        ]}
      />,
    );
    await axeVerify(container);
  });
});
