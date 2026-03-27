function total(a, b) {
    return a + b;
}

function applyTax(total) {
    return total + 10;
}

function payableAmount(total) {
    return total - 100;
}

// Composition: total -> applyTax -> payableAmount
console.log(payableAmount(applyTax(total(100, 500)))); 
// Result: 510
