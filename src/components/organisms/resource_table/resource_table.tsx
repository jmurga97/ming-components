import { cn } from '../../../lib/cn';
import { SortIcon } from '../../internal/icon';

import type { Key, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export type ResourceTableSortDirection = 'ascending' | 'descending';

export interface ResourceTableSort {
  columnId: string;
  direction: ResourceTableSortDirection;
}

export interface ResourceTableColumn<Row> {
  align?: 'start' | 'center' | 'end';
  header: ReactNode;
  id: string;
  render: (row: Row) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface ResourceTableSelectionLabels<Row> {
  page?: string;
  row: (row: Row) => string;
}

export interface ResourceTableProps<Row> {
  actionsLabel?: string;
  ariaLabel: string;
  className?: string;
  columns: Array<ResourceTableColumn<Row>>;
  density?: 'compact' | 'comfortable';
  emptyState?: ReactNode;
  error?: ReactNode;
  getRowId: (row: Row) => Key;
  loading?: boolean;
  loadingLabel?: string;
  onRowActivate?: (row: Row) => void;
  onSelectionChange?: (selectedIds: Key[]) => void;
  onSortChange?: (sort: ResourceTableSort) => void;
  refetching?: boolean;
  renderRowActions?: (row: Row) => ReactNode;
  responsive?: 'scroll' | 'stacked';
  rows: Row[];
  selectedIds?: Key[];
  selectionLabels?: ResourceTableSelectionLabels<Row>;
  sort?: ResourceTableSort;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('a, button, input, select, textarea'));
}

export function ResourceTable<Row>({
  actionsLabel = 'Actions',
  ariaLabel,
  className,
  columns,
  density = 'comfortable',
  emptyState = 'No resources available.',
  error,
  getRowId,
  loading = false,
  loadingLabel = 'Loading resources',
  onRowActivate,
  onSelectionChange,
  onSortChange,
  refetching = false,
  renderRowActions,
  responsive = 'scroll',
  rows,
  selectedIds = [],
  selectionLabels = { row: (row) => `Select row ${String(getRowId(row))}` },
  sort,
}: ResourceTableProps<Row>): React.JSX.Element {
  const selectedSet = new Set(selectedIds);
  const pageIds = rows.map(getRowId);
  const selectedPageIds = pageIds.filter((id) => selectedSet.has(id));
  const allPageSelected = pageIds.length > 0 && selectedPageIds.length === pageIds.length;
  const selectable = Boolean(onSelectionChange);
  const columnCount = columns.length + Number(selectable) + Number(Boolean(renderRowActions));

  function toggleRow(row: Row): void {
    if (!onSelectionChange) return;
    const rowId = getRowId(row);
    onSelectionChange(
      selectedSet.has(rowId) ? selectedIds.filter((id) => id !== rowId) : [...selectedIds, rowId],
    );
  }

  function togglePage(): void {
    if (!onSelectionChange) return;
    const pageIdSet = new Set(pageIds);
    const outsidePage = selectedIds.filter((id) => !pageIdSet.has(id));
    onSelectionChange(allPageSelected ? outsidePage : [...outsidePage, ...pageIds]);
  }

  function activateFromPointer(event: MouseEvent<HTMLTableRowElement>, row: Row): void {
    if (!onRowActivate || isInteractiveTarget(event.target)) return;
    onRowActivate(row);
  }

  function activateFromKeyboard(event: KeyboardEvent<HTMLTableRowElement>, row: Row): void {
    if (!onRowActivate || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    onRowActivate(row);
  }

  if (error) {
    return <div className={cn('ming-resource-table__error', className)}>{error}</div>;
  }

  return (
    <div
      aria-busy={loading || refetching || undefined}
      className={cn('ming-resource-table', className)}
      data-density={density}
      data-responsive={responsive}
    >
      {refetching ? <span className="ming-visually-hidden">Updating resources</span> : null}
      <table aria-label={ariaLabel}>
        <thead>
          <tr>
            {selectable ? (
              <th className="ming-resource-table__selection" scope="col">
                <input
                  aria-label={selectionLabels.page ?? 'Select current page'}
                  checked={allPageSelected}
                  onChange={togglePage}
                  ref={(node) => {
                    if (node) node.indeterminate = selectedPageIds.length > 0 && !allPageSelected;
                  }}
                  type="checkbox"
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const activeSort = sort?.columnId === column.id ? sort.direction : undefined;
              return (
                <th
                  aria-sort={activeSort ?? (column.sortable ? 'none' : undefined)}
                  data-align={column.align ?? 'start'}
                  key={column.id}
                  scope="col"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      className="ming-resource-table__sort"
                      onClick={() => {
                        onSortChange?.({
                          columnId: column.id,
                          direction: activeSort === 'ascending' ? 'descending' : 'ascending',
                        });
                      }}
                      type="button"
                    >
                      {column.header}
                      <span aria-hidden="true">
                        <SortIcon direction={activeSort} />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
            {renderRowActions ? <th scope="col">{actionsLabel}</th> : null}
          </tr>
        </thead>
        <tbody>
          {loading && rows.length === 0 ? (
            <tr>
              <td className="ming-resource-table__state" colSpan={columnCount}>
                {loadingLabel}
              </td>
            </tr>
          ) : null}
          {!loading && rows.length === 0 ? (
            <tr>
              <td className="ming-resource-table__state" colSpan={columnCount}>
                {emptyState}
              </td>
            </tr>
          ) : null}
          {rows.map((row) => {
            const rowId = getRowId(row);
            const selected = selectedSet.has(rowId);
            return (
              <tr
                data-activatable={onRowActivate ? '' : undefined}
                data-selected={selected || undefined}
                key={rowId}
                onClick={(event) => {
                  activateFromPointer(event, row);
                }}
                onKeyDown={(event) => {
                  activateFromKeyboard(event, row);
                }}
                tabIndex={onRowActivate ? 0 : undefined}
              >
                {selectable ? (
                  <td className="ming-resource-table__selection" data-label="">
                    <input
                      aria-label={selectionLabels.row(row)}
                      checked={selected}
                      onChange={() => {
                        toggleRow(row);
                      }}
                      type="checkbox"
                    />
                  </td>
                ) : null}
                {columns.map((column) => (
                  <td
                    data-align={column.align ?? 'start'}
                    data-label={typeof column.header === 'string' ? column.header : undefined}
                    key={column.id}
                  >
                    {column.render(row)}
                  </td>
                ))}
                {renderRowActions ? (
                  <td data-label={actionsLabel}>{renderRowActions(row)}</td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
