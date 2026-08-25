# ADR 005: ResourceTable conserva el modelo y abandona slots

- Estado: aceptado
- Fecha: 2026-08-23

## Contexto

roncalphoto usa `McResourceTable` en sesiones, tags y fotos. Conserva `columns`, `rows` y `selectedIds`, pero personaliza celdas mediante slots dinámicos como `cell:<rowId>:<columnId>`. Las tablas simples navegan al seleccionar fila; fotos requiere selección múltiple, previews, badges, estado de refetch y layout móvil apilado.

## Decisión

`ResourceTable<Row>` conserva el modelo de columnas/filas y selección controlada. Cada columna usa `render(row)` en React. Los identificadores salen de `getRowId(row)`. Los callbacks son:

```ts
onSelectionChange(ids);
onRowActivate(row);
onSortChange({ columnId, direction });
onRowAction({ row, actionId });
```

No se expone `cells: Record<string, string>` como requisito ni slots dinámicos. El modelo de dominio puede ser el propio objeto `Row`. La primera fundación implementa renderizado, activación y selección. Plan 2 debe completar select-all, sort, acciones, refetching y layout móvil antes de migrar fotos.

La fila no será un gran botón que contenga otros botones. Cuando haya acciones o controles dentro de celdas, solo las celdas explícitamente activables dispararán navegación; la selección usa checkbox nativo con nombre accesible. En móvil, `stacked` conserva encabezados mediante labels visibles/`aria` y `scroll` mantiene la tabla.

## Consecuencias

- Se elimina la serialización duplicada de `rows[].cells` más children con slot.
- Las celdas aceptan cualquier `ReactNode` con tipado del row.
- La selección sigue siendo controlada y estable durante filtrado/refetch.
- La accesibilidad de nested interactive content se valida antes de declarar P0 completo.
