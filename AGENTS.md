# AGENTS.md — Ming Components

## Scope

`@ming/components` is a React-only component library for reusable operational interfaces.

## Commands

Use Bun 1.3.6 only.

```bash
bun install
bun run dev
bun run lint
bun run check
bun run test
bun run build
bun run package:check
```

## Architecture

- Use React 19 and strict TypeScript.
- Organize components with atomic design as a decision aid: atoms, molecules, organisms, and templates.
- Name source files in `snake_case`; name React components in `PascalCase`.
- Keep the library independent of routing, fetching, persistence, authorization, and application models.
- Publish one root barrel plus explicit direct-import subpaths. Do not add `/react` or `/register`.
- Never register, initialize, or mutate global state as an import side effect.
- Import `@ming/components/styles.css` once in each consuming application entry point.

## APIs

- Use idiomatic React props and callbacks. Pass primitive values or domain-neutral data, never `CustomEvent`.
- Prefer `children` and render props over slot emulation.
- Preserve useful neutral models such as `columns`, `rows`, and `selectedIds` when they reduce consumer work.
- Prefer an options object when a function would otherwise exceed a reasonable parameter count.
- Use early returns to avoid deep nesting.
- Do not add permanent legacy aliases.

## Quality

- Do not weaken or rewrite ESLint rules to make code pass.
- Treat semantic HTML, accessible names, keyboard operation, focus visibility/restoration, and reduced motion as functional requirements.
- Every new component requires a working playground example and tests proportional to its state and interaction surface.
- Test public behavior and callback payloads. Add accessibility checks for rendered primitives and composite states.
- Run lint, check, test, build, and package:check before handoff.
