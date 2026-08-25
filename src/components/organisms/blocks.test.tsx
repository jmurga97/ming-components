import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  BulkActions,
  Button,
  MediaBrowser,
  OverviewPanel,
  RelationshipPanel,
  ResourceEditor,
  TagList,
  TagPicker,
} from '../../index';

describe('administrative blocks', () => {
  it('connects bulk actions to the selection contract', async () => {
    const user = userEvent.setup();
    const onClearSelection = vi.fn();
    render(
      <BulkActions
        actions={<Button size="sm">Archive</Button>}
        count={2}
        onClearSelection={onClearSelection}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onClearSelection).toHaveBeenCalledOnce();
  });

  it('reports editor actions and state', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onDelete = vi.fn();
    const onSave = vi.fn();
    render(
      <ResourceEditor
        aside={<p>Metadata</p>}
        dirty
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        resourceTitle="Session"
      >
        <label>
          Title
          <input />
        </label>
      </ResourceEditor>,
    );
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onSave).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('supports controlled taxonomy and relationship selection from the keyboard', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    const onRelationshipChange = vi.fn();
    render(
      <>
        <TagPicker
          onValueChange={onTagsChange}
          options={[{ id: 'portrait', label: 'Portrait' }]}
          value={[]}
        />
        <TagList
          interactive
          items={[{ id: 'editorial', label: 'Editorial' }]}
          onValueChange={onTagsChange}
          value={[]}
        />
        <RelationshipPanel
          items={[{ id: 'session', label: 'Evening session' }]}
          onValueChange={onRelationshipChange}
          title="Related sessions"
        />
      </>,
    );
    await user.type(screen.getByRole('searchbox', { name: 'Select tags' }), 'Port');
    await user.click(screen.getByRole('option', { name: /Portrait/ }));
    await user.click(screen.getByRole('button', { name: 'Editorial' }));
    await user.click(screen.getByRole('button', { name: 'Evening session' }));
    expect(onTagsChange).toHaveBeenCalledWith(['portrait']);
    expect(onTagsChange).toHaveBeenCalledWith(['editorial']);
    expect(onRelationshipChange).toHaveBeenCalledWith('session');
  });

  it('renders media empty/selection and overview loading states', () => {
    const { rerender } = render(<MediaBrowser emptyLabel="No preview" items={[]} />);
    expect(screen.getByText('No preview')).toBeVisible();
    rerender(
      <>
        <MediaBrowser items={[{ alt: 'Portrait', id: 'one', src: '/portrait.jpg' }]} />
        <OverviewPanel
          loading
          stats={[{ id: 'photos', label: 'Photos', value: '42' }]}
          title="Portfolio"
        />
      </>,
    );
    expect(screen.getByRole('img', { name: 'Portrait' })).toBeVisible();
    expect(screen.getByText('—')).toBeVisible();
  });

  it('has no detectable accessibility violations in a complete block composition', async () => {
    const { container } = render(
      <>
        <OverviewPanel stats={[{ id: 'photos', label: 'Photos', value: '42' }]} title="Portfolio" />
        <RelationshipPanel items={[]} title="Related sessions" />
        <TagList items={[{ id: 'portrait', label: 'Portrait' }]} />
        <MediaBrowser emptyLabel="No preview" items={[]} />
      </>,
    );
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
