let personBehaviour={
    speak:function(name){
        console.log("I  can speak",name);
 
    }
}
let employee={
    name:"harry",
    age:2,
    work:function(){
        console.log(this.name,"working as magicain")
    }
}
employee.__proto__ = personBehaviour
let teacher = {
    role:"magician"
 
}
teacher.__proto__=employee
console.log(teacher.name);
teacher.speak("english");
teacher.work();