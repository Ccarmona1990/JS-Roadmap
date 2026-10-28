/*
Save a list of favorite items
Create an input where a user can enter favorite movies, books, or games.
Requirements:
    • Add each new item to an array.
    • Save the array in localStorage as JSON.
    • Load and display the saved items when the page opens.
    • Include a button to remove an item from the list.
Example: Add "The Hobbit" and "Interstellar". After refreshing, both items remain visible.
*/

// Get all elements that will be used from the DOM
const favoriteForm = document.getElementById('favorite-form');
const favoriteInput = document.getElementById('favorite-input'); // Text input used for BOTH new favorites and new categories
const btnSection1 = document.querySelector('#btn-section1'); // Div holding the "Add favorite" and "Add category" submit buttons
const btnSection2 = document.querySelector('#btn-section2'); // Div where the category radio buttons are placed
const favoriteBtnTemplate = document.getElementById('favoriteBtn-template').content // Blueprint for one radio button + label (one per category)
const favoritesList = document.getElementById('favorites-list'); // Section where all the category cards are displayed
const favoriteCardTemplate = document.getElementById('favoriteCard-template').content // Blueprint for one category card (title, delete icon and the list of its favorites)
// Fragments: temporary placeholders used to collect many elements before placing them on the DOM all at once
const favBtnFragment = document.createDocumentFragment(); // Collects the category radio buttons
const categoryFragment = document.createDocumentFragment(); // Collects the category cards
const favElementsFragment = document.createDocumentFragment(); // Collects the favorite items inside a single card
const localStorageKey = 'favoriteObject'; // Name under which everything is saved in the localStorage
let currCategory = null; // Holds the category (radio button) currently selected, new favorites get added to it
let isCategorySelected = false; // Keeps track of whether a category radio button has been selected
// Object where all the data lives. Each key is a category and each value is an array with its favorites.
// These are only the default values, they get replaced by what's in the localStorage when the page loads.
let favoriteObj = {
    movies: ['Playing it cool'],
    books: ['Atomic Habits'],
    games: ['Zelda ocarina of time', 'Super Mario Bros']
};


// Displays any previous categories and favorites when the page loads
document.addEventListener('DOMContentLoaded',()=>{
    // It checks if the favoriteObj has been saved on the localstorage before
    // If it hasn't (first use ever) the default favoriteObj above is used
    if(localStorage.getItem(localStorageKey)){
        favoriteObj = JSON.parse(localStorage.getItem(localStorageKey)); // Parses back from json string to a js object
    }
    displayCategories(); // Displays all the category cards with their favorites
    displayCategorySelectors(); // Displays the radio buttons used to choose a category
})

// Event listener for the form. The same form has two submit buttons
favoriteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const submitter = e.submitter; // The button that was used to submit the form (Add favorite or Add category)
    favoriteInput.focus(); // Returns the focus to the input area
    // Adds a favorite only if a category has been selected
    if(submitter.id === 'add-favorite' && isCategorySelected && currCategory){
        favoriteAdder();
    // Adds a category whether or not one is selected (radio buttons can't be unselected, so requiring "none selected" would block this button for good after the first click)
    } else if (submitter.id === 'add-category'){
        categoryAdder();
    }
})

// Event listener for the category radio buttons (event delegation: one listener on the parent instead of one per button)
btnSection2.addEventListener('click',(e)=>{
    // Ignores clicks that weren't on an input (the radio button itself)
    if(e.target.tagName.toLowerCase() !== 'input')return;
    categorySelector(e);
})

// Event listener for all the delete icons (both for categories and for single favorites)
favoritesList.addEventListener('click',(e)=>{
    // Ignores clicks that weren't on an icon
    if(!e.target.classList.contains('fa-solid')) return;
    itemRemover(e)
})

// Creates one radio button per category so the user can choose where the new favorite goes
function displayCategorySelectors(){
    // Removes the radio buttons already displayed so they don't get duplicated. The <template> stays untouched since it's neither an input nor a label
    btnSection2.querySelectorAll('input, label').forEach(el => el.remove());
    Object.keys(favoriteObj).forEach((category, i)=>{
        const clone = favoriteBtnTemplate.cloneNode(true); // Copy of the template
        const input = clone.querySelector('input');
        const label = clone.querySelector('label');
        const uniqueId = `category-${i}`; // Category names can have spaces or repeat, so the id is built from the position instead
        label.htmlFor = uniqueId; // Links the label to the radio button so clicking the text also selects it
        input.id = uniqueId;
        input.value = category; // The value is what categorySelector uses later to know which category was chosen
        input.checked = isCategorySelected && category === currCategory; // Keeps the selection after the radio buttons are redrawn
        label.textContent = category;
        favBtnFragment.appendChild(clone);
    })
    btnSection2.appendChild(favBtnFragment); // Places all the radio buttons on the DOM at once
}

