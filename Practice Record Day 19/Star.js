const readline = require("readline");

function printPattern(n) {
    for (let i = 1; i <= n; i++) {
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
    printPattern(Number(n));
    rl.close();
});
