async function test()
{
    return "Hello";
}
async function test1()
{
    return Promise.resolve("Hello from Explicit");
}
test().then(console.log)
let result = await test1();
console.log("Promise Result",result);