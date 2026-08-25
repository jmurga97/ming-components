import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppShell } from './app_shell';

describe('AppShell', () => {
  it('reports navigation state as a boolean', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AppShell
        header={<h1>Dashboard</h1>}
        navigation={<a href="/">Overview</a>}
        onOpenChange={onOpenChange}
      >
        Content
      </AppShell>,
    );

    await user.click(screen.getByRole('button', { name: 'Hide navigation' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
