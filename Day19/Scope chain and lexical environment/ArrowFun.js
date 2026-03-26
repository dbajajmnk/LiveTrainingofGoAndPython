findGreaterNumber(110, 90, 30);
findGreaterNumberWithTernary(110, 990, 1030);

function findGreaterNumber(a, b, c) {
    if (a > b && a > c) {
        print("A is Greater", a);
    } else if (b > c) {
        print("B is Greater", b);
    } else {
        print("C is Greater", c);
    }
}

function findGreaterNumberWithTernary(a, b, c) {
    a > b ? (a > c ? print("A is Greater", a) : print("C is Greater", c)) 
          : (b > c ? print("B is Greater", b) : print("C is Greater", c));
}

function print(...a) {
    console.log(a);
}


const printATableofNumber = (num) => {
    for (let i = 1; i <= 10; i++) {
        print(`${num} x ${i} = ${num * i}`);
    }
};

function sumOfArgument(...a) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    print("Sum", sum);
}

function print(...a) {
    console.log(a);
}


sumOfArgument(10, 20, 30, 30); 
printATableofNumber(5);






const findGreater = (a, b) => a > b ? a : b;
    // return a > b && a > c ? a : (b > c ? b : c);
      


const sqrRoot =a => a*a;

console.log(findGreater(50, 20));
console.log(sqrRoot(5));
