const user = {name:"",email:"",passWord:"",isAdmin:false,phone:""}
const email = document.getElementById("uemail");
const passWord = document.getElementById("upassword");
const isAdmin = document.getElementById("admin");
const name = document.getElementById("uname");
const phone = document.getElementById("phone");
const resetButton = document.getElementById("reset");
const submitButton = document.getElementById("submit");



resetButton.addEventListener("click",(e)=>{
    e.preventDefault();
  
   email.value="";
   passWord.value="";
   name.value="";
   phone.value="";
   isAdmin.checked=false;
   

})
submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
  
    user.email = email.value;
   user.passWord=passWord.value;
   user.name=name.value;
   user.phone = phone.value;
   user.isAdmin = isAdmin.checked;
    if(user.email==="")
    {
        alert("Email is required");
    }
    else if (user.passWord==="")
    {
        alert("Password is required");
    }

    createUserCard(user);

    

})

function createUserCard(user){
    const elementP = document.createElement("p");
    Object.keys(user).forEach((value)=>{
        elementP.append(user[value])
    }
    )
    const pageBody= document.getElementsByTagName("body");
    pageBody[0].append(elementP);
    


}