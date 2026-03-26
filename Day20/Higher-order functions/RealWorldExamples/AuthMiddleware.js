// //Assume you have different function
// //Create
// //Read
// //Update
// //Delete
// //User types
//     - Admin all rights
//     - User Read 
//     - Editor Read and Update
//     - Manager Read,Delete,Update



let user = {name:"Deepak",phoen:"9323243434444",type:"Admin"}
function update(id,user){
    console.log("User update with Id",id,user)

}
function deleteUser(id){
console.log("User Deleted with Id")
}
function create(user){
console.log("User Created",user)
}
function read(){
    console.log("User read")
}


function authnication(user,fn,...arg)
{
    let response;
    if (user.type==="Admin") return fn(arg)
    if (user.type=="Manager" && fn.name!=="crate") {
        return fn(arg)
    }else{
     response="Sorry you can do Create opearation with role"+user.type;
    }
    if (user.type=="User" && fn.name==="crate") 
        {
            return fn(arg)
        }
    else{
        response="Sorry you can do"+fn.name+"opearation with role"+user.type;
    }
    return response;
}


