function printAndSum(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        console.log("Number:", i);
        sum += i;
    }

    return sum;
}


let result = printAndSum(5);
console.log("Sum is:", result);