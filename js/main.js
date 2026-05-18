// ============================================================
// main.js - Evaluación Sumativa 2
// Desarrollado con apoyo de IA (Claude de Anthropic)
// ============================================================

// -------------------------------------------------------
// VARIABLES Y SINTAXIS (let / const)
// -------------------------------------------------------

const COLORES = [
  { nombre: "Rojo Carmesí",    hex: "#DC143C", categoria: "cálido" },
  { nombre: "Azul Océano",     hex: "#1E90FF", categoria: "frío"   },
  { nombre: "Verde Esmeralda", hex: "#50C878", categoria: "frío"   },
  { nombre: "Naranja Solar",   hex: "#FF8C00", categoria: "cálido" },
  { nombre: "Violeta Místico", hex: "#8A2BE2", categoria: "frío"   },
  { nombre: "Rosa Neon",       hex: "#FF69B4", categoria: "cálido" },
  { nombre: "Turquesa",        hex: "#40E0D0", categoria: "frío"   },
  { nombre: "Dorado",          hex: "#FFD700", categoria: "cálido" },
  { nombre: "Lima",            hex: "#32CD32", categoria: "frío"   },
  { nombre: "Coral",           hex: "#FF6B6B", categoria: "cálido" },
];

let favoritos = [];         // arreglo de colores favoritos
let colorActual = null;     // objeto con el color activo
let contadorCambios = 0;    // contador de clics

// -------------------------------------------------------
// FUNCIONES PROPIAS
// -------------------------------------------------------

// Obtiene un color aleatorio del arreglo COLORES
function obtenerColorAleatorio() {
  const indice = Math.floor(Math.random() * COLORES.length);
  return COLORES[indice];
}

// Calcula si el texto debe ser blanco o negro según el fondo
function obtenerColorTexto(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;
  return luminosidad > 128 ? "#222222" : "#ffffff";
}

// Agrega o elimina un color de favoritos
function toggleFavorito(color) {
  const existe = favoritos.findIndex(f => f.hex === color.hex);
  if (existe === -1) {
    favoritos.push(color);
  } else {
    favoritos.splice(existe, 1);
  }
  renderizarFavoritos();
  actualizarBotonFavorito();
}

// Verifica si el color actual ya está en favoritos
function esFavorito(color) {
  if (!color) return false;
  return favoritos.some(f => f.hex === color.hex);
}

// Aplica el color al fondo de la página
function aplicarColor(color) {
  document.body.style.backgroundColor = color.hex;
  document.body.style.color = obtenerColorTexto(color.hex);
  colorActual = color;
  contadorCambios++;
  actualizarContador();
  actualizarInfoColor(color);
  actualizarBotonFavorito();
}

// Actualiza el número del contador en el DOM
function actualizarContador() {
  const spanContador = document.querySelector("#contador");
  if (spanContador) {
    spanContador.textContent = contadorCambios;
  }
}

// -------------------------------------------------------
// ARROW FUNCTIONS
// -------------------------------------------------------

// Muestra información del color activo en la sección info
const actualizarInfoColor = (color) => {
  const infoDiv = document.querySelector("#info-color");
  if (!infoDiv) return;
  infoDiv.innerHTML = `
    <span class="badge-nombre">${color.nombre}</span>
    <span class="badge-hex">${color.hex}</span>
    <span class="badge-cat">${color.categoria}</span>
  `;
};

// Actualiza el texto del botón favorito según estado
const actualizarBotonFavorito = () => {
  const btn = document.querySelector("#btn-favorito");
  if (!btn) return;
  if (esFavorito(colorActual)) {
    btn.textContent = "★ Quitar de favoritos";
    btn.classList.add("activo");
  } else {
    btn.textContent = "☆ Agregar a favoritos";
    btn.classList.remove("activo");
  }
};

// Renderiza la lista de colores en el catálogo dinámico
const renderizarCatalogo = (lista) => {
  const contenedor = document.querySelector("#catalogo-colores");
  if (!contenedor) return;

  if (lista.length === 0) {
    contenedor.innerHTML = "<p class='sin-resultados'>No se encontraron colores.</p>";
    return;
  }

  contenedor.innerHTML = "";
  lista.forEach(color => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-color");
    tarjeta.style.backgroundColor = color.hex;
    tarjeta.style.color = obtenerColorTexto(color.hex);
    tarjeta.innerHTML = `
      <strong>${color.nombre}</strong>
      <span>${color.hex}</span>
      <small>${color.categoria}</small>
    `;
    tarjeta.addEventListener("click", () => aplicarColor(color));
    contenedor.appendChild(tarjeta);
  });
};

