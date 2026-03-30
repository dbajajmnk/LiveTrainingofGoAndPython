let user ={
    name:"Deepak",
    email:"deepak",
    age:10,
    password:"123",
    phone:"9322333333333"
}
//Factory base
function createUser(name,email,age,password,phone){
    return {name:name,
        email:email,
        age:age,
        password:password,
        phone:phone
    }
}
//Constuctor base 
function User(name,email,age,password,phone){
    this.name=name;
    this.email=email;
    this.age=age;
    this.password=password;
    this.phone=phone;
}

function User(name,email,age,password,phone){
    this.name=name;
    this.email=email;
    this.age=age;
    this.password=password;
    this.phone=phone;
}

class UserByClass{

    constructor(name,email,age,password,phone){
    this.name=name;
    this.email=email;
    this.age=age;
    this.password=password;
    this.phone=phone;
    }
}

//Prototype base
User.prototype.displayInfo = function(){
    console.log(`Name: ${this.name}, Email: ${this.email}`);
};
let users=[createUser("Deepak","deepakbajaj79@gmail.com",10,"123","9322333333333"),
    new User("Avichal","avichal@gmail.com",25,"456","9322333333334"),
    new User("Rahul","rahul@gmail.com",30,"789","9322333333335"),
    new UserByClass("Priya","priya@gmail.com",28,"012","9322333333336")];
async function login(user){
        if (user.name=="Deepak" && user.password=="123"){
            return user;
        }
        else {
            throw new Error("Invalid Login Credential")
        }
        
}

async function displayUser(user){
    return users.filter((u)=>u.name==user.name);
};

async function loginAndDisplayUser(user){
    try {
        let loggedInUser = await login(user);
        let userDetails = await displayUser(loggedInUser);
        console.log(userDetails);
    } catch (error) {   
        console.log(error.message);
    }
}
loginAndDisplayUser({name:"Deepak",password:"123"});



let user1 =new User("Deepak","deepak@gmail.com",10,"123","9322333333333");
  