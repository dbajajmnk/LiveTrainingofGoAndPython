function outer(x){
    
    return function(y){
        return x*y;
    }
    
}

let testingDouble = outer(10);
console.log(testingDouble(20));

let testingDouble3 = outer(5);
console.log(testingDouble3(4));