# ADR 004: controles y adaptadores de formulario

- Estado: aceptado
- Fecha: 2026-08-23

## Contexto

qmenut usa adaptadores locales basados mayoritariamente en controles nativos y `register`. roncalphoto usa wrappers `McInput`, `McTextarea`, `McSelect` y `McTagPicker` con `useController`. Los componentes actuales emiten `CustomEvent.detail`.

## Decisión

La librería publica controles no acoplados a React Hook Form: `Field`, `Input`, `Textarea`, `Select`, `Checkbox` y `TagPicker`. Los valores controlados y callbacks son idiomáticos:

```tsx
<Input value={value} onValueChange={setValue} />
<Select value={value} onValueChange={setValue} />
<Checkbox checked={checked} onCheckedChange={setChecked} />
<TagPicker value={ids} onValueChange={setIds} />
```

`Field` se implementará con Base UI Field y será responsable de label, hint, optional/required, error, `aria-describedby` y estado inválido. Los adaptadores para React Hook Form permanecen en cada aplicación porque contienen `FieldPath`, validación y política de datos del consumidor.

Roncalphoto migrará sus adaptadores sustituyendo `event.detail` por el valor directo. qmenut puede mantener `register` para inputs nativos o pasar a `Controller` solo donde el control sea compuesto. La librería no depende de React Hook Form ni Zod.

## Consecuencias

- Una misma API sirve a formularios controlados, no controlados y a distintas librerías de formularios.
- Los errores y labels tienen una sola semántica accesible.
- No se conservan aliases `onMcChange`.
- Los callbacks de Base UI pueden aportar detalles del evento como segundo argumento, pero el primer argumento siempre es el valor útil.
