import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { StatusText } from './status_text';

describe('StatusText', () => {
  it('renders a polite live region by default', () => {
    render(<StatusText>Autosave off</StatusText>);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveClass('ming-status-text--neutral');
    expect(status).toHaveTextContent('Autosave off');
  });

  it('escalates to assertive announcements', () => {
    render(
      <StatusText label="Waiting" polite={false} tone="warning">
        Ignored children
      </StatusText>,
    );

    const status = screen.getByRole('status', { name: '' });
    expect(status).toHaveAttribute('aria-live', 'assertive');
    expect(status).toHaveClass('ming-status-text--warning');
    expect(status).toHaveTextContent('Waiting');
  });

  it('applies each tone variant', () => {
    const tones = ['neutral', 'info', 'success', 'warning', 'error'] as const;
    render(
      <>
        {tones.map((tone) => (
          <StatusText key={tone} label={tone} tone={tone} />
        ))}
      </>,
    );
    for (const tone of tones) {
      expect(screen.getByText(tone)).toHaveClass(`ming-status-text--${tone}`);
    }
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<StatusText tone="success">Live data</StatusText>);
    await axeVerify(container);
  });
});
