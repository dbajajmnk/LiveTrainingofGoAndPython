function outer(x) {
    return function(y){
        return x*y;
    }

    
}

let testngDouble = outer(10);
console.log(testngDouble);
