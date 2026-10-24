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

// Elements    

const favoriteForm = document.getElementById('favorite-form');
const favoriteInput = document.getElementById('favorite-input');
const btnSection1 = document.querySelector('#btn-section1');
const btnSection2 = document.querySelector('#btn-section2');
const favoriteBtnTemplate = document.getElementById('favoriteBtn-template').content
const favoritesList = document.getElementById('favorites-list');
const favoriteCardTemplate = document.getElementById('favoriteCard-template').content
const favBtnFragment = document.createDocumentFragment();
const categoryFragment = document.createDocumentFragment();
const favElementsFragment = document.createDocumentFragment();
const localStorageKey = 'favoriteObject';
let currCategory = null;
let isCategorySelected = false;
let favoriteObj = {
    movies: ['Playing it cool'],
    books: ['Atomic Habits'],
    games: ['Zelda ocarina of time', 'Super Mario Bros']
};


document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem(localStorageKey)){
        favoriteObj = JSON.parse(localStorage.getItem(localStorageKey));
    }
    displayCategories();
    displayCategorySelectors();
})

favoriteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e);
    const submitter = e.submitter;
    favoriteInput.focus();
    if(submitter.id === 'add-favorite'){
        favoriteAdder();
    } else if (submitter.id === 'add-category'){
        categoryAdder();
    }
})
btnSection2.addEventListener('click',(e)=>{
    //if(!Object.keys(favoriteObj).includes(e.target.id))return;

    categorySelector(e);
    console.log(e);
})

function displayCategorySelectors(){
    Object.keys(favoriteObj).forEach((category)=>{
        const clone = favoriteBtnTemplate.cloneNode(true);
        const input = clone.querySelector('input');
        const label = clone.querySelector('label');
        label.id = category;
        input.id = category;
        label.textContent = category;
        favBtnFragment.appendChild(clone);
    })
    btnSection2.appendChild(favBtnFragment);
}
function categorySelector(e){
    const element = e.target;
    if(element.classList.contains('btn-success')){
        element.classList.toggle('selected');
        element.classList.replace('btn-success','btn-danger');
        currCategory = element.id;
        isCategorySelected = true;
    }

}

function categoryAdder(){
    if(favoriteInput.value.trim() === '')return;
    favoriteObj[favoriteInput.value] = [];
    displayCategories();
    if(localStorage.getItem(localStorageKey)){
        const keys = Object.keys(JSON.parse(localStorage.getItem(localStorageKey)))
        if(!keys.includes(favoriteInput.value)){
            localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
        }
    }
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
}

function displayCategories(){
    Object.keys(favoriteObj).forEach((category)=>{
        const clone = favoriteCardTemplate.cloneNode(true);
        const favElementListTemplate = clone.getElementById('favElementList-template').content;
        const favElementList = clone.getElementById('fav-elements');
        displayFavElements(category, favElementListTemplate, favElementList)
        clone.querySelector('h2>span').textContent = category;
        categoryFragment.appendChild(clone);
    })
    favoritesList.appendChild(categoryFragment);
}

function displayFavElements(category, template, elementList ){
    favoriteObj[category].forEach((favElement)=>{
        const cloneFavElement = template.cloneNode(true);
        cloneFavElement.querySelector('.favElement').textContent = favElement;
        favElementsFragment.appendChild(cloneFavElement);
    })
    elementList.appendChild(favElementsFragment);
}

function favoriteAdder(){

}
