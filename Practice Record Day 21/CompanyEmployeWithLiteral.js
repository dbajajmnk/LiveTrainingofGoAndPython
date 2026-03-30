let personBehaviour={
    speak:function(name){
        console.log(name," can speak");
 
    }
}
let employee={
    name:"Avichal",
    age:2,
    work:function(){
        console.log(this.name,"working like Manager")
    }
}
employee.__proto__ = personBehaviour
let developer = {
    role:"software architect"
 
}
developer.__proto__=employee
console.log(developer.name);
developer.speak("Avichal");
developer.work();