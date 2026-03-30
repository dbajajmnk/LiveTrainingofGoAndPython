function loop() {
Promise.resolve().then(() => {
    console.log("Microtask executed");
    loop(); // Recursively call to create an infinite chain of microtasks
});
}
loop(); // Start the infinite microtask loop
