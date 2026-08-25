# Inventario y prioridad

Auditoría realizada sobre:

- `/Users/murgapja/dev/murga-components/src/components`: 27 custom elements históricos.
- `/Users/murgapja/dev/qmenut/apps/admin`: rutas y componentes compartidos completos.
- `/Users/murgapja/dev/roncalphoto/apps/photos-admin`: rutas y componentes compartidos completos.

Se contaron imports, JSX directo, wrappers compartidos, registro global, Lit, slots, tokens CSS y utilities Tailwind `mc-*`.

## Resumen

| Prioridad | Significado                                      | Total |
| --------- | ------------------------------------------------ | ----: |
| P0        | consumo real directo o indirecto                 |    21 |
| P1        | gap confirmado por una página real               |     8 |
| P2        | histórico sin consumo directo actual             |     3 |
| Drop      | reemplazado por composición o fuera de dirección |     3 |

## P0 — bloquea una página real

| Componente nuevo / subpath                | Evidencia                                              | Contrato esencial                                          | Base UI                   |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- | ------------------------- |
| `AppShell` `/app-shell`                   | shells de ambos admins                                 | `header`, `navigation`, `children`, `open`, `onOpenChange` | Drawer en móvil (Plan 2)  |
| `Badge` `/badge`                          | estados de fotos y deliveries                          | `tone`, `children`                                         | no necesaria              |
| `BulkActions` `/bulk-actions`             | selección múltiple de fotos                            | count, disabled, actions/status, clear                     | Toolbar                   |
| `Button` `/button`                        | 34 etiquetas directas + acciones indirectas            | variantes, tamaños, disabled/loading                       | Button; implementado      |
| `ConfirmAction` `/confirm-action`         | borrado de fotos/sesiones                              | controlled open, pending, confirm/cancel                   | Alert Dialog              |
| `Field` `/field`                          | wrappers de formulario y color/session picker          | label, hint, error, required/optional                      | Field                     |
| `InlineMessage` `/inline-message`         | errores/success/unsupported en ambos apps              | tone, title, message/children                              | semántica nativa          |
| `Input` `/input`                          | adaptadores roncalphoto; qmenut usa equivalente nativo | value, invalid, `onValueChange`                            | Input; implementado       |
| `MediaBrowser` `/media-browser`           | preview lateral del editor de foto                     | items, selection, empty, rail toggle                       | composición               |
| `OverviewPanel` `/overview-panel`         | overview roncalphoto                                   | stats, status, title/description                           | composición               |
| `RelationshipPanel` `/relationship-panel` | sesión→fotos y tag→sesiones                            | items, empty, select                                       | lista semántica           |
| `ResourceEditor` `/resource-editor`       | editores de foto y sesión                              | fields/aside/actions, dirty/saving/deleting                | composición               |
| `ResourceTable` `/resource-table`         | sesiones, tags, fotos                                  | generic rows/columns/selection/actions                     | implementado parcial      |
| `SearchField` `/search-field`             | listas de sesiones/tags/fotos/deliveries               | value, clear, search semantics                             | Input + Button            |
| `Select` `/select`                        | formularios, upload y bulk session                     | options, selected id, open                                 | Select                    |
| `SidebarNav` `/sidebar-nav`               | navegación de ambos admins                             | items/footer/current/collapsed                             | navegación semántica      |
| `StatusRegion` `/status-region`           | resultado de upload y bulk fotos                       | open, tone, autoDismiss, dismiss                           | Toast                     |
| `StatusText` `/status-text`               | estado/live counts en roncalphoto                      | tone, polite, label                                        | live region               |
| `TagList` `/tag-list`                     | tags activos del editor sesión                         | items, selected ids, interactive                           | Toggle Group si editable  |
| `TagPicker` `/tag-picker`                 | adaptador de tags de sesión                            | multi value, options, open                                 | Combobox/Popover          |
| `Textarea` `/textarea`                    | adaptadores y formularios de ambos apps                | value, rows, invalid                                       | Field-compatible textarea |

`ResourceTable` no está completo para migración P0: falta select-all, sort, cell activation segura, estado refetching y layout móvil. La entrada existe para fijar el contrato y validar empaquetado.

## P1 — gaps confirmados

| Componente nuevo | Página/evidencia                            | Alcance                                                                               |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `Checkbox`       | branch/menu/promotions/loyalty qmenut       | label por Field, checked/disabled, keyboard                                           |
| `EmptyState`     | listas y guardas sin branch/domain en ambos | title, description, action; puede acabar como patrón documentado                      |
| `PageHeader`     | todas las páginas                           | kicker/title/description/actions; corregir composición sin acoplar routing            |
| `Card`           | overview, billing, listas                   | superficie sin sombra; podría ser pattern CSS si no aporta conducta                   |
| `FileUpload`     | imágenes de branch/menu y lotes roncalphoto | input nativo, drag/drop opcional, validación accesible                                |
| `ImageGallery`   | branch qmenut                               | previews, reorder, replace/remove/retry, estados por item                             |
| `DropdownMenu`   | DeliveryRowMenu                             | implementado: roving focus, typeahead, Escape, cierre exterior y restauración de foco |
| `Tabs`           | secciones Loyalty                           | tablist/tabpanel, URL controlada por app; Base UI Tabs                                |

`DropdownMenu` es el único gap adicional promovido para el primer release. Tabs, FileUpload e
ImageGallery requieren un contrato consumidor más completo; Card, EmptyState y PageHeader siguen
resueltos como composición/patrón.

## P2 — conservar como referencia, no implementar aún

| Histórico           | Motivo                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `mc-pagination`     | no hay consumo directo; roncalphoto lleva `page` en search pero las vistas auditadas no renderizan el componente |
| `mc-thumbnail`      | no hay consumo directo; previews actuales son JSX de producto                                                    |
| `mc-thumbnail-rail` | no hay consumo directo; `MediaBrowser(showRail=false)` no justifica rail separado                                |

Pagination, Thumbnail y ThumbnailRail solo suben de prioridad con una página concreta y contrato probado.

## Drop

| Histórico                               | Sustitución                                                               |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `mc-nav-list`                           | `SidebarNav` + links/items React; duplicaba navegación                    |
| `ming-orb`                              | elemento de marca/decoración sin consumo; no pertenece a Quiet Operations |
| `registerMurgaComponents` / `defineMc*` | desaparecen por la decisión React-only; no son componentes/API nueva      |

## Dependencias a eliminar de consumidores al final

| Dependencia                  | qmenut                   | roncalphoto              | Condición de retirada                   |
| ---------------------------- | ------------------------ | ------------------------ | --------------------------------------- |
| `@murga.ing/components`      | sí                       | sí                       | cero imports/tags/tokens legacy         |
| `lit`                        | sí, solo por integración | sí, solo por integración | retirar junto con custom elements       |
| `/register` + llamada global | sí                       | sí                       | primer cambio de entrada de app         |
| `/react` side-effect import  | sí                       | sí                       | sustituir por CSS único y imports React |
