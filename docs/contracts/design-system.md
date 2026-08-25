# Quiet Operations

## Dirección

Quiet Operations es una interfaz administrativa sobria para registros, formularios y media. El contenido y el estado dominan; la decoración no compite. Zinc neutral, contraste alto, densidad moderada, radios de 6–8 px y un rail lateral de 2 px identifican selección o sección activa.

## Tokens públicos

| Token                                       | Responsabilidad                     |
| ------------------------------------------- | ----------------------------------- |
| `--background`, `--foreground`              | lienzo y texto general              |
| `--card`, `--card-foreground`               | superficies persistentes            |
| `--popover`, `--popover-foreground`         | overlays elevados                   |
| `--primary`, `--primary-foreground`         | acción principal y selección fuerte |
| `--secondary`, `--secondary-foreground`     | acción/superficie secundaria        |
| `--muted`, `--muted-foreground`             | información auxiliar                |
| `--accent`, `--accent-foreground`           | hover/selección suave               |
| `--destructive`, `--destructive-foreground` | acción o estado destructivo         |
| `--border`                                  | separación estructural              |
| `--input`                                   | borde de control                    |
| `--ring`                                    | foco visible                        |
| `--radius`                                  | radio base, `0.4375rem`             |

Tokens internos de escala: `--ming-space-1` a `--ming-space-6`, `--ming-duration-fast`, `--ming-duration-normal`, `--ming-ease`. La aplicación puede definir `--font-sans`; por defecto hereda.

## Reglas visuales

- Base neutral zinc; los estados semánticos pueden usar color, pero nunca como único indicador.
- Radio de control 7 px; cards hasta 8 px. Pills solo para badges, filtros o segmentos que lo requieran.
- Sin sombra en cards y tablas persistentes. Sombra solo en popovers, dialogs, drawers y navegación móvil elevada.
- Focus ring de 3 px con offset de 2 px. No se sustituye por un simple cambio de borde.
- Targets táctiles de 44 px para acciones principales; los tamaños compactos mantienen área interactiva suficiente.
- Tablas alinean números al final y mantienen encabezados comprensibles en móvil.
- Selección/foco de sección usa rail `inset 2px 0 0 var(--primary)`.
- Tipografía heredada. Labels/status pueden usar la mono del producto si este la define; la librería no descarga fuentes.

## Movimiento

Duraciones de 120–180 ms, exclusivamente para continuidad funcional: abrir navegación/overlay, cambio de selección, entrada/salida de toast y feedback de interacción. No animar métricas, tablas al cargar, fondos o elementos decorativos. Bajo `prefers-reduced-motion: reduce`, las transiciones bajan a `0.01ms` y no se usan desplazamientos no esenciales.

## Temas

- `.dark` fuerza dark.
- `.light` fuerza light.
- Sin clase explícita, `prefers-color-scheme` decide.
- El snippet de `docs/adr/theming.md` se ejecuta en `<head>` para evitar flash.
- Los consumidores importan `@ming/components/styles.css` una sola vez.

## Mapeo temporal de tokens legacy

| Legacy                                                  | Nuevo                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| `--color-mc-background`                                 | `--background`                                                           |
| `--color-mc-surface`                                    | `--card`                                                                 |
| `--color-mc-surface-raised`                             | `--secondary` o `--popover` según elevación                              |
| `--color-mc-border`, `--color-mc-border-visible`        | `--border`, `--input`                                                    |
| `--color-mc-text-display`, `--color-mc-text-primary`    | `--foreground`                                                           |
| `--color-mc-text-secondary`, `--color-mc-text-tertiary` | `--muted-foreground`                                                     |
| `--color-mc-interactive`                                | `--ring`                                                                 |
| `--color-mc-accent`                                     | `--primary` o `--destructive` según uso; revisar, no reemplazar a ciegas |
| `--color-mc-success`, `warning`, `error`                | tokens de estado internos; error usa `--destructive`                     |
| `--ease-mc-default`                                     | `--ming-ease`                                                            |

Las utility classes Tailwind `bg-mc-*`, `text-mc-*`, `border-mc-*` de roncalphoto también requieren migración; no quedan resueltas por cambiar imports.
