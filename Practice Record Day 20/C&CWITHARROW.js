let multiply=a=>b=>c=>a*b*c;
console.log("ARROW MULTIPLY",multiply(1)(2)(3));
const total=(a,b)=>a+b;
const applyTax=(total)=>total+10;
const payableAmount=(total)=>total-100;
console.log(payableAmount(applyTax(total(100,500))));

