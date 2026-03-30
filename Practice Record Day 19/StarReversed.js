const readline = require("readline");

function reversePattern(n) {
    for (let i = n; i >= 1; i--) {
        let row = "";

        for (let j = 1; j <= i; j++) {
            row += "*";
        }

        console.log(row);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter number of rows: ", (n) => {
    reversePattern(Number(n));
    rl.close();
});