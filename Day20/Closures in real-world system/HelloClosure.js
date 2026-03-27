function outer(){
    let greet="Hello frnssss"

    function inner() {
        console.log(greet);
        
    }
    return inner;
}

let fn=outer();
fn();