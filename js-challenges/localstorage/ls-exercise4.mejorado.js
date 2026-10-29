/*
Build a simple expense saver
Create a form with an expense description and an amount.
Requirements:
    • Save each expense as an object, for example {description: "Lunch", amount: 250}.
    • Store all expenses in an array in localStorage.
    • Display all saved expenses.
    • Calculate and display their total.
    • Allow the user to delete an expense.
Example: Add lunch for 250 and transport for 100. The displayed total should be 350, even after a refresh.
*/

/*
MEJORAS respecto a la versión anterior (cada una está explicada otra vez donde se aplica en el código):
    1. Validación del monto: ahora se rechaza el 0, los vacíos y los valores que no son números.
    2. El mensaje "No hay gastos" ya no destruye el HTML (antes borraba el área de gastos y el total en el primer uso).
    3. Lo que escribe el usuario se muestra con textContent (nunca se interpreta como HTML).
    4. Se reemplazó alert() por un mensaje de error en la página y el formulario ya no se borra cuando hay un error.
    5. La descripción se guarda sin espacios sobrantes (trim).
    6. El total se calcula con reduce() y se muestra con 2 decimales.
    7. Se arreglaron detalles: id con comillas, variables sin uso, eliminar con filter() y protección contra datos dañados.
*/


// Obtiene del DOM todos los elementos que se van a utilizar
const saverFormulario = document.getElementById('saver-form');
const inputDescripcion = document.getElementById('descripcion'); // Input de texto donde se escribe en qué se gastó
const inputMonto = document.getElementById('monto'); // Input donde se escribe cuánto se gastó
const mensajeError = document.getElementById('mensaje-error'); // Aviso rojo que aparece cuando el usuario escribe algo inválido
const areaDeMostrarGastos = document.getElementById('area-muestra-gastos'); // Área donde se pintan los gastos guardados (o el mensaje de que no hay)
const totalDeGastos = document.getElementById('total-gastos'); // Elemento donde se muestra la suma de todos los gastos
const fragment = document.createDocumentFragment(); // Un fragment es un contenedor temporal donde se preparan varios elementos antes de colocarlos en el DOM de una sola vez
const localStorageKey = 'lista-de-gastos'; // Nombre con el que se guarda todo en el localStorage
let listaDeGastos = []; // Arreglo donde viven todos los gastos mientras la página no se refresque

// Muestra los gastos guardados anteriormente cuando carga la página
document.addEventListener('DOMContentLoaded',()=>{
    cargarGastos(); // Recupera lo que haya guardado en el localStorage
    mostrarGastos(); // Pinta los gastos y calcula el total
});

// Event listener del formulario
saverFormulario.addEventListener('submit',(e)=>{
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    agregarGastos();
});

// Event listener para los íconos de eliminar (delegación de eventos: un solo listener en el padre en vez de uno por cada gasto)
areaDeMostrarGastos.addEventListener('click',(e)=>{
    // Ignora cualquier clic que no haya sido sobre el ícono de eliminar
    if(!e.target.classList.contains('fa-circle-xmark'))return;
    eliminadorDeGastos(e);
});

// Cuando el usuario vuelve a escribir en cualquiera de los inputs, el mensaje de error ya no hace falta
saverFormulario.addEventListener('input',ocultarError);

// Recupera la lista de gastos guardada en el localStorage
function cargarGastos(){
    // try/catch: si alguien editó el localStorage a mano y el texto JSON quedó dañado,
    // JSON.parse lanzaría un error y toda la página dejaría de funcionar. Así se empieza con una lista vacía en vez de fallar.
    try{
        const guardado = localStorage.getItem(localStorageKey);
        // No existe nada guardado la primera vez que se usa la página
        if(guardado){
            const datos = JSON.parse(guardado); // Convierte el texto JSON de vuelta a un arreglo de JS
            // Se asegura de que lo guardado realmente sea un arreglo antes de usarlo
            if(Array.isArray(datos)){
                listaDeGastos = datos;
            }
        }
    } catch {
        listaDeGastos = [];
    }
}

// Guarda la lista de gastos en el localStorage
function guardarGastos(){
    // No se pueden guardar arreglos/objetos directamente en el localStorage, pero sí un texto JSON
    localStorage.setItem(localStorageKey,JSON.stringify(listaDeGastos));
}

