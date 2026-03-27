let personBehaviour ={
    speak:function(name){
        console.log("I am can Speak",name);
    }
}
let employee ={
    name:"Deepak",
    age:20,
    work:function(){
        console.log(this.name,"Working as leader")
    }
}
employee.__proto__= personBehaviour

let developer = {
    role:"Software Architect"

}
developer.__proto__=employee

console.log(developer.name);
developer.speak("Deepak");
developer.work();
