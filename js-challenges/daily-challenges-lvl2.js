// Write an async function named getMessage() that waits for a short delay 
// before returning the message "Hello, JavaScript!".


// Variables
const isUserLogged = true;
const msg = "Hello, Javascript!";
const userName = 'scriptslayingSage';

// API Calls
const user1URL = 'https://jsonplaceholder.typicode.com/users/1';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const userIdURL = 'https://jsonplaceholder.typicode.com/posts?userId=1';

// Objects
const scores = {
    student1: 60,
    student2: 80
}
const profiles = {
    profile1: {
        name: 'Alex',
        age: 25,
        country: 'Dominican Republic'
    },
    profile2: {
        name: 'Maria',
        age: 25,
        country: 'Dominican Republic'
    },
    profile3: {
        name: 'Jessica',
        age: 24,
        country: 'Puerto Rico'
    },
    profile4: {
        name: 'Francisco',
        age: 27,
        country: 'Italy'
    }
}

let displayData = (data) => {
    function getData(info){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(info);
            },2000)
        })
    }
    async function fetchingData() {
        try{
            const fetchedData = await getData(data);
            console.log(fetchedData);
        } catch(err){  
            console.log(err);
        }
    }
    fetchingData()
}
// displayData(msg);

async function checkLogin (signed){
    try{
        const isLoggedIn = await new Promise(()=>{
            setTimeout(()=>{
                if(signed) {
                    console.log('Welcome Back');
                } else if (!signed) {
                    console.log('Please log in');    
                };
            },1000);
        })
        console.log(isLoggedIn);
    } catch(err){
        console.log(err);
    }
}
// checkLogin(isUserLogged);

async function loadProfile(api){
    try{
        const fetchingProfiles = await new Promise((res,rej)=>{
            setTimeout(() => {
                res(api);
            }, 1500);     
        })
        console.log(fetchingProfiles.profile1);
    } catch(err){
        console.log(err);
    }
}
// loadProfile(profiles);

function displayScore(){
    function getScore (scr){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject(new Error('No scores found!'));
                resolve(scr);
            },1000);
        })
    }
    const fetchScore = async ()=>{
        try{
            if (getScore()){
                const fetchedScores = await getScore(scores);
                console.log('Scores were found! Student 1 score is: ' + fetchedScores.student1);
            }
        }catch(err){
            console.log(`There's been an error obtaining the scores. ${err.message}`);
        }
    }
    fetchScore()
}
// displayScore();

async function getUsername(){
    const username = await new Promise ((res,rej)=>{
        setTimeout(()=>{
            res(userName);
        },1000)
    })
    return username;
}
async function getWelcomeMessage(){
    try {
        const value = await getUsername();
        console.log(`Welcome back, ${value}!`)
    } catch (error) {
        console.log(error);
    }
}
// getWelcomeMessage();

/*
Fetch one user
Request https://jsonplaceholder.typicode.com/users/1.
Requirements:
    • Use fetch() inside an asynchronous function.
    • Convert the response to JSON. 
    • Display the user's name, email, and city.
Expected result: You see the information for one sample user in the console.
*/

async function fetchUser(){
    try{
        const userResponse = await fetch(user1URL); // Fetches user from the API 
        // It checks if the reponse was ok from the API
        if(!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`); 
        const userData = await userResponse.json(); // Converts API info from Json to JS
        const {name, email, address:{city}} = userData; // Gets the specific data needed
        console.log(name, email, city); // Displays specific user's info
    }catch(err){
        console.log('Fetch error:', err); // Displays the Error in case of failure 
    }
}
// fetchUser();

async function fetchUsers(){
    try{
        const usersResponse = await fetch(usersURL);
        if(!usersResponse.ok) throw new Error(`HTTP error! Status: ${usersResponse.status}`);
        const usersData = await usersResponse.json();
        const specificUserInfo = usersData.map((user)=>{
            const {name,email} = user;
            return {name,email} 
        })
        console.log(specificUserInfo)
    } catch(err){
        console.log('Fetch error',err)
    }
}
// fetchUsers();

async function fetchSpecificUser(){
    try{
        const specificUserRes = await fetch(userIdURL);
        if(!specificUserRes.ok)throw new Error(`HTTP error! Status: ${specificUserRes.status}`);
        const specificUserData = await specificUserRes.json();
        const postsInfo = specificUserData.map(({title})=>{
            return {title}
        })
        console.log(postsInfo);
        console.log(`There are ${postsInfo.length} posts on this user.`)
    }catch(err){
        console.log('Fetch error', err);
    }
}
// fetchSpecificUser();

async function findUserByName(name){
    try {
        const resp = await fetch(usersURL);
        if(!resp.ok) throw new Error(`HTTP Error! Status: ${resp.status}`);
        const data = await resp.json();
        // for(let user of data){
        //     if(user.name.toLowerCase().includes(name.toLowerCase())){
        //         console.log(user);
        //         return;
        //     }
        //}
        const findUser = data.filter((user)=>{
            if(user.name.toLowerCase().includes(name.toLowerCase())){
                return user
            }
        });
        console.log(findUser.length === 0 ? 'No users found with this name.' : findUser); 
    } catch (error) {
        console.log('Fetch error', error);
    }
}
// findUserByName('leanne');

async function fetchedError(){
    try {
        const res = await fetch(user1URL+'.');
        if(!res.ok)throw new Error(`HTTP failed! Status: ${res.status}`);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log('Fetch error', error);
    }
}
// fetchedError();


