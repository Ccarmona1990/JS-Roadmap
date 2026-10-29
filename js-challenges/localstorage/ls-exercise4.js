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


// Elementos de el HTML and Variables
const saverFormulario = document.getElementById('saver-form');
const inputDescripcion = document.getElementById('descripcion');
const inputMonto = document.getElementById('monto');
const submitGasto = document.getElementById('submit-expense');
const containerAreaMuestraDeGastos = document.getElementById('container-display-expenses-area') //
const areaDeMostrarGastos = document.getElementById('area-muestra-gastos');
const totalDeGastos = document.getElementById('total-gastos');
const localStorageKey = 'lista-de-gastos';
let listaDeGastos = [];

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem(localStorageKey)){
        listaDeGastos = JSON.parse(localStorage.getItem(localStorageKey));
    }
    mostrarGastos();
});

saverFormulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    agregarGastos(e);
});
areaDeMostrarGastos.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('fa-circle-xmark'))return;
    eliminadorDeGastos(e);
});

function agregarGastos(e){
    if(inputDescripcion.value.trim() === '' || !(Number(inputMonto.value) > 0)){
        alert('Por favor agregue un monto o descripcion aceptable!');
        saverFormulario.reset();
        return;
    }
    
    const gasto = {
        id: Date.now(),
        descripcion: inputDescripcion.value,
        monto: Number(inputMonto.value)
    }
    listaDeGastos.push(gasto);
    localStorage.setItem(localStorageKey,JSON.stringify(listaDeGastos));
    mostrarGastos();
    saverFormulario.reset();
}

function mostrarGastos(){
    if(listaDeGastos.length === 0){
        containerAreaMuestraDeGastos.innerHTML = `
        <div class="alert alert-dark text-center">
                No hay gastos 👌👌
        </div>
        `
    }
    let listaDeGastosHTML = listaDeGastos.map(({id,descripcion,monto}) => {
        return `
        <div id=${id} class="d-flex justify-content-between">
            <p>${descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</p>
            <p>$${monto} <i class="fa-solid fa-circle-xmark" role="button" data-gasto-id="${id}"></i></p>
        </div>`
    }).join('');
    areaDeMostrarGastos.innerHTML = listaDeGastosHTML;
    let counter = 0;
    listaDeGastos.map(({monto})=>{
        counter+=Number(monto);
        return counter
    });
    totalDeGastos.textContent = '$' + counter;
}

function eliminadorDeGastos (e) {
    const elementId = Number(e.target.dataset.gastoId);
    for(let [index, obj] of listaDeGastos.entries()){
        if(obj.id === elementId){
            listaDeGastos.splice(index,1);
            localStorage.setItem(localStorageKey,JSON.stringify(listaDeGastos));
            mostrarGastos();
            return;
        }
    }
}