let promise1 = new Promise((resolve, reject) => {
    let success = false;
    if(success) {
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