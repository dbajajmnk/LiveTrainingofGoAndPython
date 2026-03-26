function outer(){
    let greet="Hello Friends";

    function inner(){
        console.log(greet);
    }
return inner;
}
let fn=outer();
fn();
