// Greeting Generator
function greeting(nm){
    return `Hello ${nm}`;
};
greeting('Chris');

// Basic Calculator
function calculator(num1,op,num2){
    if (op === '/' &&  num2 === 0){
        return 'We cannot divide by 0'
    }
    switch(op){
        case '+':
            return num1+num2;
        case '-':
            return num1-num2;
        case '/':
            return num1/num2;
        case '*':
            return num1*num2;
        default:
            return 'Invalid operator';
    }
}
console.log(calculator(10,';',2));

// Age Calculator
function ageCalculator(DD,MM,YY){
    const d = new Date();
    const currYear = d.getFullYear();
    const currMonth = d.getMonth() + 1;
    const currDay = d.getDate();
    const age = currYear-YY;
    if (currMonth < MM || (currMonth === MM && currDay < DD)){
       return age -1;
    } 
    return age;
}
console.log(ageCalculator(8,10,1990));

// Temperatur converter
function tempConverter(c){
    return c * 1.8 + 32 ;
}
console.log(tempConverter(0));

// Simple price calculator
function priceCalculator(price,quantity = 1){
    return isNumberInvalid(price,quantity) 
    ? 'Add a value greater than 0' 
    : price * quantity;
}
console.log(priceCalculator(32,5));

// Even or Odd
function evenorodd(number){
    if (isNumberInvalid(number)) return 'Please enter a valid number';
    return Math.floor(number) % 2 === 0 ? 'even' : 'odd';
}
console.log(evenorodd(7));

// Positive, negative or zero
function upZeroDown(number){
    if (typeof number !== 'number' || !Number.isFinite(number)) return 'Please enter a valid number';
    return number > 0 ? 'positive' : (number < 0 ? 'Negative': 'Zero');
}
console.log(upZeroDown(NaN))

// Greater or equal
function greater (num1,num2){
    if (typeof num1 !== 'number' ||
        typeof num2 !== 'number' ||
        !Number.isFinite(num1) ||
        !Number.isFinite(num2))return 'Not a number';
    return num1 > num2 ? num1 : (num1 === num2 ? "Equal numbers" : num2);
}
console.log(greater(15,15));

// 🎓 Grade Checker
function gradeChecker(grade){
    if (isNumberInvalid(grade) || grade > 100) return 'Please enter a valid number';
   
    if (grade >= 90){
         return 'A'
    } else if (grade >= 80){
         return 'B';
    } else if (grade >= 70){
        return 'C'
    } else if (grade >= 60){
        return 'D';
    } else {
        return 'F';
    }
}
console.log(gradeChecker(65));

// 🔐 Password Checker
function passwordChecker(str){
    if(typeof str !== 'string')return 'Password must be a string'
    return str === 'lucesAss' 
    ? 'Welcome in' 
    : 'Please try a differente password';
}
console.log(passwordChecker('Blabla'))

// 🕐 Time of Day
function timeOFDay(time){
    if (!Number.isInteger(time) 
        || time < 0 
        || time > 23) return 'Input a number between 0 and 23';

    if (time >= 5 && time <= 11){
        return "Morning";
    } else if (time >= 12 && time <= 17){
        return "Afternoon";
    } else if (time >= 18 && time <= 21){
        return "Evening";
    } else {
        return "Night"
    }
}
console.log(timeOFDay(5))

// 🎟️ Movie Ticket Price
function ticketPrice(age){
    if (isNumberInvalid(age)) return 'Not a number';

    if (age >= 60)return 7;
    else if (age >= 18)return 12;
    else if (age >= 13)return 8;
    else if (age >= 0)return 5;
    else return 'Not a valid age';
}
console.log(ticketPrice(0))

// 🚦 Traffic Light
function trafficLight(str){
    if(typeof str !== 'string')return 'Please enter a valid Traffic light color';
    switch(str.toLowerCase()){
        case 'green': 
            return 'Go';
        case 'yellow': 
            return 'Please slow down and be ready to stop';
        case 'red':
            return 'Stop';
        default: 
            return 'Please enter a valid Traffic light color';
    }
}
console.log(trafficLight('green'));