// Crea un gasto nuevo y lo guarda
function agregarGastos(){
    const descripcion = inputDescripcion.value.trim(); // trim() quita los espacios del principio y del final, así no se guardan espacios sobrantes
    const monto = Number(inputMonto.value); // El valor de un input siempre es texto, por eso se convierte a número

    // Si la descripción está vacía (o solo tiene espacios), avisa y no crea el gasto
    if(descripcion === ''){
        mostrarError('Por favor escriba una descripción.');
        inputDescripcion.focus(); // Devuelve el cursor al input que hay que corregir
        return; // No se hace reset(): así el usuario no pierde lo que ya escribió bien
    }
    // El monto tiene que ser un número real mayor que cero
    // Number('') da 0 y un texto raro da NaN; en ambos casos esta condición falla y se rechaza el monto
    if(!(Number.isFinite(monto) && monto > 0)){
        mostrarError('El monto debe ser un número mayor que cero.');
        inputMonto.focus();
        return;
    }

    ocultarError(); // Todo está bien, se quita cualquier error anterior

    // Crea el objeto del gasto
    const gasto = {
        id: Date.now(), // Usa el momento exacto de creación como ID único
        descripcion, // Atajo de JS: equivale a descripcion: descripcion
        monto
    }
    listaDeGastos.push(gasto); // Agrega el gasto a la lista de todos los gastos
    guardarGastos();
    mostrarGastos();
    saverFormulario.reset(); // Limpia el formulario. Restaura los valores por defecto
    inputDescripcion.focus(); // Deja el cursor listo para escribir el siguiente gasto
}

// Pinta todos los gastos en pantalla y calcula el total
function mostrarGastos(){
    areaDeMostrarGastos.innerHTML = ''; // Limpia lo que hubiera antes para no duplicar gastos

    // Si no hay gastos, muestra un mensaje en pantalla
    if(listaDeGastos.length === 0){
        // El mensaje se coloca DENTRO de areaDeMostrarGastos. Antes se escribía en el contenedor general,
        // lo que borraba también los encabezados, esta misma área y el total (todo estaba dentro de ese contenedor).
        // Aquí innerHTML es seguro porque es un texto fijo, no algo que escribió el usuario.
        areaDeMostrarGastos.innerHTML = `
        <div class="alert alert-dark text-center">
                No hay gastos 👌👌
        </div>
        `
    } else {
        listaDeGastos.forEach(gasto => {
            fragment.appendChild(crearFilaGasto(gasto)); // Cada fila se prepara en el fragment
        });
        areaDeMostrarGastos.appendChild(fragment); // Coloca todas las filas en el DOM de una sola vez
    }
    totalDeGastos.textContent = formatearMonto(calcularTotal()); // Muestra el total en pantalla
}

// Construye en el DOM la fila de un solo gasto (descripción + monto + ícono de eliminar)
function crearFilaGasto({id, descripcion, monto}){
    // Se crean los elementos uno por uno y el texto se asigna con textContent, NO con innerHTML.
    // textContent trata todo como texto simple, así que si el usuario escribe algo como <img onerror=...>
    // se verá escrito tal cual y nunca se ejecutará. Con innerHTML ese código sí se ejecutaría
    // (y como queda guardado en el localStorage, se ejecutaría cada vez que se abra la página).
    const fila = document.createElement('div');
    fila.className = 'd-flex justify-content-between';
    fila.id = `gasto-${id}`; // El atributo id lleva un prefijo para que siempre sea un id de HTML válido

    const textoDescripcion = document.createElement('p');
    // La descripción se muestra con la primera letra en mayúscula
    textoDescripcion.textContent = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);

    const textoMonto = document.createElement('p');
    textoMonto.textContent = formatearMonto(monto) + ' ';

    const icono = document.createElement('i');
    icono.className = 'fa-solid fa-circle-xmark';
    icono.setAttribute('role','button');
    icono.dataset.gastoId = id; // Guarda el ID del gasto en el ícono (data-gasto-id) para saber cuál eliminar después

    textoMonto.appendChild(icono); // El ícono va dentro del párrafo del monto, justo después del número
    fila.append(textoDescripcion, textoMonto);
    return fila;
}

// Suma el monto de todos los gastos
function calcularTotal(){
    // reduce() recorre el arreglo llevando un acumulador (total) que empieza en 0
    // y en cada vuelta le suma el monto del gasto actual. Al final devuelve el resultado.
    return listaDeGastos.reduce((total, {monto}) => total + Number(monto), 0);
}

// Convierte un número en texto con formato de dinero, por ejemplo 250 -> "$250.00"
// Está en un solo lugar para que, si quieres cambiar cómo se ve el dinero, solo se modifique aquí.
// toFixed(2) también evita los números raros que salen al sumar decimales (0.1 + 0.2 = 0.30000000000000004)
function formatearMonto(numero){
    return '$' + Number(numero).toFixed(2);
}

// Muestra el mensaje de error en la página
function mostrarError(texto){
    mensajeError.textContent = texto;
    mensajeError.classList.remove('d-none'); // d-none es la clase de Bootstrap que oculta un elemento
}

// Oculta el mensaje de error
function ocultarError(){
    mensajeError.classList.add('d-none');
}

// Elimina un gasto específico
function eliminadorDeGastos (e) {
    const idAEliminar = Number(e.target.dataset.gastoId); // Lee el ID guardado en el ícono. Los data-attributes son texto, por eso se convierte a número
    // filter() crea un arreglo nuevo con todos los gastos EXCEPTO el que tiene ese ID
    listaDeGastos = listaDeGastos.filter(gasto => gasto.id !== idAEliminar);
    guardarGastos(); // Guarda la lista actualizada
    mostrarGastos();
}
