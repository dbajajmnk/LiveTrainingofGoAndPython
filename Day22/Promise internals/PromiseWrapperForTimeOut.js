let timoutfunction = (fn,delay) => {
    return new Promise((resolve) => {
        setTimeout(fn, delay);
        resolve(`Resolved after ${delay} ms`);
    })};


let fn1=() => console.log("Function executed after timeout");
timoutfunction(fn1, 2000).then((res) => {
    console.log(res);
});