const cache = {};
const url = "https://jsonplaceholder.typicode.com/todos/1";

async function cacheAPI(url) {
  if (cache[url]) {
    console.log("Data from cache");
    return cache[url];
  } else {
    console.log("Data from Server");
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();
    cache[url] = data;
    return data;
  }
}

let test = async (url) => {
  const result = await cacheAPI(url);
  console.log("Result", result);
};

await test(url);
