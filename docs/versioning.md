# Versioning policy

`@ming/components` follows Semantic Versioning.

- Patch: compatible bug, accessibility, documentation or styling fixes that do not change the
  documented contract.
- Minor: new components, subpaths, props or backward-compatible behavior.
- Major: removed/renamed exports, changed callback payloads, required new props, removed token
  contracts or intentional incompatible visual/interaction behavior.

Deprecations should ship in a minor release before removal in the next major when practical. The
package does not keep permanent aliases for the historical custom-element API.

The initial public version is `1.0.0`. “v2” describes the rewrite relative to the historical
library; it is not the npm major. Publishing requires explicit authorization, successful quality
commands, registry identity/scope checks and review of the exact tarball.
