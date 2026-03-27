"use strict"
let user = {
    name:"Deepak",
    age :20,
    speak:function (){
        console.log(this,this.name,this.age)

    }
}
user.speak();