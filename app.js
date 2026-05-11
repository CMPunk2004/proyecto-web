
// Constantes para los IDs de los elementos del formulario
const FORM_ID = "registroForm";
const NOMBRE_ID = "nombre";
const CORREO_ID = "correo";
const DIRECCION_ID = "direccion";
const PASSWORD_ID = "password";
const MENSAJE_ID = "mensaje";

// Referencias a los elementos del DOM (para evitar llamadas repetidas)
const form = document.getElementById(FORM_ID);
const nombreInput = document.getElementById(NOMBRE_ID);
const correoInput = document.getElementById(CORREO_ID);
const direccionInput = document.getElementById(DIRECCION_ID);
const passwordInput = document.getElementById(PASSWORD_ID);
const mensajeElement = document.getElementById(MENSAJE_ID);

// Gestor de usuarios: usa un objeto con un array para almacenar usuarios y métodos para gestionarlos
const userManager = {
    users: [], // Array de instancias de User

    add(user) {
        // Verificar si el correo ya existe para evitar duplicados
        if (this.findByEmail(user.correo)) {
            return false; // Usuario ya registrado
        }
        this.users.push(user);
        // Persistencia básica en localStorage (opcional, para simular almacenamiento)
        this.saveToStorage();
        return true;
    },

    findByEmail(email) {
        return this.users.find(u => u.correo === email);
    },

    getAll() {
        return this.users;
    },

    saveToStorage() {
        // Guardar en localStorage como JSON (solo datos transportables, sin password)
        const data = this.users.map(u => u.toTransport());
        localStorage.setItem('usuarios', JSON.stringify(data));
    },

    loadFromStorage() {
        // Cargar desde localStorage al iniciar
        const data = localStorage.getItem('usuarios');
        if (data) {
            const parsed = JSON.parse(data);
            this.users = parsed.map(d => new User(d.nombre, d.correo, d.direccion, '', d.fechaRegistro, d.activo));
        }
    }
};

// Cargar usuarios al iniciar la página
userManager.loadFromStorage();

// Función para sanitizar inputs básicos (escapa caracteres peligrosos)
function sanitizarInput(input) {
    return input.replace(/[<>]/g, ''); // Remueve < y > para prevenir XSS básico
}

// Función para validar formato básico de email
function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar contraseña (mínimo 8 caracteres, al menos una letra y un número)
function esPasswordSegura(password) {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
}

// Función para validar todos los campos
function validarFormulario() {
    const nombre = sanitizarInput(nombreInput.value.trim());
    const correo = sanitizarInput(correoInput.value.trim());
    const direccion = sanitizarInput(direccionInput.value.trim());
    const password = passwordInput.value.trim(); // No sanitizar contraseña para preservar caracteres especiales

    if (nombre === "") {
        return "El nombre es obligatorio.";
    }
    if (correo === "") {
        return "El correo es obligatorio.";
    }
    if (!esEmailValido(correo)) {
        return "El correo debe tener un formato válido (ej. usuario@dominio.com).";
    }
    if (direccion === "") {
        return "La dirección es obligatoria.";
    }
    if (password === "") {
        return "La contraseña es obligatoria.";
    }
    if (!esPasswordSegura(password)) {
        return "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.";
    }
    return null; // Sin errores
}

// Función para mostrar un mensaje seguro (usa textContent)
function mostrarMensaje(texto) {
    mensajeElement.textContent = texto;
}

class User {
    constructor(nombre, correo, direccion, password, fechaRegistro = new Date().toISOString(), activo = true) {
        this.nombre = nombre;
        this.correo = correo;
        this.direccion = direccion;
        this.password = password;
        this.fechaRegistro = fechaRegistro;
        this.activo = activo;
    }

    static fromForm() {
        return new User(
            sanitizarInput(nombreInput.value.trim()),
            sanitizarInput(correoInput.value.trim()),
            sanitizarInput(direccionInput.value.trim()),
            passwordInput.value.trim()
        );
    }

    esValido() {
        return this.nombre.trim() !== "" &&
               this.correo.trim() !== "" &&
               this.direccion.trim() !== "" &&
               this.password.length >= 8;
    }

    toTransport() {
        return {
            nombre: this.nombre,
            correo: this.correo,
            direccion: this.direccion,
            fechaRegistro: this.fechaRegistro,
            activo: this.activo
        };
    }
}

// Event listener para el envío del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const error = validarFormulario();
    if (error) {
        mostrarMensaje(error);
        return;
    }

    // Crear el objeto usuario con los datos validados
    const usuario = User.fromForm();

    // Intentar agregar el usuario al gestor
    if (!userManager.add(usuario)) {
        mostrarMensaje("El correo ya está registrado.");
        return;
    }

    // Validar el objeto (opcional, redundante con validarFormulario pero útil)
    if (!usuario.esValido()) {
        mostrarMensaje("Datos inválidos.");
        return;
    }

    mostrarMensaje("Usuario registrado correctamente.");
    console.log("Usuarios registrados:", userManager.getAll().map(u => u.toTransport())); // Para depuración

    // En producción: envía datos al servidor con fetch()
    // fetch('/api/registro', { method: 'POST', body: JSON.stringify(usuario.toTransport()) });
});
