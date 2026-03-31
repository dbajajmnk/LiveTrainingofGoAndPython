async function test()
{
    return "Hello";
}
test().then(console.log)
let result = await test();
console.log("Promise Result",result);
