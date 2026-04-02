function loop(){
    Promise.resolve().then(()=>{
        console.log("Microtask executed");
        loop();
    });

}
loop();