async function test() {
    console.log("Inside test");
    await Promise.resolve("Reswolved").then((res)=>{
        console.log(res);
        
    })
    
}