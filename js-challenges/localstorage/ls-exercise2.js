/*
Create a persistent counter
Create a counter with an initial value of zero and buttons to increase and reset it.
Requirements:
    • Increase the number when the user clicks the Increase button.
    • Save the updated number in localStorage.
    • Restore the saved number when the page loads.
    • Reset the counter to zero when the Reset button is clicked.
Example: Increase the counter to 5, refresh the page, and the counter still displays 5.
*/

// Elements
const displayCounter = document.getElementById('display-counter');
const btnContainer = document.getElementById('btns-container');
const localStorageKey = 'currentNumber'
let counter = 0;
let interval = null;

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem(localStorageKey)){
        counter = Number(localStorage.getItem(localStorageKey));
        displayCounter.innerHTML = counter;
    }
})

btnContainer.addEventListener('mousedown',(e)=>{
    const element = e.target;
    
    if(element.id === 'increase' || element.id === 'reduce'){
        setCounter(e);

        interval = setInterval(()=>{
            setCounter(e);
        },100)
    } else {
        setCounter(e);
    }

});
document.addEventListener('mouseup',()=>{
    clearInterval(interval);
});

function setCounter(e){
    const element = e.target;

    if(element.id === 'increase'){
        counter++;
        counterDisplayer();
    } else if (element.id === 'reset'){
        counter = 0;
        counterDisplayer();
    } else if (element.id === 'reduce'){
        counter--;
        counterDisplayer();
    }
}

function counterDisplayer(){
    localStorage.setItem(localStorageKey,counter);
    displayCounter.innerHTML = counter;
}   