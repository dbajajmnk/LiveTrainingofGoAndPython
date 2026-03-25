let x=10;

function shadowing(){
    x=20;
    console.log(x);
}
shadowing();
console.log(x);