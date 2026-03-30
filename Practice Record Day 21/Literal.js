let student={
    name:"John",    
    age:21,
    study(){
        console.log(this.name+" is studying");
    }
}
console.log(student.name);
console.log(student.age);

student.study();
