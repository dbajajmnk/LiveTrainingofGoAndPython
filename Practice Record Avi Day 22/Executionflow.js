async function test(){
    console.log("Test started");
    let result = await Promise.resolve();
    console.log(result);
    console.log("Test Ended");
    
    
}
test();