// Renderiza la lista de favoritos en su sección
const renderizarFavoritos = () => {
  const contenedor = document.querySelector("#lista-favoritos");
  if (!contenedor) return;

  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p class='sin-resultados'>Aún no tienes favoritos.</p>";
    return;
  }

  contenedor.innerHTML = "";
  favoritos.forEach(color => {
    const item = document.createElement("div");
    item.classList.add("favorito-item");
    item.style.backgroundColor = color.hex;
    item.style.color = obtenerColorTexto(color.hex);
    item.innerHTML = `
      <span>${color.nombre}</span>
      <button class="btn-eliminar" data-hex="${color.hex}">✕</button>
    `;
    contenedor.appendChild(item);
  });

  // Botones de eliminar dentro de favoritos
  contenedor.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const hex = btn.dataset.hex;
      favoritos = favoritos.filter(f => f.hex !== hex);
      renderizarFavoritos();
      actualizarBotonFavorito();
    });
  });
};

// -------------------------------------------------------
// ESTRUCTURAS DE CONTROL (if / for / forEach / while)
// -------------------------------------------------------

// Filtra los colores según el texto de búsqueda
function filtrarColores(termino) {
  const terminoLower = termino.toLowerCase().trim();

  if (terminoLower === "") {
    renderizarCatalogo(COLORES);
    return;
  }

  // Uso de for clásico
  const resultados = [];
  for (let i = 0; i < COLORES.length; i++) {
    const color = COLORES[i];
    if (
      color.nombre.toLowerCase().includes(terminoLower) ||
      color.categoria.toLowerCase().includes(terminoLower) ||
      color.hex.toLowerCase().includes(terminoLower)
    ) {
      resultados.push(color);
    }
  }

  renderizarCatalogo(resultados);
}

// Muestra un mensaje de bienvenida animado letra a letra (con setInterval)
function animarBienvenida() {
  const el = document.querySelector("#bienvenida");
  if (!el) return;

  const texto = "¡Bienvenido al Generador de Colores!";
  let i = 0;
  el.textContent = "";

  const intervalo = setInterval(() => {
    if (i < texto.length) {
      el.textContent += texto[i];
      i++;
    } else {
      clearInterval(intervalo);
    }
  }, 40);
}

// Valida que todos los colores del arreglo tengan formato hex correcto
// Uso de ciclo WHILE
function validarColores() {
  const invalidos = [];
  let i = 0;
  while (i < COLORES.length) {
    const hex = COLORES[i].hex;
    const esValido = /^#[0-9A-Fa-f]{6}$/.test(hex);
    if (!esValido) {
      invalidos.push(COLORES[i].nombre);
    }
    i++;
  }
  if (invalidos.length > 0) {
    console.warn("Colores con formato inválido:", invalidos);
  } else {
    console.log("✓ Todos los colores tienen formato hex válido.");
  }
}

// -------------------------------------------------------
// INICIALIZACIÓN Y EVENT LISTENERS
// -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // Render inicial del catálogo
  renderizarCatalogo(COLORES);
  renderizarFavoritos();
  animarBienvenida();
  validarColores(); // ciclo while - valida formato hex de todos los colores

  // Botón principal - cambiar color aleatorio
  const btnCambiar = document.querySelector("#miBoton");
  if (btnCambiar) {
    btnCambiar.addEventListener("click", () => {
      const color = obtenerColorAleatorio();
      aplicarColor(color);
    });
  }

  // Botón reiniciar
  const btnReiniciar = document.querySelector("#btnReiniciar");
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      colorActual = null;
      contadorCambios = 0;
      actualizarContador();
      const infoDiv = document.querySelector("#info-color");
      if (infoDiv) infoDiv.innerHTML = "<span class='sin-resultados'>Haz clic en un color para ver su info.</span>";
      actualizarBotonFavorito();
    });
  }

  // Botón agregar/quitar favorito
  const btnFavorito = document.querySelector("#btn-favorito");
  if (btnFavorito) {
    btnFavorito.addEventListener("click", () => {
      if (!colorActual) return;
      toggleFavorito(colorActual);
    });
  }

  // Búsqueda dinámica
  const inputBusqueda = document.querySelector("#buscador");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", (e) => {
      filtrarColores(e.target.value);
    });
  }

  // Filtro por categoría
  const selectCategoria = document.querySelector("#filtro-categoria");
  if (selectCategoria) {
    selectCategoria.addEventListener("change", (e) => {
      const categoria = e.target.value;
      if (categoria === "todos") {
        renderizarCatalogo(COLORES);
      } else {
        const filtrados = COLORES.filter(c => c.categoria === categoria);
        renderizarCatalogo(filtrados);
      }
    });
  }

});
