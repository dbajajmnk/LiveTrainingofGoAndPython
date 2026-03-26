
function total(a,b){
    return a+b;
}
function applyTax(total){
    return total+10;
}
function payableAmount(total){
    
    return total-100
}

console.log(payableAmount(applyTax(total(100,500))))