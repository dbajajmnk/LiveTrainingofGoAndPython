/**
 * Step
 * token 
 * Decode Token
 * validate your information 
 * Authenticate user
 */

const userToken = {name:"Deepak",email:"deepak@gmail.com",password:"12345",key:"122q4arewe"}
const authMiddleWare=token=>decode=>validate=>login=>{
    let userInformaiton = delete token[decode]
    console.log("UserInformation",token);
    console.log("Validation",validate);
    //consoel.log("Login",login);
    if (token.name===validate.name && token.email===login.email && token.password===login.password)
    {
        return "Login Successfully Done";
    }
    else{
        return "Sorry! Wrong Token or User Credentials";
    }
}
console.log(authMiddleWare(userToken)("key")({name:"Deepak",email:"deepak@gmail.com",password:"12345"})({name:"Deepak",email:"deepak@gmail.com",password:"12345"}))