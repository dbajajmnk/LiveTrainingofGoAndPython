function calculator(n1,n2,operation){
    return operation(n1,n2);
}
function subtract(n1,n2){
    return n1-n2;
}
function add(n1,n2){
    return n1+n2;
}
function multiply(n1,n2){
    return n1*n2;
}
function divide(n1,n2){
    return n1/n2;
}
function mod(n1,n2){
    return n1%n2;
}
console.log("Sum",calculator(10,20,add));
console.log("Subtract",calculator(10,20,subtract));
console.log("Multiply",calculator(10,20,multiply));
console.log("Divide",calculator(10,20,divide));
console.log("Modulo",calculator(10,20,mod));

