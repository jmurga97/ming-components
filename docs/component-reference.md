# Component reference

All callbacks are React callbacks, not `CustomEvent`. Controlled props use `value`/`open`; where
supported, `defaultValue`/`defaultOpen` provide local state. Native and Base UI props mentioned
below are forwarded to the relevant control.

## Atoms

### `Badge`

Status label rendered as a `span`. Key prop: `tone?: neutral | info | success | warning | error`;
also accepts native span props.

### `Button`

Base UI button. Key props: `variant?: primary | secondary | ghost | destructive`,
`size?: sm | md | lg`, plus Base UI button props and ref. `type` defaults to `button`.

### `Checkbox`

Base UI checkbox. Adds `label?: ReactNode` and accepts the root checkbox API including `checked`,
`defaultChecked`, `disabled` and `onCheckedChange`. Space toggles the focused control.

### `Field` and `FormField`

`FormField` is the same public composition as `Field`. Required props are `label` and `children`;
optional props are `hint`, `error`, `invalid`, `disabled`, `required` and `optional`. Labels,
descriptions and errors are associated through Base UI Field.

### `Input`

Base UI input with `invalid?: boolean`; native input/value props and `onValueChange` are forwarded.
Supply a visible `Field` label or another accessible name.

### `Label`

Native `label` props. Associate it using `htmlFor` or nesting.

### `Select`

Required: `options: Array<{ id; label; disabled?; textValue? }>`.
State: `value`, `defaultValue`, `open`, `defaultOpen`, `disabled`, `readOnly`, `required`.
Callbacks: `onValueChange(id | null)`, `onOpenChange(open)`. `ariaLabel`, `name`, refs and
`portalContainer` are supported. Enter/Space/Arrow keys open it; arrows navigate; Enter selects;
Escape closes and restores focus.

### `Textarea`

Native textarea API plus `invalid` and `onValueChange(value)`. It interoperates with `Field`.

### `InlineMessage`

Key props: `tone?: info | success | warning | error`, `title`, and `message` or `children`. Errors
use `role=alert`; other tones use `role=status`. Do not wrap it in a second live region.

### `StatusText`

Inline live status. Key props: `tone`, `label` or `children`, and `polite?: boolean`. The default is
polite; set `polite={false}` only for urgent updates.

## Navigation and overlays

### `NavList`

Required `items` contain `id`, `label` and optional `href`, `description`, `icon`, `current`,
`disabled`. `onNavigate(id)` reports activation; `collapsed` visually hides copy while preserving
accessible text.

### `SidebarNav`

Required `items`; optional `header`, `footer`, `footerItems`, `collapsed`, `ariaLabel` and
`onNavigate`. It renders semantic navigation around `NavList`.

### `AppShell`

Required `header`, `navigation`, `children`. Controlled navigation uses `open` and
`onOpenChange(open)`. Below 56rem the navigation becomes a modal dialog with focus trap, Escape
close and focus restoration to the toggle.

### `ConfirmAction`

Controlled alert dialog. Required `open`, `onOpenChange`, `message`, `onConfirm`; optional
`onCancel`, title/button labels, `pending`, `portalContainer` and `triggerRef`. The safe Cancel
action receives initial focus. Escape closes unless pending and focus returns to `triggerRef`.

### `DropdownMenu`

Required `ariaLabel`, `trigger` and `items`. Each item contains `id`, `label`, `onSelect`, and may
set `disabled`, `textValue`, `separatorBefore` or `tone: destructive`. State supports `open`,
`defaultOpen`, `onOpenChange`; positioning supports `align` and `portalContainer`. Arrow keys use
roving focus, printable keys use typeahead, Enter/Space selects, Escape closes, and focus returns
to the trigger.

### `StatusRegion`

Transient portal status. Required `open`, `label`, `onOpenChange`; optional `tone`, `autoDismiss`,
`dismissLabel`, `portalContainer`. Auto-dismiss pauses on hover and focus. Render only one live
announcement for a single event.

## Operational blocks

### `BulkActions`

Toolbar with required `count`, `actions`, `onClearSelection`; optional `status`, `disabled`, labels
and `ariaLabel`.

### `MediaBrowser`

Required items contain `id`, `src`, `alt`, optional `caption`, `thumbnailSrc`. Controlled selection
uses `selectedId` and `onValueChange(id)`. `showRail`, `disabled` and `emptyLabel` configure state.

### `OverviewPanel`

Required `title` and stats (`id`, `label`, `value`, optional `description`); optional `description`,
`status` and `loading`. Loading sets `aria-busy` and preserves metric structure.

### `RelationshipPanel`

Required `title` and items (`id`, `label`, optional `description`, `disabled`). Passing
`onValueChange(id)` makes rows actionable; otherwise they render read-only. Supports disabled and
empty states.

### `ResourceEditor`

Form shell requiring `resourceTitle`, `children`, `onSave`, `onCancel`. Optional `aside`, custom
`actions`, `onDelete`, `dirty`, `saving`, `deleting`, `error`, `status` and labels model the complete
editor lifecycle. Destructive confirmation stays explicit in the consumer via `ConfirmAction`.

### `ResourceTable<Row>`

Required `ariaLabel`, `rows`, typed `columns` (`id`, `header`, `render`), and `getRowId`. Supports
controlled sorting (`sort`, `onSortChange`), controlled selection (`selectedIds`,
`onSelectionChange`, labels), row activation, row actions, loading/refetching/empty/error,
`density` and `responsive: scroll | stacked`. Headers expose `aria-sort`; Enter/Space activates a
focused row without stealing events from nested controls.

### `TagList`

Required items contain `id`, `label`, optional `disabled`. Read-only by default. With `interactive`,
`value` and `onValueChange(ids)`, each tag is a keyboard-operable pressed button.

### `TagPicker`

Required controlled `value`, `options` and `onValueChange(ids)`. Supports search label,
placeholder, empty and disabled states. Uses a named multiselect listbox and one polite selection
count announcement.

### `SearchField`

Controlled search input with required `value` and `onValueChange(value)`; optional `onClear` and
`clearLabel`. Remaining supported input props are forwarded. The clear button is keyboard
accessible and retains the search control's accessible name.

## Accessibility scope

Automated axe checks are one layer only. Acceptance also covers keyboard paths, visible 3px focus,
overlay restoration, associated labels/errors, single live announcements, reduced motion and real
browser checks for portals/responsive dialogs. Consumers remain responsible for meaningful labels,
alt text, content contrast after token overrides and E2E coverage of their product flows.
