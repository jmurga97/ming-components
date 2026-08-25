# ADR 003: tema mediante variables semánticas

- Estado: aceptado
- Fecha: 2026-08-23

## Contexto

Los dos consumidores redefinen 23 tokens `--color-mc-*`, `--text-mc-*` y `--ease-mc-*`. qmenut activa tema con `data-mc-theme`; roncalphoto combina ese atributo con media queries que pueden sobrescribir una selección explícita. La migración debe eliminar esa dependencia sin flash de tema.

## Decisión

La librería publica tokens semánticos shadcn-style en `styles.css`. `.dark` y `.light` siempre ganan. `prefers-color-scheme` solo se aplica a `:root:not(.light):not(.dark)`.

La aplicación controla almacenamiento y política de tema. Antes de cargar CSS/React debe ejecutar:

```html
<script>
  (() => {
    const key = 'app-theme';
    let stored = null;
    try {
      stored = localStorage.getItem(key);
    } catch {}
    const theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  })();
</script>
```

Durante la migración, cada consumidor mapeará sus tokens legacy a los tokens nuevos en su propio CSS. Esa capa es temporal y se borra cuando no quede ninguna referencia `mc-*`.

## Consecuencias

- La librería no lee `localStorage` ni decide el tema del producto.
- No se usa `data-mc-theme` en la API nueva.
- Los productos conservan sus fuentes: `--font-sans` hereda por defecto.
- Los modos explícitos son deterministas y no quedan anulados por una media query posterior.
