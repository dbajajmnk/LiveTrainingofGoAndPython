async function test(){
    console.log("Test Started");
   let  result =await Promise.resolve("Hello"); 
   console.log(result);
   console.log("Test Ended"); 
}
test();
