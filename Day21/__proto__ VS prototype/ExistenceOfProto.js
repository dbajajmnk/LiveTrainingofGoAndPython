function HelloWorld(){
}

function createUser(name, age, email){
    return {name: name, age: age, email: email}
}

function User(name, age, email){
    this.name = name;
    this.age = age;
    this.email = email;
}

const user = createUser("Deepak", 20, "deepak");

console.log(HelloWorld.prototype);
console.log(createUser.prototype);
console.log(User.prototype);
