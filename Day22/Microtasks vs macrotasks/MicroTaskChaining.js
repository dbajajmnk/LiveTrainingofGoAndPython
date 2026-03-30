console.log("Starting promise chain...");
Promise.resolve()
    .then(() => {
        console.log("First then");
        return "Data from first then";
    }).then(data => {
        console.log("Second then received:", data);
        return "Data from second then";
    }).then(data => {
        console.log("Third then received:", data);
    }).catch(error => {
        console.error("Error in promise chain:", error);
    }).finally(() => {
        console.log("Promise chain completed.");
    });
console.log("This will log before the promise chain completes.");