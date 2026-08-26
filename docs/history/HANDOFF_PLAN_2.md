# Handoff — Plan 2

## Estado de la fundación

El paquete existe en `/Users/murgapja/dev/ming-components` con Bun 1.3.6, React 19, strict TypeScript, Vite library mode, Tailwind 4, Vitest, Testing Library, user-event, jest-dom, axe-core, ESLint, Prettier, publint y playground Vite.

Entradas implementadas y empaquetadas:

- root barrel
- `styles.css`
- `button`
- `input`
- `app-shell`
- `resource-table`

`Button` e `Input` usan Base UI 1.7. `AppShell` y `ResourceTable` son fundaciones funcionales, no el final de P0: sus gaps están abajo.

## Orden recomendado de Plan 2

1. Completar atoms/forms: Field, Textarea, Checkbox, Badge, StatusText, InlineMessage.
2. Implementar Select y SearchField; después TagPicker. Usar Base UI Select/Combobox y pruebas de teclado.
3. Implementar ConfirmAction y StatusRegion con Alert Dialog/Toast; validar foco y reduced motion.
4. Completar ResourceTable antes de tocar la lista de fotos: select-all, sort, acciones, refetching, mobile `scroll|stacked`, celdas interactivas sin nested buttons.
5. Implementar Toolbar/BulkActions y migrar primero listas simples de roncalphoto (tags, sessions), luego photos.
6. Completar AppShell móvil y SidebarNav; migrar shells y eliminar registro/Lit en cada app solo cuando todos sus tags desaparezcan.
7. Implementar ResourceEditor, RelationshipPanel, TagList, MediaBrowser y OverviewPanel; migrar editores/overview.
8. Abordar P1 solo mediante historia de consumidor: Menu delivery, FileUpload/ImageGallery, Tabs Loyalty, Checkbox qmenut.

## Contratos que no se reabren

- React-only; no `/react`, `/register`, custom elements ni aliases `onMc*`.
- CSS importado una sola vez desde la app.
- `.light`/`.dark` explícitos; media query solo sin selección.
- Callbacks reciben valores (`onValueChange`, `onOpenChange`, `onSelectionChange`) o acciones sin `CustomEvent`.
- ResourceTable usa `column.render(row)`, no slots string.
- React Hook Form adapters pertenecen a consumidores.
- Sin routing, fetching, persistencia, permissions ni modelos qmenut/roncalphoto en la librería.

## P0 exacto

AppShell, Badge, BulkActions, Button, ConfirmAction, Field, InlineMessage, Input, MediaBrowser, OverviewPanel, RelationshipPanel, ResourceEditor, ResourceTable, SearchField, Select, SidebarNav, StatusRegion, StatusText, TagList, TagPicker y Textarea.

Pagination, Thumbnail y ThumbnailRail permanecen P2. No subirlos por existir históricamente. `mc-nav-list`, `ming-orb` y toda la API de registro están Drop.

## Gaps de las entradas existentes

### AppShell

- Implementar navegación móvil con Base UI Drawer/Dialog según el patrón final.
- Overlay, Escape, scroll lock y restauración de foco.
- Añadir footer si SidebarNav demuestra que lo requiere como prop, no slot.

### ResourceTable

- No usar un botón por cada celda: el prototipo actual sirve solo para filas simples.
- Añadir activación por fila/celda sin invalidar celdas con checkbox, preview o acciones.
- Select-all con label configurable y selección controlada.
- Sort controlado, row actions, `refetching`, empty state y mobile layouts.
- Pruebas con el caso completo de `/photos` antes de declararlo listo.

### Button/Input

- Mantener las props Base UI (`render`, `focusableWhenDisabled`, `onValueChange`).
- Añadir ejemplos para estados disabled/loading/invalid cuando se integren Field y formularios.

## Primera migración segura

roncalphoto `/tags` o `/sessions` lista es el mejor vertical slice: SearchField + ResourceTable simple + Button, sin selección múltiple ni media. No empezar por `/photos`.

En cada consumidor:

1. Importar `@ming/components/styles.css` una vez.
2. Añadir bridge temporal de tokens legacy.
3. Migrar una página y sus shared wrappers.
4. Verificar teclado, foco, light/dark y responsive.
5. Retirar bridge/imports legacy solo al llegar a cero referencias con `rg`.

## Evidencia

- Matriz completa: `docs/audit/page-component-matrix.md`
- Prioridades: `docs/audit/component-inventory.md`
- API: `docs/contracts/component-api.md`
- Dirección visual: `docs/contracts/design-system.md`
- Decisiones: `docs/adr/*.md`

## Comandos de salida

```bash
cd /Users/murgapja/dev/ming-components
bun install
bun run lint
bun run check
bun run test
bun run build
bun run package:check
```
