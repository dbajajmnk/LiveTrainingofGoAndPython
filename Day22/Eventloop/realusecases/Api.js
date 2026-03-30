// console.log("Starting API call...");
// fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
//     .then(data => {
//         console.log("Data received:", data);})
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     }).finally(() => {
//         console.log("Fetch operation completed.");
//     });
// console.log("This will log before the data is received.");


async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data received with async/await:", data);
    } catch (error) {
        console.error("Error fetching data with async/await:", error);
    } finally {
        console.log("Async/await fetch operation completed.");
    }
}

fetchData("https://jsonplaceholder.typicode.com/posts");