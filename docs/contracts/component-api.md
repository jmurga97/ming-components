# Component API contract

The canonical public surface for `1.0.0` is documented in
[the component reference](../component-reference.md). This contract records the rules shared by
every component.

- React 19 only; no custom elements, Lit, registration side effects or `CustomEvent`.
- DOM/ARIA props and refs reach the relevant interactive element.
- Callbacks expose the useful value or action directly.
- Controlled state is available where consumers synchronize forms, URL or stores; optional
  `default*` props provide local state where appropriate.
- `children` and named `ReactNode` props replace slots.
- Neutral `options`, `items`, `columns`, `rows` and `selectedIds` models are retained when they
  remove repeated consumer work.
- Components do not navigate, fetch, persist, authorize or import application models.

## Historical event mapping

| Historical API                                    | React API                                      |
| ------------------------------------------------- | ---------------------------------------------- |
| `event.detail.value`                              | `onValueChange(value)`                         |
| `event.detail.selectedId`                         | `onValueChange(id)`                            |
| `event.detail.selectedIds`                        | `onValueChange(ids)`                           |
| `event.detail.open`                               | `onOpenChange(open)`                           |
| `event.detail` from confirm/cancel/dismiss events | `onConfirm()`, `onCancel()`, direct close      |
| table selection/sort custom events                | `onSelectionChange(ids)`, `onSortChange(sort)` |

The package exposes one root barrel plus explicit kebab-case subpaths. CSS is a separate
`@ming/components/styles.css` import. There are no `/react`, `/register`, wildcard or legacy alias
exports.
