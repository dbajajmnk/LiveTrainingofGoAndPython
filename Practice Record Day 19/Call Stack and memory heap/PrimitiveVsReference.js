var a=10;
const user={name:"Deepak"}

function test(a,user){
    a=20;
    user.name="John";
}

test(a,user);
console.log(a); // 10
console.log(user.name); // {name: "John"}