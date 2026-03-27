function createCounter(initialValue = 0) {
    let count = initialValue;

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const myCounter = createCounter(10);
console.log(myCounter.increment()); 
console.log(myCounter.decrement()); 
console.log(myCounter.getCount());  
