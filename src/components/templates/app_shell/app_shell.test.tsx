import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { axeVerify } from '../../../test/helpers';
import { installMatchMediaMock } from '../../../test/match_media';
import { AppShell } from './app_shell';

import type { MatchMediaMock } from '../../../test/match_media';

const MOBILE_QUERY = '(max-width: 56rem)';

function Shell({ onOpenChange }: { onOpenChange?: (open: boolean) => void }): React.JSX.Element {
  return (
    <AppShell
      header={<h1>Dashboard</h1>}
      navigation={
        <nav aria-label="Primary navigation">
          <a href="/">Overview</a>
        </nav>
      }
      onOpenChange={onOpenChange}
    >
      Content
    </AppShell>
  );
}

function ControlledShell(): React.JSX.Element {
  const [open, setOpen] = useState(true);
  return (
    <AppShell
      header={<h1>Dashboard</h1>}
      navigation={
        <nav aria-label="Primary navigation">
          <a href="/">Overview</a>
        </nav>
      }
      onOpenChange={setOpen}
      open={open}
    >
      Content
    </AppShell>
  );
}

describe('AppShell', () => {
  it('reports navigation state as a boolean on desktop', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Shell onOpenChange={onOpenChange} />);

    const toggle = screen.getByRole('button', { name: 'Hide navigation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('complementary')).toBeInTheDocument();

    await user.click(toggle);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('keeps the aside mounted while open and removes it when closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <AppShell
        header={<h1>Dashboard</h1>}
        navigation={<a href="/">Overview</a>}
        onOpenChange={onOpenChange}
      >
        Content
      </AppShell>,
    );

    await user.click(screen.getByRole('button', { name: 'Hide navigation' }));
    rerender(
      <AppShell
        header={<h1>Dashboard</h1>}
        navigation={<a href="/">Overview</a>}
        onOpenChange={onOpenChange}
        open={false}
      >
        Content
      </AppShell>,
    );

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('renders a static navigation without a toggle when the shell is uncontrolled', () => {
    render(<Shell />);

    expect(screen.queryByRole('button', { name: /navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  describe('mobile viewport', () => {
    let matchMedia: MatchMediaMock;

    beforeEach(() => {
      matchMedia = installMatchMediaMock();
      matchMedia.setMatches(MOBILE_QUERY, true);
    });

    afterEach(() => {
      matchMedia.restore();
    });

    it('swaps the aside for a dialog and closes it through the callback', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      function StatefulShell(): React.JSX.Element {
        const [open, setOpen] = useState(true);
        return (
          <AppShell
            header={<h1>Dashboard</h1>}
            navigation={
              <nav aria-label="Primary navigation">
                <a href="/">Overview</a>
              </nav>
            }
            onOpenChange={(nextOpen) => {
              onOpenChange(nextOpen);
              setOpen(nextOpen);
            }}
            open={open}
          >
            Content
          </AppShell>
        );
      }
      render(<StatefulShell />);

      expect(screen.queryByRole('complementary')).not.toBeInTheDocument();

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeVisible();
      expect(dialog).toHaveTextContent('Primary navigation');
      expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close navigation' }));

      expect(onOpenChange).toHaveBeenCalledWith(false);
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes the mobile dialog on Escape', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<Shell onOpenChange={onOpenChange} />);

      await screen.findByRole('dialog');
      await user.keyboard('{Escape}');

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('returns focus to the toggle after closing', async () => {
      const user = userEvent.setup();
      render(<ControlledShell />);

      const toggle = screen.getByRole('button', { name: 'Hide navigation', hidden: true });
      await screen.findByRole('dialog');
      await user.click(screen.getByRole('button', { name: 'Close navigation' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(toggle).toHaveFocus();
      });
    });

    it('follows the responsive split as the media query changes', async () => {
      matchMedia.setMatches(MOBILE_QUERY, false);
      render(<Shell />);

      expect(screen.getByRole('complementary')).toBeInTheDocument();

      matchMedia.setMatches(MOBILE_QUERY, true);
      await waitFor(() => {
        expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
      });

      matchMedia.setMatches(MOBILE_QUERY, false);
      await waitFor(() => {
        expect(screen.getByRole('complementary')).toBeInTheDocument();
      });
    });

    it('has no detectable accessibility violations with the dialog open', async () => {
      const { container } = render(<Shell onOpenChange={vi.fn()} />);
      await screen.findByRole('dialog');
      await axeVerify(container.ownerDocument.body);
    });
  });
});
