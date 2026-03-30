function greet(city,country){
    console.log("Hello",this.name,city,country);
    
}
let user = {name:"Avichal"};
// greet.apply(user,["Delhi","India"])
const boundgreet = greet.bind(user);
boundgreet();