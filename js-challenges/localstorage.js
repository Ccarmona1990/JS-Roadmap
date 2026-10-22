
// Elements
const form = document.getElementById('input-form');
const input = document.getElementById('input-text');
const submit = document.getElementById('input-submit');
const display = document.getElementById('input-display');

// Other variables
const localStorageKey = 'inputName';
const welcomeMsg = (name)=>`Welcome back, ${name}!`;

// Checks if a name already exist on the localstorage
// If it does, it displays it. 
document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem(localStorageKey)){
        const retrievedName = localStorage.getItem(localStorageKey);
        display.innerHTML = welcomeMsg(retrievedName);
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    displayName(e);
})

function displayName(e){
    if(input.value.trim() === ''){
        alert('Por favor agregue un valor al campo de entrada');
        input.focus();
        return; 
    }
    
    const nombre = input.value;
    const capitalizedName = strCapitalizer(nombre);
    localStorage.setItem(localStorageKey,capitalizedName);
    display.innerHTML = welcomeMsg(capitalizedName);
    form.reset();
    input.focus();
}

function strCapitalizer(str){
    if (typeof str !== 'string' || str.length <= 1) return str;
    return  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}