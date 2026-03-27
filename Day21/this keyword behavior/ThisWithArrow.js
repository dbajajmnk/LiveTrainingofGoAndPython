// let testThis =()=>{
//     console.log("Outer Arrow function",this);
//     return ()=>console.log("Inner arrow function",this);
// }
// testThis()();

let user = {
    name:"Deepak",
    age:25,
    greet:()=>{
        console.log("Arrow",this);
        console.log(`Hello ${this.name}`)
    }
}

let user2= {
    name:"Deepak",
    age:25,
    greet:function (){
        console.log("Normal Funciton",this);
        console.log(`Hello ${this.name}`)
    }
}
user2.greet();
user.greet();
