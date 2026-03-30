function outer() {
    let counter = 0;

    function inner() {
        counter++;
        console.log(counter);
    }

    return inner; // ✅ FIX: return function, not function call
}

const counter = outer(); // ✅ FIX: use const and avoid global overwrite

counter();   
counter();
counter();