function calculator(n1,n2,fn){

    return fn(n1,n2);

}

function add(n1,n2){
    return n1*n2;
}

function substract(n1,n2){
    return n1-n2;
}
function mulitply(n1,n2){
    return n1*n2;
}
function divide(n1,n2){
    return n1/n2;
}
function mode(n1,n2){
    return n1%n2;
}
console.log("Sum",calculator(10,20,add))
console.log("Subtract",calculator(100,20,substract))
console.log("Dvide",calculator(100,20,divide))
console.log("Multiply",calculator(10,20,mulitply))
console.log("Mode",calculator(61,20,mode))