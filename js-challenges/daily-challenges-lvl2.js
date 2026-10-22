// Write an async function named getMessage() that waits for a short delay 
// before returning the message "Hello, JavaScript!".

const isUserLogged = true;
const msg = "Hello, Javascript!";
const userName = 'scriptslayingSage';
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
