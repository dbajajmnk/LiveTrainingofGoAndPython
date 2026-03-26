// function add(a){
//     return function (b){

//         return function (c){
//             return a+b+c
//         }
//     }
// }


// const test = add(10)
// test2=test(20)
// console.log(test2(30))
// console.log(add(10)(20)(30))

let multiply=a=>b=>c=> a*b*c;
console.log("Arrow Multiply",multiply(1)(2)(3))
const total=(a,b)=>a+b;
const  applyTax=(total)=>total+10;
const payableAmount=(total)=> total-100
console.log(payableAmount(applyTax(total(100,500))))