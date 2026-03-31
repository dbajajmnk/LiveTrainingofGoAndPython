let promise1 = new Promise((resolve, reject) => {
    let success = false; // Change this to true to see the resolved
    if (success) {
        resolve("Promise resolved successfully");
    } else {
        reject("Promise rejected");
    }
});

promise1.then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
});
