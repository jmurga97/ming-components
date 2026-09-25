# Versioning policy

`@ming/components` follows Semantic Versioning.

- Patch: compatible bug, accessibility, documentation or styling fixes that do not change the
  documented contract.
- Minor: new components, subpaths, props or backward-compatible behavior.
- Major: removed/renamed exports, changed callback payloads, required new props, removed token
  contracts or intentional incompatible visual/interaction behavior.

Deprecations should ship in a minor release before removal in the next major when practical. The
package does not keep permanent aliases for the historical custom-element API.

The historical custom-element rewrite began at `1.0.0`; the React package uses Semantic Versioning
independently. The release workflow runs lint, typecheck, unit tests and package verification before
publishing to GitHub Packages.

The release workflow publishes an untagged version already in `package.json` as-is. Set it to
`2.0.0` for this major release; after `v2.0.0` exists, subsequent pushes to `main` increment the
patch version automatically.
