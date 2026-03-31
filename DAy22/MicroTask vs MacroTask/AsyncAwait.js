function test() {
  console.log("Start Test");
  Promise.resolve().then(() => {
    console.log("Inside first then");
  });
  console.log("End Test");
}

console.log("Before calling test");
test();
console.log("After calling test");
