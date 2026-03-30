function printEvenNumbers(limit) {
    let i = 1;

    while (i <= limit) {
        if (i % 2 === 0) {
            console.log("Even:", i);
        }
        i++;
    }
}

// Calling the function
printEvenNumbers(10);