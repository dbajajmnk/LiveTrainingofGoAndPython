function calculator(n1, n2, fn) {
    return fn(n1, n2);
}

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function modulo(n1, n2) {
    return n1 % n2;
}

console.log(calculator(10, 5, add));
console.log(calculator(10, 5, subtract));
console.log(calculator(10, 5, multiply));
console.log(calculator(10, 5, divide));
console.log(calculator(10, 3, modulo));
