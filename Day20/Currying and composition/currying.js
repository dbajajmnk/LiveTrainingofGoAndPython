function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

const test = add(10);
const test2 = test(20);

console.log(test2(30)); // Outputs: 60
console.log(add(10)(20)(30)); // Outputs: 60