// Runs when a radio button is clicked. Saves which category is selected
function categorySelector(e){
    const element = e.target;
    isCategorySelected = element.checked; // true when the radio button is checked
    currCategory = element.value; // The value of the radio button is the name of the category
    favoriteInput.focus();
}

// Creates a new (empty) category
function categoryAdder(){
    // If the value placed on the input is nothing, stops and doesn't create a category
    const name = favoriteInput.value.trim();
    if(name === '')return;
    // If the category already exists (ignoring upper/lower case) stops. Otherwise its favorites would be overwritten with an empty array
    if(Object.keys(favoriteObj).some(c => c.toLowerCase() === name.toLowerCase())){
        favoriteInput.select(); // Highlights the text so the user can change it
        return;
    }
    favoriteObj[name] = []; // The text written becomes a new key with an empty array of favorites
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj)); // We cannot send objects to the local storage but we can send a json string
    displayCategories();
    displayCategorySelectors();
    favoriteInput.value = ''; // Clears only the text. form.reset() would also uncheck the radio buttons while currCategory still remembers the old selection
}

// Displays one card per category, each one with its favorites inside
function displayCategories(){
    favoritesList.innerHTML='' // Clears the list first so cards don't get duplicated
    Object.keys(favoriteObj).forEach((category)=>{
        const clone = favoriteCardTemplate.cloneNode(true);
        displayFavElements(category, clone) // Fills the card with the favorites of this category
        clone.querySelector('h2>span').textContent = category; // Card title
        clone.querySelector('h2 .fa-solid').dataset.category = category; // Tells the category's delete icon which category it belongs to
        categoryFragment.appendChild(clone);
    })
    favoritesList.appendChild(categoryFragment);
}

// Fills one category card with all the favorites that belong to that category
function displayFavElements(category, clone){
    // The favorite item template lives inside the card template, so it's searched inside the clone
    const template = clone.getElementById('favElementList-template').content;
    const elementList = clone.getElementById('fav-elements'); // Container inside the card where the favorites go

    favoriteObj[category].forEach((favElement, index)=>{
        const cloneFavElement = template.cloneNode(true);
        const tools = cloneFavElement.querySelectorAll('.fa-solid');
        // Stores where this favorite lives (its category and its position in the array) on the icon(s) as data attributes
        tools.forEach(item =>{
            item.dataset.category = category;
            item.dataset.index = index;
        });

        cloneFavElement.querySelector('.favElement').textContent = favElement; // The text of the favorite
        favElementsFragment.appendChild(cloneFavElement);
    })
    elementList.appendChild(favElementsFragment);
}

// Adds a new favorite to the selected category
function favoriteAdder(){
    const value = favoriteInput.value.trim(); // Trimmed so extra spaces don't get saved
    // If the value placed on the input is nothing, stops and doesn't add the favorite
    if(value === '')return;
    favoriteObj[currCategory].push(value); // Adds the favorite to the array of the selected category
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj)); // Saves the updated object
    displayCategories();
    favoriteInput.value = ''; // Clears only the text so the selected category stays selected
}

// Removes either a whole category or a single favorite, depending on which icon was clicked
function itemRemover(e){
    // The icon knows exactly what it belongs to thanks to the data attributes set when it was displayed
    const { category, index } = e.target.dataset;
    if(category === undefined) return;

    // Category icons have no index, so the whole category is deleted
    if(index === undefined){
        delete favoriteObj[category];
        // If the deleted category was the selected one, the selection is reset
        if(category === currCategory){
            currCategory = null;
            isCategorySelected = false;
        }
        localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
        displayCategories();
        displayCategorySelectors();
    // Otherwise it's a single favorite
    } else {
        favoriteObj[category].splice(Number(index),1); // Removes that one favorite by its exact position, so repeated names can't remove the wrong one
        localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
        displayCategories();
    }
}
