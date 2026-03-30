function Student(name,age){
    this.name=name;
    this.age=age;

}

let avichal= new Student("Avichal",20);
console.log(avichal.this);
console.log(avichal===avichal.this);
console.log(avichal.age);

