import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders children with the neutral default', () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText('Draft')).toHaveClass('ming-badge', 'ming-badge--neutral');
  });

  it('applies each tone variant', () => {
    const tones = ['neutral', 'info', 'success', 'warning', 'error'] as const;
    render(
      <>
        {tones.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </>,
    );
    for (const tone of tones) {
      expect(screen.getByText(tone)).toHaveClass(`ming-badge--${tone}`);
    }
  });

  it('forwards props and merges className', () => {
    render(
      <Badge className="extra" data-track="badge" id="status-badge">
        Live
      </Badge>,
    );
    const badge = screen.getByText('Live');
    expect(badge).toHaveAttribute('id', 'status-badge');
    expect(badge).toHaveAttribute('data-track', 'badge');
    expect(badge).toHaveClass('ming-badge--neutral', 'extra');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Badge tone="success">Active</Badge>);
    await axeVerify(container);
  });
});
