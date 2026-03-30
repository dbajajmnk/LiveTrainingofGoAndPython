let user = {
  name: "Deepak",
  age: 25,
  greet() {
    console.log(this);
    console.log(`Hello ${this.name}`);
  }
};

user.greet();
