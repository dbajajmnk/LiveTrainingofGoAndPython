async function test(){
    console.log("Inside test");
    await Promise.resolve("Resolved").then((res)=>{ 
        console.log(res);
    });
    console.log("After test completion")
}
console.log("Start");
test();
console.log("End");