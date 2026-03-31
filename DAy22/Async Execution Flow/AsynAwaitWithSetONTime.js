async function test(){
    console.log("Start");
    new Promise(resolve=>setTimeout(resolve,2000))
    console.log("End")
}
test();
