# Handoff Plan 4

## Distribución y release

- Paquete verificado: `@ming/components@0.1.0`.
- Artefacto Plan 3: `/Users/murgapja/dev/ming-components/ming-components-0.1.0-plan3.tgz`.
- SHA-512 del archivo: `33e796b9b1265323465463c7ba03b69043f3624436d47fd994a18a907596a1e7a521f43582d37c52584c1cbb13db7eb7107762c0accf16476b6d8b17af5026a3`.
- `roncalphoto/apps/photos-admin` consume ese tarball y fue verificado contra el paquete empacado, no contra imports directos del source tree.
- Decisión pendiente de release: Plan 2 y Plan 3 usan ambos la versión `0.1.0`, pero contienen distribuciones distintas. No se debe publicar Plan 3 sobre una versión `0.1.0` ya publicada. Antes del release hay que asignar una versión nueva, publicar el artefacto y sustituir la dependencia `file:` de roncalphoto por esa versión exacta.

## Estado de componentes

| Componente                    | Estado              | Notas                                                                                                                                                                                |
| ----------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ResourceTable`               | Completo P0         | Columnas y renderers tipados, sorting controlado, selección individual y de página, acciones por fila, activación opcional segura, loading/refetching/empty/error, densidad, `scroll | stacked`, `aria-sort` y labels configurables. No usa TanStack Table. |
| `BulkActions`                 | Completo P0         | Integrado con count, clear selection, disabled, actions y status.                                                                                                                    |
| `ResourceEditor`              | Completo P0         | Header, main, aside, actions, dirty/saving/deleting/error y responsive. La confirmación destructiva se compone con `ConfirmAction` desde el consumidor.                              |
| `TagPicker`                   | Completo P0         | Valor controlado, búsqueda, empty, disabled, operación por teclado nativo y anuncio live de selección.                                                                               |
| `TagList`                     | Completo P0         | Lectura o selección controlada e interactiva.                                                                                                                                        |
| `RelationshipPanel`           | Completo P0         | Lista/empty/disabled y navegación controlada por callback.                                                                                                                           |
| `MediaBrowser`                | Completo P0         | Media principal, selección controlada, empty y rail interno opcional.                                                                                                                |
| `OverviewPanel`               | Completo P0         | Título, descripción, status, métricas y loading.                                                                                                                                     |
| `Pagination`                  | P2, no implementado | La auditoría no encontró consumo real.                                                                                                                                               |
| `Thumbnail` / `ThumbnailRail` | Internos            | El rail solo existe dentro de `MediaBrowser`; no hay subpaths públicos.                                                                                                              |

Los componentes nuevos tienen root exports, subpaths, tipos, estilos, playground y tests. La suite incluye selección, sorting, acciones, loading/empty/error, teclado, foco y axe. El sistema conserva Quiet Operations: superficies sin sombra, densidad moderada y rail de 2 px como indicador de selección.

## Rutas migradas en roncalphoto

Aplicación: `/Users/murgapja/dev/roncalphoto/apps/photos-admin`.

- Entrada global y login: CSS único de `@ming/components`, sin registro global; login sobre `Field`, `Input`, `Button` e `InlineMessage`.
- Shell autenticado: `AppShell`, `SidebarNav`, `StatusText` y callbacks React.
- Overview: `/` usa `OverviewPanel`.
- Tags: `/tags` y `/tags/$slug` usan `SearchField`, `ResourceTable`, `InlineMessage` y `RelationshipPanel`.
- Sessions: `/sessions`, `/sessions/new` y `/sessions/$slug` usan tabla tipada, `ResourceEditor`, `TagPicker`, `TagList`, `RelationshipPanel` y `ConfirmAction`.
- Photos: `/photos`, `/photos/new` y `/photos/$id` usan `ResourceTable`, `BulkActions`, `MediaBrowser`, formularios React y estados/confirmaciones controlados.
- Deliveries: `/deliveries` y `/deliveries/new` migraron todos los atoms legacy y mantienen sus piezas específicas de producto.
- Adaptadores React Hook Form permanecen en la aplicación.
- Se retiraron `@murga.ing/components`, `lit`, `/react`, `/register`, custom events, slots, etiquetas `<mc-*>` y tokens/utilities `mc-*`.

El comando de residuos requerido devuelve cero resultados.

## Playwright de roncalphoto

- Configuración raíz en `playwright.config.ts` y script `bun run test:e2e`.
- Fixtures HTTP deterministas para auth, sessions, photos y tags. Se usan en lugar de D1 porque este repositorio declara la D1 remota como única fuente y no tiene seed local.
- Limpieza: cada test recibe una página/contexto nuevo y el estado de red se reinstala desde fixtures inmutables; no se persisten mutaciones entre tests.
- Cobertura: smoke de Overview/Sessions/Photos/Tags/Deliveries, edición y guardado, tabla y selección, `ConfirmAction` con foco inicial, y navegación responsive con Escape/restauración de foco.
- Resultado: **4/4 passed** en Chromium.

## Accesibilidad y deuda

- Los bloques de librería pasan axe en composición completa y los controles críticos tienen nombres accesibles.
- `ResourceTable` expone `aria-sort`, selección de página/filas y activación por Enter/Espacio sin capturar clicks de controles internos.
- `ConfirmAction` mantiene foco seguro, trap, Escape y restauración al trigger.
- Deuda P1: convertir `DeliveryRowMenu` al futuro componente `Menu` para roving focus y navegación con flechas. El menú actual mantiene Escape y cierre exterior, pero no implementa el patrón completo de menu keyboard.
- Deuda P1: ampliar Playwright con validación visual responsive de uploads cuando exista backend real de deliveries/uploads.
- Deuda P2: no hay auditoría axe E2E de cada ruta; axe está cubierto en la librería y los flujos críticos se validan en navegador.

## Verificación

### `@ming/components`

- `bun run lint`: passed.
- `bun run check`: passed.
- `bun run test`: passed, 6 archivos y 28 tests.
- `bun run build`: passed.
- `bun run package:check`: passed, incluyendo publint e imports del paquete empacado.

### roncalphoto

- `bun run check`: passed, 6/6 workspaces.
- `bun run build`: passed, 3/3 tareas con build.
- `bun run test:e2e`: passed, 4/4.
- Prettier y ESLint sobre `apps/photos-admin`: passed sin errores.
- `bun run lint` raíz permanece bloqueado por deuda preexistente fuera de la migración: seis documentos ya desformateados y `apps/api/src/modules/photo-uploads/image-worker.client.ts` con `require-await`. No se modificaron esos archivos ajenos al Plan 3.

### qmenut

- `bun run check`: passed, 13/13 tareas.
- `bun run build`: passed.
- `bun run test:e2e`: la infraestructura arrancó 46 tests, pero el setup OTP no pudo continuar porque ya había un Worker de qmenut ocupando `8787`; con `E2E_REUSE_SERVERS=1`, ese Worker preexistente respondió 500 al endpoint de envío OTP. No se detuvo el proceso ajeno. La suite no llegó a ejecutar los 45 tests dependientes.

## Cambios visuales deliberados

- Las tablas móviles pasan a cards apiladas con labels de columna, sin ocultar el significado de las celdas.
- La selección de tabla, tags y thumbnails usa el rail de 2 px del sistema.
- Los editores conservan aside separado en desktop y lo apilan bajo el contenido en móvil.
- Los tokens legacy se renombraron como tokens `--admin-*`; los componentes compartidos usan los tokens semánticos de la librería.
- No se añadieron gráficas, login blocks genéricos, Pagination ni blocks de shadcn sin consumo.

## P1/P2 pendientes y decisiones de release

1. Elegir y publicar una versión nueva de `@ming/components`; actualizar roncalphoto desde el tarball local a la versión exacta publicada.
2. Ejecutar qmenut E2E en un entorno sin procesos previos en `8787`, o detener explícitamente el Worker existente con autorización, para cerrar la revalidación 46/46.
3. P1: `Menu` para `DeliveryRowMenu`; evaluar `FileUpload`/`ImageGallery` solo desde los flujos reales de upload.
4. P2: Pagination y exports públicos de thumbnails siguen descartados hasta que exista consumo comprobado.
5. El endpoint de deliveries y la subida batch siguen siendo mocks/product debt de roncalphoto; Playwright valida la UI actual, no una persistencia que todavía no existe.
