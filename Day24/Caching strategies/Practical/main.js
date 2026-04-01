const cache = {};
const url = "https://jsonplaceholder.typicode.com/todos/1"
async function cacheAPI(url) {
    if(cache[url]){
        console.log("Data from cache");
        return cache[url];
    }
    else{
        console.log("Data from Server");
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        cache[url] = data;
        return data;
    } 
}
let test=async(url)=>{
const result = await cacheAPI(url);
console.log("Result",result);
}
await test(url);

const cacheWithExpiry = {};

function cacheAPIWithExpiry(key,value){
    if(cacheWithExpiry[key] && cacheWithExpiry[key].expiry > Date.now()){
        
            console.log("Data from cache");
            return cacheWithExpiry[key].data;
        }
        else{
            console.log("Cache expired, fetching new data");
               delete cacheWithExpiry[key];
               cacheWithExpiry[key] = {
                data:value,
                expiry:Date.now() + 5000 // Cache expires in 5 seconds
            };
            return cacheAPIWithExpiry;
        }
    }

    console.log(cacheAPIWithExpiry("user1","Data for user1")); // Cache expired, fetching new data
    console.log(cacheAPIWithExpiry("user1","Data for user1")); // Data from cache
    setTimeout(() => {
        console.log(cacheAPIWithExpiry("user1","Data for user1"))},8000); // Cache expired, fetching new data          
