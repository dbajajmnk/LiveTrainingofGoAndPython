function greet(){
    console.log("Hello",this.name);
}
// let user = {name:"Sunny"};
// greet.call(user);

// function greet(city,country){
//     console.log("Hello",this.name,city,country);
// }

let user = {name:"Sunny"};
const bindgreet=greet.bind(user);
bindgreet();

// greet.apply(user,["Delhi","India"])