import { render, screen } from '@testing-library/react';

import { axeVerify } from '../../../test/helpers';
import { Input } from '../input';
import { Label } from './label';

describe('Label', () => {
  it('associates with a control through htmlFor', () => {
    render(
      <div>
        <Label htmlFor="plain">Plain</Label>
        <Input id="plain" />
      </div>,
    );

    expect(screen.getByRole('textbox', { name: 'Plain' })).toBeVisible();
  });

  it('associates with a nested control', () => {
    render(
      <Label>
        Nested
        <Input />
      </Label>,
    );

    expect(screen.getByRole('textbox', { name: 'Nested' })).toBeVisible();
  });

  it('merges className onto the label element', () => {
    render(<Label className="extra">Tone</Label>);

    expect(screen.getByText('Tone')).toHaveClass('ming-label', 'extra');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="labelled">Labelled</Label>
        <Input id="labelled" />
      </div>,
    );
    await axeVerify(container);
  });
});
