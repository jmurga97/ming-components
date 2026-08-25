import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Input', () => {
  it('reports primitive values through onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <label htmlFor="name-input">
        Name
        <Input id="name-input" onValueChange={onValueChange} />
      </label>,
    );

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ana');

    expect(onValueChange).toHaveBeenLastCalledWith('Ana', expect.any(Object));
  });

  it('has no detectable accessibility violations when labelled', async () => {
    const { container } = render(
      <label htmlFor="accessible-name-input">
        Name
        <Input id="accessible-name-input" />
      </label>,
    );
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
