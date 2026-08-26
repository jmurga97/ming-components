import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { PortalHost, axeVerify } from '../../../test/helpers';
import { installMatchMediaMock } from '../../../test/match_media';
import { StatusRegion } from './status_region';

interface AutoDismissHarnessProps {
  autoDismiss?: false | number;
  onDismiss?: () => void;
  tone?: 'error' | 'info' | 'success' | 'warning';
}

function AutoDismissHarness({
  autoDismiss,
  onDismiss,
  tone = 'info',
}: AutoDismissHarnessProps): React.JSX.Element | null {
  const [open, setOpen] = useState(true);
  return (
    <StatusRegion
      autoDismiss={autoDismiss}
      label="Saved"
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onDismiss?.();
        setOpen(nextOpen);
      }}
      open={open}
      tone={tone}
    />
  );
}

describe('StatusRegion', () => {
  it('reports dismissal through the controlled callback', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<StatusRegion label="Saved" onOpenChange={onOpenChange} open tone="success" />);

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('announces errors as alerts and other tones as statuses', () => {
    const { rerender } = render(
      <StatusRegion label="Save failed" onOpenChange={vi.fn()} open tone="error" />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Save failed');

    rerender(<StatusRegion label="Saved" onOpenChange={vi.fn()} open tone="success" />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('renders nothing while closed', () => {
    render(<StatusRegion label="Saved" onOpenChange={vi.fn()} open={false} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('lands in an injected portal container', () => {
    render(
      <PortalHost>
        {(container) =>
          container ? (
            <StatusRegion label="Saved" onOpenChange={vi.fn()} open portalContainer={container} />
          ) : null
        }
      </PortalHost>,
    );

    expect(screen.getByRole('status').closest('[data-testid="portal-host"]')).toBeInTheDocument();
    expect(document.querySelector('[data-ming-portal="status"]')).toBeInTheDocument();
  });

  it('renames the dismiss control', () => {
    render(<StatusRegion dismissLabel="Close banner" label="Saved" onOpenChange={vi.fn()} open />);

    expect(screen.getByRole('button', { name: 'Close banner' })).toBeInTheDocument();
  });

  it('dismisses itself after the auto-dismiss interval', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const onDismiss = vi.fn();
      render(<AutoDismissHarness autoDismiss={1500} onDismiss={onDismiss} />);

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('pauses the timer while hovered and resumes after leaving', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onDismiss = vi.fn();
      render(<AutoDismissHarness autoDismiss={1500} onDismiss={onDismiss} />);

      act(() => {
        vi.advanceTimersByTime(500);
      });
      await user.hover(screen.getByRole('status'));
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(onDismiss).not.toHaveBeenCalled();

      await user.unhover(screen.getByRole('status'));
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(onDismiss).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('never auto-dismisses when the user prefers reduced motion', () => {
    const matchMedia = installMatchMediaMock();
    matchMedia.setMatches('(prefers-reduced-motion: reduce)', true);
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const onDismiss = vi.fn();
      render(<AutoDismissHarness autoDismiss={1000} onDismiss={onDismiss} />);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
      matchMedia.restore();
    }
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <StatusRegion label="Saved" onOpenChange={vi.fn()} open tone="success" />,
    );
    await axeVerify(container.ownerDocument.body);
  });
});
