function HelloWorld(){
    console.log("Hello Friends");
}
function createUser(name,age,email){

    return {name:name,age:age,email:email}
}

function User(name,age,email){

    this.name=name;
    this.age=age;
    this.email=email;
}
class Student {
    constructor(name){
        this.name=name;
    }
}
const literalObject = {
    name:"Deepak"
}
const user = createUser("Deepak",20,"deepak");
const shinchana= new User("Shinchana",18,'syadav@gmail.com');
const student1= new Student("Deepak");

console.log("User Prototype",user.prototype)
console.log("Literal",literalObject.prototype)
console.log("User Prototype",user.__proto__)
console.log("Literal",user.__proto__)
console.log("Shinchan",shinchana.prototype)
console.log("Shinchana Proto",shinchana.__proto__===User.prototype)
console.log("Studnet",student1.prototype)
console.log("Student1 __proto__",student1.__proto__===Student.prototype)

