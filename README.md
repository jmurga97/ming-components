# @ming/components

React 19 components for accessible operational interfaces. The visual direction is **Quiet
Operations**: calm density, semantic color, flat surfaces and visible state.

## Installation

The library is published to GitHub Packages as `@jmurga97/components` whenever a `v*` tag is pushed.
Consumers such as the `qmenut` and `roncalphoto` repositories install it from there.

1. Create a classic personal access token with the `read:packages` scope. The package is public, so
   no per-user grant on this repository is needed; the token itself is still required because the
   GitHub Packages npm registry always authenticates installs.
2. Configure the registry in a `.npmrc` at the consuming project root:

   ```
   @jmurga97:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
   always-auth=true
   ```

3. Provide the token as `NPM_TOKEN` in your shell or CI secrets, then install:

   ```bash
   bun add @jmurga97/components
   ```

Every push to `main` runs release checks and publishes `@jmurga97/components` under the `latest`
tag. If `package.json` has a version without a matching `v*` tag, that exact version is published;
otherwise the patch version is incremented. The action commits the published version and creates
its tag. To make a major or minor release, set `package.json` to that version first. Automated
release commits are skipped by the workflow.

Before the first publication, install a verified release tarball instead:

```bash
bun add /absolute/path/to/ming-components-1.0.2.tgz
```

React and React DOM are peer dependencies. The package is React-only and does not register custom
elements, initialize global state or depend on Lit.

## Minimum example

Import the stylesheet once at the application entry point. Components can come from the root
barrel or an explicit subpath.

```tsx
import { Field } from '@jmurga97/components';
import { Button } from '@jmurga97/components/button';
import { Input } from '@jmurga97/components/input';
import '@jmurga97/components/styles.css';

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

Every component is available from `@jmurga97/components` and from a kebab-case subpath. Examples:

```ts
import { DropdownMenu } from '@jmurga97/components/dropdown-menu';
import { ResourceTable } from '@jmurga97/components/resource-table';
import { Select } from '@jmurga97/components/select';
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
bun run dev
bun run test:storybook
bun run build-storybook
bun run lint
bun run check
bun run test
bun run build
bun run package:check
```

`dev` starts Storybook at `http://localhost:6006`. Component stories cover the library’s 27
components; play-function tests and browser-based accessibility checks run with
`bun run test:storybook`. The local Storybook MCP endpoint is available at `/mcp` while the dev
server is running for compatible coding agents. See [Storybook AI setup](https://storybook.js.org/docs/ai)
for agent configuration. The deployed Worker serves the static catalog; MCP stays local to dev.

`test` runs the unit suite and enforces its coverage gates. `package:check` runs publint, inspects
every packed export, installs the generated tarball into a clean Vite fixture, checks
types/CSS/tree shaking/production build, then verifies portals and dark mode in Chromium.
`build-storybook` creates the static catalog in `storybook-static`; GitHub Actions deploys that
directory to the `ming-components-storybook` Cloudflare Worker after verification succeeds on
`main`. Configure `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as repository secrets before
the first deployment. Visual regression testing is not enabled. Package publication runs
automatically on pushes to `main` after the release checks.
