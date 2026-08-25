# Handoff Plan 3

## Distribution used by qmenut

- Package: `@ming/components@0.1.0`.
- Verified tarball: `/Users/murgapja/dev/ming-components/ming-components-0.1.0-plan2.tgz`.
- Tarball integrity:
  `sha512-IOgjKefXHvPwLjdZZzavR/pFSWwdHjP66OjYWUEcU2PwUQw6Ox2RIGY7dlAnV5J17AF6tG77B9yB6uTWGqC+hQ==`.
- qmenut was tested against the packed artifact, not against the library source tree.
- The final qmenut manifest uses the exact version `0.1.0` and contains no `file:` dependency. A
  clean install in another environment therefore requires publishing this exact artifact as
  `@ming/components@0.1.0` first.

## Components and foundations implemented

Foundations include `cn()`, CVA-based variants, semantic light/dark tokens, system-theme fallback,
base styles, a consistent `:focus-visible` ring, reduced-motion handling, and `.ming-portal`
isolation for overlays.

The Plan 2 core is complete:

- Atoms: `Button`, `Input`, `Textarea`, `Label`, `Field`, `Checkbox`, `Select`, `Badge`,
  `InlineMessage`, and `StatusText`.
- Molecules: `FormField`, `SearchField`, `ConfirmAction`, and `StatusRegion`.
- Layout: `AppShell`, `SidebarNav`, and `NavList`.
- Existing foundation retained: `ResourceTable`.

`NavList` is a React-native navigation primitive. It does not preserve the dropped legacy custom
element or slot API identified in the audit.

Every core component has public types, `className`, disabled and focus-visible behavior where
applicable, dark-mode styling, a package subpath, playground coverage, and behavioral tests.
Tests cover rendering, variants, controlled state and callbacks, disabled states, keyboard use,
overlay lifecycle and focus restoration, invalid label/error association, and detectable axe
violations.

## Definitive public API

The root export contains all components and public types. Stable direct imports are also available
from:

- `@ming/components/styles.css` and `@ming/components/cn`.
- `@ming/components/button`, `input`, `textarea`, `label`, `field`, `checkbox`, `select`, `badge`,
  `inline-message`, and `status-text`.
- `@ming/components/form-field`, `search-field`, `confirm-action`, and `status-region`.
- `@ming/components/app-shell`, `sidebar-nav`, `nav-list`, and `resource-table`.

Variant helpers are exported by their component subpaths. The callback contracts are plain React:

```tsx
<Select value={value} onValueChange={setValue} />
<SearchField value={query} onValueChange={setQuery} onClear={clearQuery} />
<ConfirmAction open={open} onOpenChange={setOpen} onConfirm={removeItem} />
```

React Hook Form adapters remain in consumer applications. `react-hook-form` is not a dependency of
the main package.

## qmenut admin migration

`/Users/murgapja/dev/qmenut/apps/admin` now:

- Imports `@ming/components/styles.css` once from the application entry point.
- Uses React `Button`, `Field`, `InlineMessage`, `AppShell`, and `SidebarNav` components.
- Uses direct React callbacks instead of `onMc*` custom-event adapters.
- Contains no component registration side effect, `<mc-*>` elements, old package imports, or legacy
  `mc-*` CSS tokens/utilities.
- Uses semantic library tokens plus app-owned `--admin-*` tokens for admin-only presentation.
- Applies light/dark preference using root classes rather than `data-mc-theme`.
- Removes direct admin dependencies on `@murga.ing/components` and `lit`.

No public-menu snapshot was regenerated. No new admin visual snapshots were required because the
existing E2E behavior and accessibility suite exercised the migrated admin flows.

## Portal, focus, and CSS findings

- Base UI package dependencies must remain external in the Vite library build. Bundling them
  initially produced a browser-time `Dynamic require of react` failure that only appeared when the
  packed artifact was run in qmenut; the final artifact imports Base UI and React normally.
- `Select` and `ConfirmAction` render overlays through Base UI portals and add `.ming-portal` for
  predictable stacking and theme inheritance.
- The mobile `AppShell` sidebar uses Base UI `Dialog`, restores focus to its trigger on close, and
  exposes controlled `open`/`onOpenChange` state.
- `StatusRegion` portals to `document.body`; timed dismissal is suppressed when reduced motion is
  requested and pauses during interaction.
- The package root has no implicit CSS side effect. Consumers must import `styles.css` once.

## Verification

Library (`/Users/murgapja/dev/ming-components`):

- `bun run lint`: passed.
- `bun run check`: passed.
- `bun run test`: passed, 5 files and 20 tests.
- `bun run package:check`: passed, including build, `publint`, tarball extraction, and imports from
  the packed distribution.

qmenut (`/Users/murgapja/dev/qmenut`):

- `bun run check`: passed, 13/13 Turbo tasks.
- `bun run build`: passed, 7/7 Turbo tasks.
- `bun run test:e2e`: passed, 46/46 tests in 57.3 seconds.
- `bun run lint:eslint`: passed with three existing warnings outside the admin migration.
- `bun run lint`: the ESLint phase passes, but the repository-level Prettier check remains blocked
  by the pre-existing, untouched `apps/api/wrangler.jsonc` formatting difference.
- Required residue search in `apps/admin`: zero matches.

## Contracts for roncalphoto blocks

Plan 3 blocks must:

- Use controlled values and direct React callbacks. Never introduce custom events, `event.detail`,
  `onMc*`, custom-element registration, or slot-name compatibility layers.
- Import library CSS once at the application entry point and style through semantic tokens. Do not
  add `mc-*` aliases.
- Keep React Hook Form integration in the application adapter layer.
- Keep blocks domain-, route-, and transport-neutral: receive data and callbacks through props and
  do not fetch or navigate internally.
- Preserve the shared overlay contract: controlled open state, keyboard dismissal, focus trapping
  while open, and focus restoration when closed.
- Compose primitives rather than reimplementing their state, focus, disabled, or invalid behavior.
- Follow `ResourceTable`'s React render contract (`column.render(row)`) rather than serialized cell
  descriptors.
- Keep all block states explicit in props, including loading, empty, error, success, selection, and
  destructive confirmation.
