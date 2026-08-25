# ADR 001: librería React-only

- Estado: aceptado
- Fecha: 2026-08-23

## Contexto

`@murga.ing/components` mezcla Lit, custom elements, registro global y wrappers React. qmenut y roncalphoto son aplicaciones React 19. La capa intermedia obliga a traducir propiedades a atributos, escuchar `CustomEvent`, mantener `slot` strings y ejecutar `registerMurgaComponents()` antes del render. Ambos consumidores incluyen Lit solo por esta integración.

## Decisión

`@ming/components` soporta exclusivamente React 19. Los componentes exponen props, `children`, render props, refs y callbacks React. No se publican custom elements, `/react`, `/register`, funciones `define*` ni registro global.

Base UI 1.7 es la capa de primitives sin estilo. Se usará cuando aporte semántica, foco, teclado o overlays: Field, Select, Checkbox, Dialog/AlertDialog, Menu, Popover, Tabs y Toast. `Button` e `Input` ya delegan en las primitives oficiales. Para composición, la convención es `render`, propagando ref y props hasta el nodo DOM.

## Consecuencias

- qmenut y roncalphoto podrán eliminar `lit`, los imports de `/react` y `/register`, y la llamada de registro después de completar la migración.
- No hay `CustomEvent`; los callbacks reciben el dato útil directamente.
- La librería no pretende servir a aplicaciones no React.
- Los consumidores importan el CSS una vez; importar JavaScript no activa inicialización global.

## Fuentes de implementación

- Base UI Button: `@base-ui/react/button`, con `focusableWhenDisabled` para estados de carga que no deben perder foco.
- Base UI Input: `@base-ui/react/input`, con `onValueChange(value, eventDetails)`.
- Base UI Composition: `render` sustituye la emulación de slots/asChild y exige propagar ref y props.
