# ADR 002: root barrel y subpaths explícitos

- Estado: aceptado
- Fecha: 2026-08-23

## Contexto

Los consumidores actuales importan un barrel React y ejecutan registro. El paquete nuevo debe permitir imports sencillos, tree shaking y un CSS único, y debe detectar exports rotos antes de publicar.

## Decisión

La API tiene un único barrel raíz y subpaths explícitos. La primera entrega publicable expone:

```text
@ming/components
@ming/components/styles.css
@ming/components/button
@ming/components/input
@ming/components/app-shell
@ming/components/resource-table
```

Cada componente que se implemente en Plan 2 añadirá un subpath explícito con el mismo nombre en kebab-case. No habrá comodín `./*`, `/react` ni `/register`. Los nombres internos de archivo siguen snake_case; el mapeo del package convierte `app-shell` a `dist/app_shell.*`.

El CSS no se importa desde los entrypoints JavaScript. Cada aplicación hará exactamente un import de `@ming/components/styles.css` en su entrada.

`bun run package:check` construye, ejecuta publint, empaqueta con `bun pm pack`, extrae el archivo y carga todos los exports JavaScript desde el paquete empaquetado. Después instala ese tarball en un fixture Vite limpio y valida tipos, CSS, tree shaking, build de producción, portales y dark mode en navegador. Así se verifica el artefacto que se publicaría, no solo `src/`.

## Consecuencias

- Añadir un componente exige coordinar fuente, barrel, entrada Vite, `exports`, ejemplo y prueba.
- Los subpaths aún no implementados no se anuncian en `package.json`; el inventario documenta su nombre reservado para Plan 2.
- `sideEffects: ["**/*.css"]` conserva únicamente los estilos como side effects declarados.
