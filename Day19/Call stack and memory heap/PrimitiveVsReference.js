var a=10;
const user= {name:"Deepak"}

function test(a,user)
{
    a=20;
    user.name="Avichal";
}

test(a,user);
console.log(a);
console.log(user)