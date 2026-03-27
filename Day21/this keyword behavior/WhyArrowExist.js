const user = {
  name: "Deepak",
  greet() {
    const inner = () => {
      console.log("Arrow Fix",this.name);
    };
    inner();
  }
};

const user1 = {
  name: "Deepak",
  greet() {
    function inner() {
      console.log("Normal",this.name);
    }
    inner();
  }
};

user1.greet();

user.greet();