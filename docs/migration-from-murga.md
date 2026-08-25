# Migration from `@murga.ing/components`

1. Remove `@murga.ing/components` and `lit` when no other code uses Lit.
2. Add `@ming/components` and import `@ming/components/styles.css` once in the React entry point.
3. Delete `/react`, `/register`, `registerMurgaComponents` and any custom-element initialization.
4. Replace `<mc-*>` elements with React components. Replace slots with `children` or named
   `ReactNode` props.
5. Replace event-detail handlers with direct callbacks: `event.detail.value` becomes
   `onValueChange(value)`, `event.detail.open` becomes `onOpenChange(open)`.
6. Replace `data-mc-theme` with `light`/`dark` on `document.documentElement`.
7. Replace `--color-mc-*`, `--text-mc-*`, `--ease-mc-*` and `mc-*` utilities with consumer tokens or
   the semantic package tokens.
8. Keep React Hook Form adapters in the application; the library deliberately has no form-library
   dependency.
9. Search the migrated application and require zero residue:

```bash
rg '@murga\.ing/components|registerMurgaComponents|<mc-|--color-mc-|--text-mc-|--ease-mc-'
```

Common mappings: `mc-button` → `Button`, form wrapper → `Field`, `mc-select` → `Select`, legacy
confirm dialog → controlled `ConfirmAction`, row action menu → `DropdownMenu`, data grids → typed
`ResourceTable`, and notification custom elements → `InlineMessage` or `StatusRegion` depending on
whether the message is persistent or transient.
