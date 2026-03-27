function Dog(name,age,color,breed) {
    this.name=name;
    this.age=age;
    this.color=color;
    this.breed=breed;
}

Dog.prototype.bark = function (){ console.log(this.name)};

let dog1 = new Dog("Jacky",2,"Black","German");
dog1.bark();

