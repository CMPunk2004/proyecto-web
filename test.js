// Archivo de tests unitarios simples para las funciones de validación en app.js
// Ejecuta este archivo en el navegador o Node.js para ver resultados en consola

// Función auxiliar para simular assert
function assert(condition, message) {
    if (condition) {
        console.log("✓ PASÓ: " + message);
    } else {
        console.log("✗ FALLÓ: " + message);
    }
}

// Tests para sanitizarInput
console.log("=== Tests para sanitizarInput ===");
assert(sanitizarInput("Hola <script>") === "Hola script", "Remueve < y >");
assert(sanitizarInput("Normal") === "Normal", "Deja texto normal intacto");
assert(sanitizarInput("<>") === "", "Maneja solo caracteres peligrosos");

// Tests para esEmailValido
console.log("=== Tests para esEmailValido ===");
assert(esEmailValido("usuario@dominio.com") === true, "Email válido básico");
assert(esEmailValido("usuario@dominio") === false, "Email sin dominio falla");
assert(esEmailValido("usuario") === false, "Sin @ falla");
assert(esEmailValido("") === false, "Email vacío falla");

// Tests para esPasswordSegura
console.log("=== Tests para esPasswordSegura ===");
assert(esPasswordSegura("Password1") === true, "Contraseña válida (8+ chars, letra y número)");
assert(esPasswordSegura("pass") === false, "Contraseña corta falla");
assert(esPasswordSegura("password") === false, "Sin número falla");
assert(esPasswordSegura("12345678") === false, "Sin letra falla");
assert(esPasswordSegura("") === false, "Contraseña vacía falla");

// Tests para validarFormulario y comportamiento del formulario
function setFormValues(nombre, correo, direccion, password) {
    nombreInput.value = nombre;
    correoInput.value = correo;
    direccionInput.value = direccion;
    passwordInput.value = password;
}

console.log("=== Tests para validarFormulario ===");
setFormValues("", "usuario@dominio.com", "Calle 1", "Pass1234");
assert(validarFormulario() === "El nombre es obligatorio.", "Nombre vacío debe fallar");
setFormValues("Ana Pérez", "", "Calle 1", "Pass1234");
assert(validarFormulario() === "El correo es obligatorio.", "Correo vacío debe fallar");
setFormValues("Ana Pérez", "correo-invalido", "Calle 1", "Pass1234");
assert(validarFormulario() === "El correo debe tener un formato válido (ej. usuario@dominio.com).", "Correo con formato inválido debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "", "Pass1234");
assert(validarFormulario() === "La dirección es obligatoria.", "Dirección vacía debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "");
assert(validarFormulario() === "La contraseña es obligatoria.", "Contraseña vacía debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "pass");
assert(validarFormulario() === "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.", "Contraseña corta debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "abcdefgh");
assert(validarFormulario() === "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.", "Contraseña sin número debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "12345678");
assert(validarFormulario() === "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.", "Contraseña sin letra debe fallar");
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "Pass1234");
assert(validarFormulario() === null, "Formulario válido debe retornar null");

console.log("=== Tests para userManager y registro de usuario ===");
userManager.users = [];
setFormValues("Ana Pérez", "usuario@dominio.com", "Calle 1", "Pass1234");
const primerUsuario = User.fromForm();
assert(userManager.add(primerUsuario) === true, "Agregar usuario válido debe retornar true");
assert(userManager.findByEmail("usuario@dominio.com") !== undefined, "findByEmail debe encontrar el usuario agregado");
const usuarioDuplicado = User.fromForm();
assert(userManager.add(usuarioDuplicado) === false, "Agregar correo duplicado debe retornar false");

// Nota: Para ejecutar en navegador, incluye este script en HTML.
// Para Node.js, necesitarías exportar las funciones de app.js.
// Estos tests son básicos; para producción, usa Jest o similar.