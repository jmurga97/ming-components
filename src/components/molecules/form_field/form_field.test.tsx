import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { Input } from '../../atoms/input';
import { FormField } from './form_field';

describe('FormField', () => {
  it('composes the public field surface', () => {
    render(
      <FormField hint="Public hint" label="Composed">
        <Input />
      </FormField>,
    );

    expect(screen.getByRole('textbox', { name: 'Composed' })).toHaveAccessibleDescription(
      'Public hint',
    );
  });

  it('surfaces errors through the same contract as Field', () => {
    render(
      <FormField error="Required" label="Name">
        <Input required />
      </FormField>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAccessibleDescription('Required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <FormField label="Email">
        <Input type="email" />
      </FormField>,
    );
    await axeVerify(container);
  });
});
