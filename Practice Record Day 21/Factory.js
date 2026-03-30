const Student=(name,age,course)=>{
    return {
        name,
        age,
        course,
        study(){
            console.log(this.name+" is enrolled in "+this.course+" at age "+this.age);
        }
    };
};

let avichal=Student("Avichal",21,"MBA");
let ansari=Student("Ansari",20,"MBA");
let rahul=Student("Rahul",22,"MBA");
avichal.study();
ansari.study();
rahul.study();