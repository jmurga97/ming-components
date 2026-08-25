import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './switch';

describe('Switch', () => {
  it('toggles and reports checked state', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control).not.toBeChecked();

    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(control).toBeChecked();

    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('respects controlled state and blocks disabled interaction', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch checked={false} disabled label="Notifications" onCheckedChange={onCheckedChange} />,
    );
    const control = screen.getByRole('switch', { name: 'Notifications' });

    await user.click(control);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('renders without a label', () => {
    render(<Switch aria-label="Silent" defaultChecked />);
    const control = screen.getByRole('switch', { name: 'Silent' });
    expect(control).toBeChecked();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Switch label="Notifications" />);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