// 🧙 Character Classifier
function characterClassifier(characterType){
    if (typeof characterType !== 'string') {
        return 'Please enter a valid in-game character class';
    }
    const weapon = characterType.toLowerCase();
    const characterClass = {
        'sword': '⚔️Warrior',
        'bow': '🏹Archer',
        'staff':'🪄Mage',
        'daggers': '🗡️Assassin',
        'hammer': '🔨Berserker',
        'shield': '🛡️Guardian',
        'spear': '🔱Lancer',
        'holy': '✨Wand Cleric'
    }

    return Object.hasOwn(characterClass, weapon) 
    ? characterClass[weapon] 
    : 'Please enter a valid in-game character class' ;
}
console.log(characterClassifier('bow'))

// Temperature Conversion Function
function convertTemperature (degree, tempUnit) {
    if (typeof degree !== 'number' || !Number.isFinite(degree)) return 'Please enter a valid temperature';
    if (typeof tempUnit !== 'string') return 'Please enter C or F';

    switch (tempUnit.toLowerCase()){
        case 'c':
            return degree * 1.8 + 32;
        case 'f': 
            return (degree - 32) / 1.8; 
        default: 
            return 'Invalid temperature unit. Use C or F';
    }
}

function isNumberInvalid (number1, number2){
    const isInvalid = number => 
        typeof number !== 'number' 
    || !Number.isFinite(number)
    || number < 0;

    if (number2 === undefined) {
        return isInvalid(number1);
    } 
    return isInvalid(number1) || isInvalid(number2);
}

// 📐 Rectangle Area
const rectangleArea = (w,h) => 
    isNumberInvalid(w,h) 
    ? 'Please enter a valid number' 
    : w * h;

// 💵 Calculate Discount
const discountCalculator = (price, discount) => 
    (isNumberInvalid(price, discount) || discount > 100
 ? "Please enter a valid price or discount number" 
 :  price - (price * discount / 100));
console.log(discountCalculator(20,20));

// 🎂 Years Until 100
const tillHundred = (age) => 
    (!Number.isInteger(age)  
    || age > 100 
    || age < 0
    ? "Input a valid age" 
    : 100 - age); 
//console.log(tillHundred(0))

// 🔄 Convert Minutes to Seconds
const minutes2Seconds = (min) => 
   (typeof min !== 'number' 
    || !Number.isFinite(min)  
    || min < 0
    ? "Please enter a valid number of minutes" 
    : min * 60);
//console.log(minutes2Seconds(5));

// 🔢 Count to 10
const countingToTen = ()=>{
    for (let number = 1; number < 11; number++) {
        console.log(number);
    }
}
//countingToTen();

// ➕ Sum Numbers
function numbersSum () {
    let total = 0;
    for (let number = 1; number < 101; number++){
        total += number;
    }
    return total;
}
//console.log(numbersSum())

// ✖️ Multiplication Table
function multiplicationTable(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) return 'Please enter a valid number';
    let table = {}
    for (let toMultiplyBy = 1; toMultiplyBy < 11; toMultiplyBy++){
        //console.log(num*toMultiplyBy);
        table[toMultiplyBy] = num * toMultiplyBy;
    }
    return table;
}

// 🔢 Count Even Numbers
function onlyEvenNumbers(){
    let counter = 0;
    for(let num = 1; num <= 100; num++){
        if(num % 2 === 0){
            counter += num;
        }
    }
    return `There are ${counter} even numbers.`
}


// 🔍 Find a Number
function numberFinder(number){
    if (isNumberInvalid(number) || number > 50)return 'Not found';
    for(let finder = 0; finder <= 50; finder++){
        if(number === finder){
            return "found"
        }
    }
}

// ⭐ Print a Pattern
function patternPrinter(number){
    if (isNumberInvalid(number))return 'Please enter a valid number';
    let pattern = '';
    for(let starCounter = 1; starCounter <= number; starCounter++){
        //console.log('*'.repeat(starCounter)) 
        pattern += '*'.repeat(starCounter) + '\n';
    }
    return pattern;
}
//console.log(patternPrinter(5));

const numbers = [12, 45, 7, 89, 23, 56, 3, 71, 34, 18];

// 27. 🏆 Find the Largest Number
// Create a program that goes through a series of numbers and determines which one is the largest.
function largestNumber(arr){
    if (arr.length === 0)return undefined;

    let highest = arr[0];
    for(let i=0;i<arr.length;i++){
        if(arr[i]>highest){
            highest = arr[i];
        }
    }
    return highest;
}


