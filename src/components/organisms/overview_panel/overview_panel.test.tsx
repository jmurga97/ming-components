import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { OverviewPanel } from './overview_panel';

const STATS = [
  { description: 'Last 30 days', id: 'sessions', label: 'Sessions', value: '12' },
  { id: 'photos', label: 'Photos', value: '184' },
];

function getPanel(): HTMLElement {
  const panel = screen.getByRole('heading', { name: 'Portfolio health' }).closest('section');
  if (!panel) throw new Error('Missing overview panel section.');
  return panel;
}

describe('OverviewPanel', () => {
  it('renders title, description and stat values', () => {
    render(
      <OverviewPanel
        description="Operational blocks keep state explicit."
        stats={STATS}
        title="Portfolio health"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Portfolio health' })).toBeInTheDocument();
    expect(screen.getByText('Operational blocks keep state explicit.')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('184')).toBeInTheDocument();
    expect(screen.getByText('Last 30 days').tagName).toBe('SMALL');
    expect(getPanel()).not.toHaveAttribute('aria-busy');
  });

  it('replaces values with dashes and flags busy while loading', () => {
    const { rerender } = render(<OverviewPanel loading stats={STATS} title="Portfolio health" />);

    expect(getPanel()).toHaveAttribute('aria-busy', 'true');
    expect(screen.getAllByText('—')).toHaveLength(2);
    expect(screen.queryByText('184')).not.toBeInTheDocument();

    rerender(<OverviewPanel stats={STATS} title="Portfolio health" />);
    expect(getPanel()).not.toHaveAttribute('aria-busy');
  });

  it('exposes the status through a polite live region', () => {
    render(
      <OverviewPanel
        stats={[]}
        status={{ label: 'Live data', tone: 'success' }}
        title="Portfolio health"
      />,
    );

    expect(screen.getByRole('status')).toHaveClass('ming-status-text--success');
    expect(screen.getByRole('status')).toHaveTextContent('Live data');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<OverviewPanel stats={STATS} title="Portfolio health" />);
    await axeVerify(container);
  });
});
