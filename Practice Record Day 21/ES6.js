class Student{
    
        constructor(name,age,course){
            this.name=name;
            this.age=age;
            this.course=course;
        }
        study(){
            console.log(this.name,this.age);
            
        }
        
    }

let avichal=new Student("Avichal",21,"MBA");
let ansari=new Student("Ansari",20,"MBA");
let rahul=new Student("Rahul",22,"MBA");
avichal.study();
ansari.study();
rahul.study();