// 28. 🧮 Calculate an Average
// Create a program that goes through a series of numbers, calculates their total, and then determines their average.
function calculateAvr(arr){
    let total = 0;
    for (let i=0;i<arr.length;i++){
        total += arr[i]
    }
    return total / arr.length
}
console.log(calculateAvr(numbers));

// 29. 🔢 Countdown
// Create a program that receives a starting number and counts backward until it reaches zero.
function countdown (num){
    for(let i = num; i>=0;i--){
        console.log(i)
    }
}
import { type } from 'node:os';
//countdown(5)

/*
🎲 Number Guessing Game
30. Create a small program where the computer has a secret number and the player repeatedly tries to guess it.
The program should tell the player whether their guess is:
- Too high
- Too low
- Correct
The game should continue until the correct number is guessed.
*/
import readline from 'node:readline/promises';
async function playGuessingGame(){
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        });
        try{

            while (true) {
                const input = await rl.question('Guess a number (1-10): ');
                const guess = Number(input);
                
                if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
                    console.log('Please enter a whole number between 1 and 10.');
                    continue;
                }
                if (guess === secretNumber) {
                    console.log('Correct!');
                    break;
                } else if (guess > secretNumber) {
                    console.log('Too high');
                } else {
                    console.log('Too low');
                }
            }
        } finally{
            rl.close();
        }
}
//playGuessingGame();

// 31. 📦 Shopping List
// Create an array containing several shopping items.
// Your program should display each item in the list individually.
const shoppingList = ['cheese', 'ham', 'bread','juice','eggs'];
function displayShoppingList(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>typeof item === 'string'))return 'Please enter a valid array of strings'
    arr.forEach( item => {
        console.log(item);
    });
}
// displayShoppingList(shoppingList);

// 32. 🔍 Find an Item
// Create an array of items and a target item.
// Your program should determine whether the target item exists in the array.
function findItem(arr,target){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'string' && item !== '')))return 'Please enter a valid array of strings'
    if(typeof target !== 'string'|| target ==='')return 'Please enter a valid target'
    const foundItem = arr.includes(target) 
    return foundItem ? 'Item was found' : 'Item was not found';
}
// console.log(findItem(shoppingList,'cheese'));

// 33. ➕ Sum an Array
// Create an array containing several numbers.
// Calculate the total of all the numbers in the array.
function sumArray(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
    return arr.reduce((acc,curr)=>acc+curr);
}
// console.log(sumArray(numbers));


// 34. 🏆 Largest Array Number
// Create an array of numbers and determine which number is the largest.
// Again, don't use a built-in function specifically designed to find the maximum.
function largestArrayNumber(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
     return arr.reduce((acc,curr)=>(acc>curr)?acc:curr);
}
// console.log(largestArrayNumber(numbers))


// 35. 🔢 Count Even Numbers in an Array
// Create an array containing several numbers.
// Go through the array and determine how many of its numbers are even.
function allEven(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
    let evenCounter = 0;
    for (const number of arr){
        if(number % 2 === 0){
            evenCounter+=1;
        }
    }
    return evenCounter
}
console.log(allEven(numbers));

/*
36. 🔄 Reverse an Array
Create an array of items and produce a new ordering where the items appear in the opposite order.
Example:
["A", "B", "C", "D"]
↓
["D", "C", "B", "A"]
Try solving this without relying on a built-in method specifically designed to reverse an array.
*/
function arrReverser(arr){
    if(!Array.isArray(arr)) return 'Please enter a valid array'
    const newArr = [];
    for(let i=arr.length-1; i>=0;i--){
        newArr.push(arr[i]);
    }
    //console.log(newArr);
    return newArr;
}
// arrReverser(shoppingList)


// 37. 🧹 Remove Negative Numbers
// Create an array containing positive and negative numbers.
// Create a result containing only the positive numbers and zero.
const numbers2 = [-1,2,5,-8,0,9,20,7,-20,-3] 
function nonNegative(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
    return arr.filter(number=>number>=0)
}
// console.log(nonNegative(numbers2));

