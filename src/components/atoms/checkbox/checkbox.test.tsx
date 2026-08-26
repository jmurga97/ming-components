import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { axeVerify } from '../../../test/helpers';
import { Checkbox } from './checkbox';

function ControlledCheckbox(): React.JSX.Element {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} label="Published" onCheckedChange={setChecked} />;
}

describe('Checkbox', () => {
  it('toggles with the keyboard and reports the payload', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Published" onCheckedChange={onCheckedChange} />);

    await user.tab();
    await user.keyboard(' ');

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole('checkbox', { name: 'Published' })).toBeChecked();
  });

  it('updates through the controlled contract', async () => {
    const user = userEvent.setup();
    render(<ControlledCheckbox />);

    const control = screen.getByRole('checkbox', { name: 'Published' });
    expect(control).not.toBeChecked();

    await user.click(control);
    expect(control).toBeChecked();
  });

  it('starts checked when uncontrolled with defaultChecked', () => {
    render(<Checkbox defaultChecked label="Silent" />);
    expect(screen.getByRole('checkbox', { name: 'Silent' })).toBeChecked();
  });

  it('blocks interaction while disabled, including clicks on the label text', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled label="Locked" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByText('Locked'));

    expect(onCheckedChange).not.toHaveBeenCalled();
    const control = screen.getByRole('checkbox', { name: 'Locked' });
    expect(control).toHaveAttribute('aria-disabled', 'true');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Checkbox label="Notifications" />);
    await axeVerify(container);
  });
});
