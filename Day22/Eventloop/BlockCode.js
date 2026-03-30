console.log("Start");
setTimeout(() => {
    console.log("Inside setTimeout");
}, 0);
for (let i = 0; i < 1000000000; i++) {
    // Some heavy computation
}

console.log("End");