/*
38. 🎯 Find All Numbers Above X
Create an array of numbers and another number called your target/limit.
Find every number in the array that is greater than the limit.
For example:
Numbers: [2, 8, 5, 10, 3]
Limit: 5
Result: [8, 10]
*/
function aboveX(arr,limit){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
    if(typeof limit !== 'number' || !Number.isFinite(limit)) return 'Please enter a valid number'
    return arr.filter(num=>num>limit)
}
//console.log(aboveX(numbers2,-10))


// 39. 📊 Calculate Array Average
// Create an array containing several numbers.
// Calculate the average of all the numbers in the array.
function arrAverage(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item)))) return 'Please enter a valid array of numbers'
    return arr.reduce((acc,curr)=>acc+curr)/arr.length;
}
console.log(arrAverage(numbers))

/*
40. 🛒 Shopping Cart Total
Create an array containing several product prices.
Calculate how much the customer would have to pay for everything in the cart.
*/
function shoppingCartTotal(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid array';
    if(!arr.every(item=>(typeof item === 'number' && Number.isFinite(item) && item > 0))) return 'Please enter a valid array of numbers'
    return arr.reduce((acc,curr)=>acc+curr,0);
}

function isInvalidObject(obj){
    return (
        obj === null 
        || typeof obj !== 'object'
        || Array.isArray(obj)
        || Object.keys(obj).length === 0) 
}
const users = [
    ['john',30,'johndoe1@gmail.com','United States'],
    ['maria',25,'mariaperez@gmail.com','Mexico'],
]
const usrMker= (arrs)=>{
    if(!Array.isArray(arrs) || arrs.length === 0) return 'Please enter a valid Array';
    if(!arrs.every(arr=>Array.isArray(arr) && arr.length !== 0)) return 'Please enter valid Arrays in the array';
    return arrs.map(([name,age,email,country])=>({
        name,age,email,country        
    }));
}
const students = [
    ['Mike',70], ['Stacy',85], ['Ruth',65], ['Aaron',45], ['Luces',95],
    ['Tyler',75], ['Mor',44]
]
const sSMker = (Ss)=>{
    if(!Array.isArray(Ss) || Ss.length === 0) return 'Please enter a valid Array';
    if(!Ss.every(arr=>Array.isArray(arr) && arr.length !== 0)) return 'Please enter valid Arrays in the array';
    const result = [];
    for(let [name, grade] of Ss){
        const newStudnt = {name, grade };
        result.push(newStudnt);
    }
    return result;
}
const products = [
    ["ham",119,1],
    ['Cheese',250,1],
    ["bread loaf",99,2],
    ["egg carton",210,1],
    ["juice",170,2],
    ["green bananas",20,3]
]
const productmkr = (prods)=>{
    return prods.map(([name,price,quantity])=>({name,price,quantity}));
}

/*
41. 👤 Create a User
Create an object representing a person.
The object should contain information such as:
name
age
email
country
Then display the person's information.
*/
const john = usrMker(users)[0];
// console.log(john);

//42. 🔍 Read Object Properties
//Create an object representing a person or product.
//Your program should retrieve specific pieces of information from the object and display them.
function getProperty(obj,prop){
    if(isInvalidObject(obj)) return 'Please enter a valid object';
    if(typeof prop !== 'string'|| prop ==='')return 'Please enter a valid target'
    return (Object.hasOwn(obj,prop)) 
    ? obj[prop] 
    : "Please use a property that is in this object";
}
// console.log(getProperty(john,'age'));

/*
43. 🎓 Student Grade
Create an object representing a student.
The object should contain the student's name and grade.
Your program should determine whether the student passed or failed based on their grade.
*/
function passedFailed (obj){
    if(isInvalidObject(obj))return 'Please enter a valid Object';
    const {grade} = obj;
    if(isNumberInvalid(grade) || grade > 100) return 'Please add a valid grade';
    return grade >= 70 ? 'Passed' : 'Failed';
}
const mike = sSMker(students)[0];
console.log(passedFailed(sSMker(students)[3]));

/*
44. 🛒 Product Information
Create an object representing a product.
Include information such as:
name
price
category
quantity
Then create a way to display a description of the product using that information.
*/
const product = {
    name: 'Arroz la garza',
    price: 260,
    category: 'rice and pasta',
    quantity: 1
}
function showDescription (obj){
    if(isInvalidObject(obj)) return 'Please enter a valid object';
    const {name,price,category,quantity} = obj;
    return (`Por el precio de ${price} te puedes llevar ${quantity} ${name}. ${name} pertenece a la categoria de ${category}.`);
}
console.log(showDescription(product));

