function processUserInfo(name,callBack){

    return callBack(name);
}
function greet(name){

    return `Hello ${name}`;
}

console.log(processUserInfo("Deepak",greet))
console.log(processUserInfo("Avichal",greet))
console.log(processUserInfo("Piyush",greet))
console.log(processUserInfo("Navya",greet))
