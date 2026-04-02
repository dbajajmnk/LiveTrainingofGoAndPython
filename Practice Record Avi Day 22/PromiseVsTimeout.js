// console.log("Start");
// setTimeout(()=>{console.log("TimeOut");
// },0)

// Promise().resolve().then(()=>{
//     console.log("Promise Results");
// })
// console.log("End");

console.log("Start");

setTimeout(() => {
    console.log("TimeOut");
}, 2000);

// Correct way
Promise.resolve().then(() => {
    console.log("Promise Results");
});
console.log("End")