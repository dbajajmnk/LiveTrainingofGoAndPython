function printArrayElements(arr) {
    arr.forEach(function(item, index) {
        console.log("Index:", index, "Value:", item);
    });
}

// Calling the function
printArrayElements([10, 20, 30, 40]);