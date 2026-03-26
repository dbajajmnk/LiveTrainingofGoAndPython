var a=10;
const user={name:"Yunus"}
 
function test(a,user){
    a=20;
    user.name="John";
}
 
test(a,user);
console.log(a); 
console.log(user.name); 