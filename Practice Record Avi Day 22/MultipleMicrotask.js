Promise.resolve().then(()=>{
    console.log("Microtask 1");
});
setTimeout(()=>{
    console.log("Macrotask 1");
},0);
Promise.resolve().then(()=>{
    console.log("Macrotask 2");
});