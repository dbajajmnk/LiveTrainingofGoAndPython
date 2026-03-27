class  Student{

    constructor(name,age,course){
        this.name=name;
        this.age=age;
        this.course=course;
    }
    study(){
        console.log(this.name,this.age);
    }
}


let avichal = new Student("Avichal",20,"Python");
let anuj = new Student("Anuj",20,"Go");
let kusuma = new Student("Kusuma",20,"JavaScript");

avichal.study();
anuj.study();
kusuma.study();