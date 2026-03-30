class Student {
    constructor(name, age, course) {
        this.name = name;
        this.age = age;
        this.course = course;
    }

    study() {
        console.log(this.name, this.age);
    }
}

let avichal = new Student("Avichal", 20, "B.Tech");
avichal.study(); 
