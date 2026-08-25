# @ming/components

React 19 components for accessible operational interfaces. The visual direction is **Quiet
Operations**: calm density, semantic color, flat surfaces and visible state.

## Installation

After the first public release:

```bash
bun add @ming/components@1.0.0
```

Before publication, install the verified release tarball instead:

```bash
bun add /absolute/path/to/ming-components-1.0.0.tgz
```

React and React DOM are peer dependencies. The package is React-only and does not register custom
elements, initialize global state or depend on Lit.

## Minimum example

Import the stylesheet once at the application entry point. Components can come from the root
barrel or an explicit subpath.

```tsx
import { Field } from '@ming/components';
import { Button } from '@ming/components/button';
import { Input } from '@ming/components/input';
import '@ming/components/styles.css';

export function Settings(): React.JSX.Element {
  return (
    <form>
      <Field label="Restaurant name" required>
        <Input name="name" />
      </Field>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
```

## Theming and dark mode

The stylesheet publishes semantic tokens such as `--background`, `--foreground`, `--primary`,
`--border`, `--ring` and `--radius`. Override them in the consumer; do not target internal
`ming-*` classes as a theming API.

Add `light` or `dark` to the document element for an explicit theme. With neither class,
`prefers-color-scheme` is respected.

```ts
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add('dark');
```

The application owns persistence and the pre-hydration theme script. Components respect
`prefers-reduced-motion: reduce`.

## Exports

Every component is available from `@ming/components` and from a kebab-case subpath. Examples:

```ts
import { DropdownMenu } from '@ming/components/dropdown-menu';
import { ResourceTable } from '@ming/components/resource-table';
import { Select } from '@ming/components/select';
```

Available component subpaths are `app-shell`, `badge`, `bulk-actions`, `button`, `checkbox`,
`confirm-action`, `dropdown-menu`, `field`, `form-field`, `inline-message`, `input`,
`media-browser`, `nav-list`, `overview-panel`, `relationship-panel`, `resource-editor`,
`resource-table`, `search-field`, `select`, `sidebar-nav`, `status-region`, `status-text`,
`tag-list`, `tag-picker` and `textarea`. Utility `cn` and stylesheet `styles.css` are also public.

See [the component reference](docs/component-reference.md),
[migration guide](docs/migration-from-murga.md), [version policy](docs/versioning.md) and
[changelog](CHANGELOG.md).

## Development and release checks

Use Bun 1.3.6.

```bash
bun install
bun run lint
bun run check
bun run test
bun run build
bun run package:check
```

`test` enforces coverage gates. `package:check` runs publint, inspects every packed export, installs
the generated tarball into a clean Vite fixture, checks types/CSS/tree shaking/production build,
then verifies portals and dark mode in Chromium. Publication is a separate, explicitly authorized
operation.
