import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axeVerify } from '../../../test/helpers';
import { Field } from '../field';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('reports primitive values while typing', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Field label="Notes">
        <Textarea onValueChange={onValueChange} />
      </Field>,
    );

    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'Quiet');

    expect(onValueChange).toHaveBeenLastCalledWith('Quiet');
  });

  it('still delivers the native change event', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(<Textarea aria-label="Notes" onChange={onChange} onValueChange={onValueChange} />);

    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'a');

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toMatchObject({ type: 'change' });
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('skips onValueChange when the native change is prevented', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Textarea
        aria-label="Notes"
        onChange={(event) => {
          event.preventDefault();
        }}
        onValueChange={onValueChange}
      />,
    );

    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'a');

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('marks itself invalid for assistive technology', () => {
    render(<Textarea aria-label="Notes" invalid />);

    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <Field hint="Maximum 500 characters." label="Notes">
        <Textarea rows={3} />
      </Field>,
    );
    await axeVerify(container);
  });
});
