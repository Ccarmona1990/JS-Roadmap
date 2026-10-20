
// Get all elements that will be used from the DOM
const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const submitTarea = document.getElementById('submit-tarea');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template-tarea').content // Get the template's content to use it as a blueprint from the html
const fragment = document.createDocumentFragment(); // Creates a fragment. A fragment is a temporary placeholder preferably used for collecting and having many elements ready to be display before they are placed on the DOM 
let beenEdited = false; // Keeps track of task being edited
let idEditando = null; // Temporarily Holds the ID of the edited task
let tareas = {}; // Object where all tasks live while the page isn't refreshed

// Displays any previous tasks when the page loads
document.addEventListener('DOMContentLoaded',()=>{
    // It checks if the tareas object has been created in the localstorage
    // It only doesn't run when the object hasn't been created on the localstorage after the first use ever. 
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas')); // Parses back from json file to a js object
    }
    pintarTareas(); // Displays all tasks
})

// Event listener for all in-task bottons  
listaTarea.addEventListener('click',(e)=>{
    btnAccion(e);
})

// Event listener for the form
formTarea.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    // Determines whether a task is being edited or new.
    beenEdited ? editTarea(e) : setTarea(e);
})

// Edits an existing task
const editTarea = (e) =>{
    // If the value placed on the input is nothing, stops and doesn't create a task
    const nuevoTexto = inputTarea.value.trim();
    if(nuevoTexto === ''){
        inputTarea.focus(); // Returns the focus to the input area
        return;
    }
    tareas[idEditando].texto = nuevoTexto; // Finds the task and chgs its content/text
    tareas[idEditando].siendoEditada = false; // chgs that same task status from being edited to not being edited
    idEditando = null; // Resets this variable so that the id is temporary
    beenEdited = false // Resets this variable since editing is finished
    formTarea.reset(); // Resets the form. Programmatically restore defaults
    pintarTareas(); 
}

// Creates new tasks
const setTarea = e =>{
    // If value is nothing, stop and doesn't create a task
    if(inputTarea.value.trim()===''){
        formTarea.reset();
        inputTarea.focus();
        return;
    };
    // Creates the task object 
    let tarea = {
        id: Date.now(), // Adds the current minute the task is created as an ID
        texto: inputTarea.value.trim(), // Adds what's written on the input area on the form
        estado: false, // Keeps track of the status of the task. Whether is completed or not. 
        siendoEditada: false // Keeps track of the status when a task is being edited
    }
    tareas[tarea.id] = tarea; // Adds the single task object to the list of all tasks 
    formTarea.reset(); 
    inputTarea.focus(); 
    pintarTareas();
}

const pintarTareas = ()=>{
    // Sends the tasks object to the localstorage for continous use. 
    localStorage.setItem('tareas',JSON.stringify(tareas)); // We cannot send objects to the local storage buy we can send json file which are basically just strings

    // Checks that there aren't any tasks and if so shows a message on the screen
    if(Object.values(tareas).length === 0){
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center">
            No hay tareas pendientes 👌👌
        </div>`
        return;
    }

    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea=>{
        const clone = template.cloneNode(true);
        const toolTareas = clone.querySelectorAll('.fa-solid');
        toolTareas.forEach(item => item.dataset.id = tarea.id);

        if(tarea.estado){
            clone.querySelector('.alert')
            .classList.replace('alert-warning','alert-primary');
            toolTareas[0].classList.replace('fa-circle-check','fa-undo-alt');
            clone.querySelector('p').classList.add('text-decoration-line-through');
        }
        if(tarea.siendoEditada){
            toolTareas[1].classList.replace('fa-pen-to-square','fa-stop');
        }
        
        clone.querySelector('p').textContent = tarea.texto;
        fragment.appendChild(clone);
    })
    listaTarea.appendChild(fragment);
}

function btnAccion (e){
    // Obtain all the elements needed for all in-task buttons to work
    const element = e.target;
    const isCheckCircle = element.classList.contains('fa-circle-check');
    const isEditIcon = element.classList.contains('fa-pen-to-square');
    const isMinusCircle = element.classList.contains('fa-circle-minus');
    const isUndoAlt = element.classList.contains('fa-undo-alt');
    const isStop = element.classList.contains('fa-stop');
    const elementId = element.dataset.id;

    // Button to check mark a completed task
    if(isCheckCircle){
        tareas[elementId].estado = true;
        pintarTareas();
    }
    // Button to on check mark a task
    if(isUndoAlt){
        tareas[elementId].estado = false;
        pintarTareas();
    }
    // Button to edit a task
    if(isEditIcon){
        Object.values(tareas).forEach(t=>t.siendoEditada=false);

        tareas[elementId].siendoEditada = true;
        idEditando = elementId;
        beenEdited = true; 
        inputTarea.focus();
        inputTarea.value = tareas[elementId].texto;
        pintarTareas();
    }
    // Button to stop editing
    if(isStop){
        tareas[elementId].siendoEditada = false;
        idEditando = null
        inputTarea.value = '';
        beenEdited = false;
        pintarTareas();
    }
    // Button to delete task
    if(isMinusCircle){
        if(elementId == idEditando){
            idEditando = null;
            beenEdited = false
            inputTarea.value = ''
        }   
        delete tareas[elementId]
        pintarTareas();
    }

    e.stopPropagation();
}