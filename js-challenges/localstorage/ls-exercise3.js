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
    const submitter = e.submitter;
    favoriteInput.focus();
    if(submitter.id === 'add-favorite' && isCategorySelected && currCategory){
        favoriteAdder();
    } else if (submitter.id === 'add-category' && !isCategorySelected){
        categoryAdder();
    }
})
btnSection2.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() !== 'input')return;
    categorySelector(e);
})
favoritesList.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('fa-solid')) return;
    console.log(e.target)
    itemRemover(e)
})

function displayCategorySelectors(){
    Object.keys(favoriteObj).forEach((category)=>{
        const clone = favoriteBtnTemplate.cloneNode(true);
        const input = clone.querySelector('input');
        const label = clone.querySelector('label');
        label.id = category;
        label.htmlFor = category;
        input.id = category;
        input.value = category;
        label.textContent = category;
        favBtnFragment.appendChild(clone);
    })
    btnSection2.appendChild(favBtnFragment);
}
function categorySelector(e){
    const element = e.target;
    isCategorySelected = element.checked;
    currCategory = element.id;
    favoriteInput.focus();
}

function categoryAdder(){
    if(favoriteInput.value.trim() === '')return;
    favoriteObj[favoriteInput.value] = [];
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
    displayCategories();
    favoriteForm.reset();
}

function displayCategories(){
    favoritesList.innerHTML=''
    Object.keys(favoriteObj).forEach((category)=>{
        const clone = favoriteCardTemplate.cloneNode(true);
        displayFavElements(category, clone)
        clone.querySelector('h2>span').textContent = category;
        categoryFragment.appendChild(clone);
    })
    favoritesList.appendChild(categoryFragment);
}

function displayFavElements(category, clone){
    const template = clone.getElementById('favElementList-template').content;
    const elementList = clone.getElementById('fav-elements');

    favoriteObj[category].forEach((favElement)=>{
        const cloneFavElement = template.cloneNode(true);
        const tools = cloneFavElement.querySelectorAll('.fa-solid');
        tools.forEach(item =>item.dataset.id = category)

        cloneFavElement.querySelector('.favElement').textContent = favElement;
        favElementsFragment.appendChild(cloneFavElement);
    })
    elementList.appendChild(favElementsFragment);
}
function favoriteAdder(){
    const value = favoriteInput.value; 
    if(value.trim() === '')return;
    favoriteObj[currCategory].push(value);
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
    displayCategories();
    favoriteForm.reset();
}

function itemRemover(e){
    const elementToRemove = e.target.previousElementSibling.textContent;
    const favArrs = Object.values(favoriteObj)
    
    for (const arrs of favArrs){
        if(arrs.includes(elementToRemove)){
            const index = arrs.indexOf(elementToRemove);
            if(index !== -1){
                arrs.splice(index,1);
                return;
            }
        }
    }
    localStorage.setItem(localStorageKey,JSON.stringify(favoriteObj));
    displayCategories();
}

