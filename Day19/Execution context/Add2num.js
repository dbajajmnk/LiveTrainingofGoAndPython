function addTwoNum(a,b) {
    var sum=a+b;
    multiply(sum,b)
}

function multiply(sum, secondNumber) {
    var result=sum*secondNumber;
    divide(result, secondNumber)
}

function divide(multi,secondNumber) {
    const result=multi/secondNumber;
    console.log(`${multi}/${secondNumber}=${result}`)
}



addTwoNum(50,10)