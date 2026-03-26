function logExecution(name){
    console.log("entering... ",name)

    return function(){
        console.log("exiting... ",name)
    }
}

function a() {
    const exitA = logExecution("A");

    function b() {
        const exitB=logExecution("B");
        exitB();

    }

    b();
    exitA();
}

a();