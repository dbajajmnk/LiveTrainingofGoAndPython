// console.log("Starting API call...");
// fetch("api/data").then(response => response.json())
//     .then(data => {
//         console.log("Data received:", data);})
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     }).finally(() => {
//         console.log("Fetch operation completed.");
//     });
// console.log("This will log before the data is received.");


console.log("Starting API call...");
fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
    .then(data => {
        console.log("Data received:", data);})
    .catch(error => {
        console.error("Error fetching data:", error);
    }).finally(() => {
        console.log("Fetch operation completed.");
    });
console.log("This will log before the data is received.");
