import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResourceTable } from './resource_table';

const rows = [{ id: 'one', name: 'First row' }];
const columns = [{ id: 'name', header: 'Name', render: (row: (typeof rows)[number]) => row.name }];

describe('ResourceTable', () => {
  it('reports selected row ids without CustomEvent', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        getRowId={(row) => row.id}
        onSelectionChange={onSelectionChange}
        rows={rows}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Select row one' }));

    expect(onSelectionChange).toHaveBeenCalledWith(['one']);
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        getRowId={(row) => row.id}
        rows={rows}
      />,
    );
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });

  it('selects the current page and exposes controlled sorting', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const onSortChange = vi.fn();
    render(
      <ResourceTable
        ariaLabel="Resources"
        columns={[{ id: 'name', header: 'Name', render: (row) => row.name, sortable: true }]}
        getRowId={(row) => row.id}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
        rows={rows}
        sort={{ columnId: 'name', direction: 'ascending' }}
      />,
    );
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    await user.click(screen.getByRole('checkbox', { name: 'Select current page' }));
    await user.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSelectionChange).toHaveBeenCalledWith(['one']);
    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'descending' });
  });

  it('keeps rows mounted while refetching and activates a row by keyboard', async () => {
    const user = userEvent.setup();
    const onRowActivate = vi.fn();
    render(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        getRowId={(row) => row.id}
        onRowActivate={onRowActivate}
        refetching
        rows={rows}
      />,
    );
    expect(screen.getByText('First row')).toBeVisible();
    expect(screen.getByRole('table')).toHaveAccessibleName('Resources');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onRowActivate).toHaveBeenCalledWith(rows[0]);
  });

  it('renders explicit loading, empty and error states', () => {
    const { rerender } = render(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        getRowId={(row) => row.id}
        loading
        rows={[]}
      />,
    );
    expect(screen.getByText('Loading resources')).toBeVisible();
    rerender(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        emptyState="Nothing here"
        getRowId={(row) => row.id}
        rows={[]}
      />,
    );
    expect(screen.getByText('Nothing here')).toBeVisible();
    rerender(
      <ResourceTable
        ariaLabel="Resources"
        columns={columns}
        error="Could not load"
        getRowId={(row) => row.id}
        rows={[]}
      />,
    );
    expect(screen.getByText('Could not load')).toBeVisible();
  });
});