/*
45. 👨‍👩‍👧 User List
Create an array containing multiple user objects.
Each user should have information such as:
name
age
Your program should go through the users and display their names.
*/
function nameDisplayer(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid Array';
    if(arr.some(obj=>isInvalidObject(obj))) return 'Please enter valid Objects in the array';
    return arr.map(({name})=> name);
}
console.log(nameDisplayer(usrMker(users)));

/*
46. 🏆 Find Highest-Scoring Student
Create an array containing multiple student objects.
Each student should have:
name
score
Your program should determine which student has the highest score.
*/
function highestGrade(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid Array';
    if(arr.some(obj=>isInvalidObject(obj))) return 'Please enter valid Objects in the array';
    /* let highest = 0;
    let student = '';
    for(let obj of arr){
        const {name, grade} = obj;
        if(grade > highest){
            highest = grade;
            student = name;
        }
    }
    return student; */
    const topStudent = arr.reduce((highest, curr)=>highest.grade>curr.grade?highest:curr,arr[0]);
    return topStudent.name;
}
console.log(highestGrade(sSMker(students)));


/*
47. 💰 Calculate Shopping Cart
Create an array containing multiple product objects.
Each product should have at least:
name
price
quantity

Calculate the total cost of everything in the cart.
For example, buying 3 items that cost $10 each should contribute $30 to the total.
*/
function shoppingCart(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 'Please enter a valid Array';
    if(arr.some(obj=>isInvalidObject(obj))) return 'Please enter valid Objects in the array';
    return arr.reduce((acc,{price,quantity})=>acc+(price*quantity),0);
}
console.log(shoppingCart(productmkr(products)));

const character1 = {
    name: 'Shadow Night',
    'character class': 'Assassin', 
    health: 100,
    strength: function(){
        return 20 * this.level; 
    },
    mana: 50,
    level: 1,
    weapon: 'dagger',
    attack: function (enemy) {
        if(enemy.health < 0){
            console.log(`${enemy.name} has been defeated.`) 
            return;
        } 
        console.log(`Your opponent's HP is ${enemy.health}`);
        enemy.health -= this.strength();
        console.log(`${this.name} has done ${this.strength()} damage. HP is now ${enemy.health}`);
    },
    use: function (obj){
        if(obj.toLowerCase() === 'potion' && this.inventory.Potion >= 1){
            if(this.health >= 80 && this.health < 100) {
                this.inventory.Potion-=1;
                console.log(this.name + ' has recovered his health')
                return this.health = 100;
            }
            else if(this.health < 80 ) {
                this.inventory.Potion-=1;
                console.log(this.name + ' has recovered his health')
                return this.health += 20;
            }
            else if(this.health === 100) {
                console.log(this.name + " already has Full health");
                return;    
            } 
        }
    },
    inventory: {
        Potion: 5,
        dagger: 1,
    }
}

class Monster {
    constructor(monsterType, health, level, strength){
        this.monsterType = monsterType;
        this.health = health;
        this.level = level; 
        this.strength = strength;
    }
    attack(enemy) {
        if(enemy.health === 0){
            console.log(`${enemy.name} has been defeated.`) 
            return;
        }
        console.log(`Your opponent's HP is ${enemy.health}`);
        enemy.health -= this.strength;
        console.log(`${this.monsterType} has done ${this.strength} damage. HP is now ${enemy.health}`);
    }
}

const goblin1 = new Monster('Goblin',60,1,10);
const dragon = new Monster('Dragon', 200, 5, 40);

function fight(opponent1, opponent2){

    while(opponent1.health > 0 && opponent2.health > 0){
        // Opponent 2 turn 
        // Opponent 2 attacks
        opponent2.attack(opponent1);
        if(opponent1.health <= 0){
            console.log(`${opponent2.monsterType} has won the fight!`)
            return;
        } 

        // Opponent 1 turn 
        // Opponent 1 Attacks
        opponent1.attack(opponent2);
        if(opponent2.health <= 0){
            console.log(`${opponent1.name} has won the fight!`)
            return;
        }
         if(opponent1.health < 50){
            opponent1.use('potion');
        }
    }
}

// fight(character1,goblin1);
// fight(character1,dragon);
