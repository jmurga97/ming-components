# ADR 006: React Compiler en el build publicado

- Estado: aceptado
- Fecha: 2026-08-25

## Contexto

`@ming/components` publica componentes React 19 consumidos por aplicaciones operativas. La memoización manual no está generalizada en la librería y cada aplicación consumidora tendría que adoptar el compilador por su cuenta para beneficiarse.

## Decisión

La librería compila con React Compiler al construir el artefacto publicado:

- `oxc-transform-react` como peer opcional de `@vitejs/plugin-react`, activado con `react({ compiler: { target: '19' } })` en el build de la librería, el playground y Vitest.
- Sin Babel: se usa la ruta OXC nativa del plugin.
- `eslint-plugin-react-hooks` en el preset `recommended-latest`, que incluye las reglas de diagnóstico del compilador (`purity`, `immutability`, `refs`, `set-state-in-render`, etc.). Las violaciones se corrigen; no se suprimen.

Las aplicaciones consumidoras reciben salida ya memoizada sin configurar nada. Quien prefiera compilar por su cuenta puede desactivarlo en su propio pipeline; los exports públicos no cambian.

## Consecuencias

- El artefacto crece ligeramente por el código de memoización y el chunk compartido `react/compiler-runtime`.
- El tree shaking se conserva: `scripts/check_package.ts` verifica que el fixture no incluya `ResourceTable` al importar solo el barrel.
- Los requisitos de las Rules of React pasan a ser errores de build/lint, no convenciones.
