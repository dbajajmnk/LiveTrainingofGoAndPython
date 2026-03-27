function processUserInfo(callBack){
    return callBack("Alice");
}
function greet(name){
    return `Hello, ${name}!`;
}
console.log(processUserInfo(greet));