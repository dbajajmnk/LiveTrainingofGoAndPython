// let timeoutfunction=(delay)=>{
//     return new Promise((resolve)=>{
//         setTimeout(fn,delay);
//         resolve(`Resolve after ${delay} ms`);
//     })
// };
// let fn1=()=>console.log("Function executed after timeout");
// timeoutfunction(fn1,2000).then((res)=>{
//     console.log(res);
// });

let timeoutfunction = (fn, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fn(); // execute the function after delay
            resolve(`Resolved after ${delay} ms`);
        }, delay);
    });
};

let fn1 = () => console.log("Function executed after timeout");

timeoutfunction(fn1, 2000).then((res) => {
    console.log(res);
});