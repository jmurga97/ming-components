# Changelog

All notable changes follow Semantic Versioning.

## 2.0.3 - 2026-09-28

- Allow apps to localize AppShell navigation labels, optional Field text, MediaBrowser thumbnails,
  and ResourceTable refresh announcements.
- Fix Select options wrapping word-by-word, keep the trigger value on one line with an ellipsis,
  shrink the chevron to the small icon size, and cap the popup at 20rem so it sizes to its content.

## 1.0.5 - 2026-09-08

- Label the Select listbox with its trigger so open popups pass `aria-input-field-name` axe checks.

## 1.0.2 - 2026-08-24

- Keep Select popups aligned to the trigger width when option labels vary.
- Let controlled NavList links use client-side navigation without breaking modified clicks.

## 1.0.0 - Unreleased

- Replace the historical Lit/custom-element package with a React 19-only API.
- Publish root and explicit component subpath exports plus one stylesheet export.
- Add accessible operational atoms, navigation, overlays, tables, editors, media and tag blocks.
- Add `DropdownMenu` for complete keyboard operation and focus restoration in row actions.
- Add Vitest coverage gates, axe checks, publint, tarball inspection and an installed Vite browser
  fixture covering types, CSS, tree shaking, production build, portals and dark mode.
- Document installation, theming, dark mode, API, keyboard behavior, migration and versioning.
