 function Student(name,age){
    this.name=name;
    this.age=age;
}
Student.prototype.study = function(){
    console.log(this.name,this.age);
}

let avichal = new Student("Avichal",20);
let anuj = new Student("Anuj",20);
let kusuma = new Student("Kusuma",20);

avichal.study();
anuj.study();
kusuma.study();