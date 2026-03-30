function Dog(name, age, color, breed) {
    this.name = name;   
    this.age = age;
    this.color = color;
    this.breed = breed;
}


Dog.prototype.bark = function () {
    console.log(this.name);
};

let dog1 = new Dog("jacky", 2, "black", "german");

dog1.bark();