const { type } = require("node:os");

let user={name:"Alice",phone:"95983009934",type:"admin"};
function update(id,user){

}
function deleteUser(id){
    console.log("user deleted with id");
    

}
function create(user){
    console.log("user created", user);
    

}
function read(id){
    console.log("user read");
    

}
function authentication(user,fn,...args){
    if ( user.type === "admin") return fn(...args)
        else if (user.type === "Manager" && fn.name!=="Create") return fn(arg)
    
}