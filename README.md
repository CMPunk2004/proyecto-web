# Proyecto Web

Este es un formulario de registro simple con validaciones básicas.

## Mejoras de Seguridad

### Content Security Policy (CSP)

Para reducir riesgos de XSS, añade esta meta tag en el `<head>` de `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

Esto limita los scripts y estilos a recursos del mismo origen. Ajusta según tus necesidades (ej. permite CDN externos si usas librerías).

### Atributos de Seguridad en Inputs

- `maxlength`: Limita la longitud máxima para prevenir inputs excesivos.
- `minlength`: Para contraseñas, asegura longitud mínima.
- `autocomplete`: Mejora UX y seguridad (ej. "new-password" para contraseñas).
- `pattern`: Validaciones nativas del navegador para formato (ej. solo letras en nombre, regex en contraseña).

### Tests Unitarios

Ejecuta `test.js` en el navegador (inclúyelo en `index.html`) o en Node.js para probar las funciones de validación. Incluye tests para `sanitizarInput`, `esEmailValido` y `esPasswordSegura`.

Recuerda validar todo en el servidor para seguridad real.