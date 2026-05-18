# Proyecto Web - Evaluación Sumativa 2
**Desarrollo Interactivo con JavaScript e Integración de IA**
INACAP · Desarrollo de Aplicaciones Web

---

## Descripción del Proyecto

Este proyecto extiende el sitio web desarrollado en la Evaluación Sumativa 1 (Generador de Colores), incorporando funcionalidades dinámicas mediante JavaScript puro. Se agregaron tres funcionalidades principales: sistema de favoritos, búsqueda/filtro dinámico y render dinámico del catálogo de colores con JavaScript.

---

## Estructura de Carpetas

```
proyecto-web/
├── index.html          ← HTML principal (actualizado con nuevas secciones)
├── styles.css          ← Estilos originales (Sumativa 1)
├── styles2.css         ← Estilos nuevos para las secciones de la Sumativa 2
├── script.js           ← Script original (Sumativa 1, se mantiene)
├── js/
│   └── main.js         ← JavaScript principal de la Sumativa 2
├── app.js              ← Archivo auxiliar (Sumativa 1)
├── test.js             ← Tests unitarios (Sumativa 1)
└── README.md           ← Este archivo
```

---

## Funcionalidades Implementadas

### 1. Sistema de Favoritos
- El usuario puede agregar o quitar colores de su lista de favoritos con el botón "★ Agregar a favoritos".
- Los favoritos se muestran dinámicamente en la sección inferior.
- Cada favorito tiene un botón ✕ para eliminarlo individualmente.

### 2. Búsqueda / Filtro Dinámico
- Input de búsqueda en tiempo real que filtra por nombre, código hex o categoría.
- Selector desplegable para filtrar por categoría (cálido / frío / todos).
- Si no hay resultados, se muestra un mensaje informativo.

### 3. Render Dinámico con JavaScript
- El catálogo de 10 colores se genera completamente con JavaScript (`createElement`, `appendChild`).
- Al hacer clic en una tarjeta, el color se aplica al fondo de la página.
- La información del color activo (nombre, hex, categoría) se actualiza dinámicamente.

---

## Requisitos Técnicos Cubiertos

| Requisito | Implementación |
|-----------|----------------|
| `let` y `const` | `let favoritos`, `let colorActual`, `const COLORES`, etc. |
| `if` | Verificación de favoritos, luminosidad de texto, elementos del DOM |
| Ciclos `for` | Búsqueda en el arreglo `COLORES` con `for` clásico |
| `forEach` | Renderizado de tarjetas y botones de eliminar |
| `while` | Función `validarColores()` recorre el arreglo `COLORES` verificando formato hex |
| Arreglo | `const COLORES = [...]` con 10 objetos de color |
| Objeto | Cada color es un objeto `{ nombre, hex, categoria }` |
| Funciones propias | `obtenerColorAleatorio()`, `aplicarColor()`, `toggleFavorito()`, etc. |
| Arrow functions | `actualizarInfoColor`, `renderizarCatalogo`, `renderizarFavoritos`, `actualizarBotonFavorito` |
| `querySelector` | Usado extensamente para seleccionar elementos del DOM |
| `addEventListener` | Botones, input de búsqueda, selector de categoría, tarjetas del catálogo |
| Modificación dinámica HTML | `innerHTML`, `textContent`, `createElement`, `appendChild`, `style` |

---

## Prompts Utilizados con IA (Claude de Anthropic)

### Prompt 1 — Estructura general del main.js
> "Necesito crear un archivo main.js para un generador de colores en HTML. Debe incluir: let y const, estructuras if y ciclos for/forEach/while, un arreglo de objetos con colores, funciones propias y arrow functions, uso de querySelector, addEventListener y modificación dinámica del DOM. Las funcionalidades son: sistema de favoritos, búsqueda dinámica y render dinámico del catálogo."

**Resultado:** Estructura base del archivo `js/main.js` con todas las secciones comentadas.

### Prompt 2 — Sistema de favoritos
> "¿Cómo implemento una función toggleFavorito que agregue o quite un color de un arreglo y actualice el DOM dinámicamente sin recargar la página?"

**Resultado:** Función `toggleFavorito()` con `findIndex` y `splice`, más la función `renderizarFavoritos()`.

### Prompt 3 — Búsqueda dinámica
> "¿Cómo filtro en tiempo real un arreglo de objetos en JavaScript usando el evento input de un campo de texto?"

**Resultado:** Función `filtrarColores()` con ciclo `for` clásico y el `addEventListener('input', ...)`.

### Prompt 4 — Render dinámico con createElement
> "¿Cuál es la mejor forma de renderizar tarjetas dinámicamente en JavaScript puro usando createElement y appendChild?"

**Resultado:** Función `renderizarCatalogo()` con `forEach`, `createElement` y estilos inline dinámicos.

---

## Validación y Correcciones Realizadas

### Validaciones aplicadas:
- **Texto legible:** Se implementó la función `obtenerColorTexto(hex)` que calcula la luminosidad del color y devuelve blanco o negro para que el texto siempre sea legible. Esto corrigió el problema de texto invisible sobre fondos oscuros.
- **Comprobación de null:** Se agregaron verificaciones `if (!elemento) return;` en todas las funciones que acceden al DOM, para evitar errores si el HTML no tiene algún elemento.
- **Botón favorito sin color activo:** Se validó que si `colorActual === null`, el botón de favoritos no ejecuta ninguna acción (`if (!colorActual) return;`).
- **Doble listeners:** Se verificó que los event listeners del catálogo se agregan en el momento del render, evitando acumulación de eventos duplicados.

### Correcciones realizadas:
- Se detectó que mantener `script.js` original junto a `main.js` causaba conflicto de listeners duplicados en `#miBoton` y `#btnReiniciar`. Se eliminó la carga de `script.js` del nuevo `index.html` ya que `main.js` reemplaza su funcionalidad completamente.
- Se detectó que el `while` en `animarBienvenida` no era un `while` real sino un `setInterval` con `if`. Se creó la función `validarColores()` que usa un ciclo `while` real para recorrer el arreglo y verificar que todos los colores tengan formato hex válido (`#RRGGBB`).
- Se detectó que `favoritos.filter()` no mutaba el arreglo original, por lo que se cambió la lógica de eliminación a reasignación: `favoritos = favoritos.filter(...)`.
- Se separó `styles2.css` para no alterar los estilos originales de la Sumativa 1 y mantener integración coherente con el proyecto anterior.

---

## Git y GitHub

El proyecto continúa en el mismo repositorio de la Sumativa 1, con commits progresivos:

- `Initial commit` — proyecto base Sumativa 1
- `Add form app logic, UI scripts, styles` — mejoras Sumativa 1
- `Update index.html` — actualización HTML
- *(nuevos commits)* `Add js/main.js Sumativa 2`, `Add styles2.css`, `Update index.html with new sections`, `Update README Sumativa 2`

---

## Uso de Inteligencia Artificial

La IA (Claude de Anthropic) fue utilizada como apoyo para:
- Estructurar el código de `main.js` cumpliendo todos los requisitos de la rúbrica.
- Resolver dudas puntuales sobre `forEach`, `splice`, `findIndex` y manipulación del DOM.
- Generar los estilos CSS para las nuevas secciones.
- Revisar y validar la lógica del código antes de integrarlo.

Todo el código fue revisado, comprendido y probado por el estudiante antes de ser incluido en el proyecto.
