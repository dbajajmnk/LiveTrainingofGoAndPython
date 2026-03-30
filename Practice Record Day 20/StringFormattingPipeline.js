

function toLower() {
    return function(str) {
        return str.toLowerCase();
    };
}

function trim() {
    return function(str) {
        return str.trim();
    };
}

function capitalize() {
    return function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
}

function addPrefix() {
    return function(str) {
        return "Hello, " + str;
    };
}

// pipeline creator

function createPipeline(functions) {
    return function(input) {
        let result = input;

        for (let i = 0; i < functions.length; i++) {
            result = functions[i](result);
        }

        return result;
    };
}

// compose functions

let formatter = createPipeline([
    trim(),
    toLower(),
    capitalize(),
    addPrefix()
]);



let output = formatter("   aVICHAL tiwari   ");

console.log(output);