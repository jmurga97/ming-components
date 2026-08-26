import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { InlineMessage } from './inline_message';

describe('InlineMessage', () => {
  it('renders title and message with the info default', () => {
    render(<InlineMessage message="Menu data is being refreshed." title="Loading" />);

    expect(screen.getByRole('status')).toHaveClass('ming-inline-message--info');
    expect(screen.getByText('Loading').tagName).toBe('STRONG');
    expect(screen.getByText('Menu data is being refreshed.')).toBeInTheDocument();
  });

  it('falls back to children when no message is provided', () => {
    render(<InlineMessage>Rendered as content</InlineMessage>);

    expect(screen.getByRole('status')).toHaveTextContent('Rendered as content');
  });

  it('announces errors assertively and other tones politely', () => {
    render(
      <>
        <InlineMessage message="Could not save" tone="error" />
        <InlineMessage message="All changes live" tone="success" />
      </>,
    );

    expect(screen.getByRole('alert')).toHaveClass('ming-inline-message--error');
    expect(screen.getByRole('status')).toHaveTextContent('All changes live');
  });

  it('applies each tone variant', () => {
    const tones = ['info', 'success', 'warning', 'error'] as const;
    render(
      <>
        {tones.map((tone) => (
          <InlineMessage key={tone} message={tone} tone={tone} />
        ))}
      </>,
    );
    for (const tone of tones) {
      expect(screen.getByText(tone).closest('.ming-inline-message')).toHaveClass(
        `ming-inline-message--${tone}`,
      );
    }
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <InlineMessage message="Review the form" title="Heads up" tone="warning" />,
    );
    await axeVerify(container);
  });
});
