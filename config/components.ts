export type Tier = 'atoms' | 'molecules' | 'organisms' | 'templates';

export interface PackageEntry {
  /** Public subpath segment in kebab-case, e.g. `form-field` for `@ming/components/form-field`. */
  slug: string;
  /**
   * Import specifier relative to `src/`, extensionless. Component entries must live under
   * `components/<tier>/<name>`; utility entries point at a `lib/` module.
   */
  module: string;
  /** Atomic tier used to validate component placement. Omitted for non-component utilities. */
  tier?: Tier;
}

/**
 * Single source of truth for every public JavaScript subpath except the root barrel.
 *
 * - Vite library entries are generated from this list (`src/entries/<name>.ts` → `dist/<name>.js`).
 * - `scripts/check_package.ts` verifies that package.json `exports` matches it exactly.
 * - Adding a component: create `src/components/<tier>/<name>/`, one line here,
 *   one entry re-export in `src/entries/<name>.ts`, plus barrel + exports map lines.
 */
export const PACKAGE_ENTRIES: readonly PackageEntry[] = [
  { slug: 'badge', module: 'components/atoms/badge', tier: 'atoms' },
  { slug: 'button', module: 'components/atoms/button', tier: 'atoms' },
  { slug: 'checkbox', module: 'components/atoms/checkbox', tier: 'atoms' },
  { slug: 'field', module: 'components/atoms/field', tier: 'atoms' },
  { slug: 'inline-message', module: 'components/atoms/inline_message', tier: 'atoms' },
  { slug: 'input', module: 'components/atoms/input', tier: 'atoms' },
  { slug: 'label', module: 'components/atoms/label', tier: 'atoms' },
  { slug: 'select', module: 'components/atoms/select', tier: 'atoms' },
  { slug: 'status-text', module: 'components/atoms/status_text', tier: 'atoms' },
  { slug: 'switch', module: 'components/atoms/switch', tier: 'atoms' },
  { slug: 'textarea', module: 'components/atoms/textarea', tier: 'atoms' },
  { slug: 'confirm-action', module: 'components/molecules/confirm_action', tier: 'molecules' },
  { slug: 'dropdown-menu', module: 'components/molecules/dropdown_menu', tier: 'molecules' },
  { slug: 'form-field', module: 'components/molecules/form_field', tier: 'molecules' },
  { slug: 'search-field', module: 'components/molecules/search_field', tier: 'molecules' },
  { slug: 'status-region', module: 'components/molecules/status_region', tier: 'molecules' },
  { slug: 'nav-list', module: 'components/molecules/nav_list', tier: 'molecules' },
  { slug: 'sidebar-nav', module: 'components/organisms/sidebar_nav', tier: 'organisms' },
  { slug: 'bulk-actions', module: 'components/organisms/bulk_actions', tier: 'organisms' },
  { slug: 'media-browser', module: 'components/organisms/media_browser', tier: 'organisms' },
  { slug: 'overview-panel', module: 'components/organisms/overview_panel', tier: 'organisms' },
  {
    slug: 'relationship-panel',
    module: 'components/organisms/relationship_panel',
    tier: 'organisms',
  },
  { slug: 'resource-editor', module: 'components/organisms/resource_editor', tier: 'organisms' },
  { slug: 'resource-table', module: 'components/organisms/resource_table', tier: 'organisms' },
  { slug: 'tag-list', module: 'components/organisms/tag_list', tier: 'organisms' },
  { slug: 'tag-picker', module: 'components/organisms/tag_picker', tier: 'organisms' },
  { slug: 'app-shell', module: 'components/templates/app_shell', tier: 'templates' },
  { slug: 'cn', module: 'lib/cn' },
];

/** snake_case entry file base name for a public subpath, e.g. `app-shell` → `app_shell`. */
export function entryName(slug: string): string {
  return slug.replaceAll('-', '_');
}
