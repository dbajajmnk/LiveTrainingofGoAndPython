console.log("Start 1");
setTimeout(() => {console.log(2)}, 0);
Promise.resolve().then(() => {console.log(3)});
Promise.resolve().then(() => {console.log(4)});
console.log("End 5");
