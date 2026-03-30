async function test(){
    console.log("1");
    await Promise.resolve();
    console.log("2");
    await Promise.resolve();
    console.log("3");
    console.log("End");

}
async function test2(){
    console.log("4");
    Promise.resolve().then(()=>{});
    console.log("5");
    Promise.resolve().then(()=>{});
    console.log("6");
    console.log("End");

}
test();
test2();