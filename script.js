const botonColor = document.getElementById('miBoton');
const btnReiniciar = document.getElementById('btnReiniciar');
const textoContador = document.getElementById('contador');

// 1. Intentamos cargar el número guardado. Si no hay nada, empezamos en 0.
let cuenta = localStorage.getItem('conteoGuardado') ? parseInt(localStorage.getItem('conteoGuardado')) : 0;
textoContador.innerText = cuenta;

botonColor.addEventListener('click', function() {
    const colorAzar = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = colorAzar;

    cuenta = cuenta + 1;
    textoContador.innerText = cuenta;
    
    // 2. Guardamos el nuevo número en la memoria del navegador
    localStorage.setItem('conteoGuardado', cuenta);
});

btnReiniciar.addEventListener('click', function() {
    cuenta = 0;
    textoContador.innerText = cuenta;
    document.body.style.backgroundColor = 'white';
    
    // 3. Borramos el dato guardado
    localStorage.removeItem('conteoGuardado');
});
