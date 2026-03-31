async function test() {
    
}

async function test2() {
    console.log("4");
    Promise.resolve().then(() => {});
    console.log("5");
    Promise.resolve().then(() => {});
    console.log("6");
    console.log("End");
}


test();
test2();