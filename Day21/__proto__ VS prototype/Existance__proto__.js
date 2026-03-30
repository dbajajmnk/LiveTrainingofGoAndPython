function User(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
}

class Student {
    constructor(name) {
        this.name = name;
    }
}

const literalObject = {
    name: "Deepak"
}

const user = createUser("Deepak", 20, "deepak");
const shinchana = new User("Shinchana", 18, 'syadav@gmail.com');
const student = new Student("Deepak");

console.log(user.__proto__);
console.log(literalObject.__proto__);
console.log(shinchana.__proto__);
console.log(literalObject.__proto__);
