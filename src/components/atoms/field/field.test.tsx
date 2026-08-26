import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { Field } from './field';
import { Input } from '../input';

describe('Field', () => {
  it('associates label, hint and error with the nested control', () => {
    render(
      <Field error="Required" hint="Legal name" invalid label="Restaurant" required>
        <Input />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: /Restaurant/ });
    expect(input).toHaveAccessibleDescription('Legal name Required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('exposes hints as accessible descriptions', () => {
    render(
      <Field hint="Shown in the menu header." label="Restaurant">
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Restaurant' })).toHaveAccessibleDescription(
      'Shown in the menu header.',
    );
  });

  it('marks required labels with a decorative asterisk', () => {
    render(
      <Field label="Restaurant" required>
        <Input />
      </Field>,
    );

    const marker = screen.getByText('*', { normalizer: (text) => text.trim() });
    expect(marker).toHaveAttribute('aria-hidden', 'true');
    expect(marker.parentElement).toHaveClass('ming-field__label');
  });

  it('labels optional fields without the asterisk', () => {
    render(
      <Field label="Description" optional>
        <Input />
      </Field>,
    );

    expect(screen.getByText('Optional')).toBeInTheDocument();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('derives invalid state from the error alone', () => {
    render(
      <Field error="Check the opening hours" label="Schedule">
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Schedule' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('propagates disabled to the nested control', () => {
    render(
      <Field disabled label="Restaurant">
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Restaurant' })).toBeDisabled();
  });

  it('has no detectable accessibility violations in an error state', async () => {
    const { container } = render(
      <Field error="Required" label="Name">
        <Input required />
      </Field>,
    );
    await axeVerify(container);
  });
});
