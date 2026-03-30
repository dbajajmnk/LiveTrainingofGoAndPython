function Student(name,age,course){
    
        this.name=name,
        this.age=age,
        this.course=course,
        this.study=function(){
            console.log(this.name+" is enrolled in "+this.course+" at age "+this.age);
        }
    };

let avichal=new Student("Avichal",21,"MBA");
let ansari=new Student("Ansari",20,"MBA");
let rahul=new Student("Rahul",22,"MBA");
avichal.study();
ansari.study();
rahul.study();