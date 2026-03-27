// 1. Create a `mobile` object using object literal
// 2. Create three `student` objects using factory function
// 3. Create five `employee` objects using constructor function
// 4. Add shared `work()` method using prototype
// 5. Convert same constructor code into class syntax

const mobile = {
    company:"Lava",
    model:"Lava2",
    price:2000,
    color:"red",
    makeCall:function(){
        return "I am able to make call";
    },
    ring:function(){
return "I am able to ring";
    }
}

function student(name,age,course){
    
    return {
    name:name,
    age:age,
    course:course,
    makeCall:function(){
        return "I am able to make call";
    },
    ring:function(){
return "I am able to ring";
    }
}
}

function Employee(name,age,department){
    this.name=name;
    this.age=age;
    this.department=department;

    this.markAttendance=function(){
        return "I marked attedance twice a day";
    },
    this.doWork=function(){
return "I am doing my work";
    }

}

function EmployeeProtoye(name,age,department){
    this.name=name;
    this.age=age;
    this.department=department;
}

 EmployeeProtoye.prototype.markAttendance=function(){
        return "I marked attedance twice a day";
    },
Employee.prototype.doWork=function(){
return "I am doing my work";
    }
class EmployeeWithClass{

    
    constructor(name,age,department){
    this.name=name;
    this.age=age;
    this.department=department;
    }
    markAttendance=function(){
        return "I marked attedance twice a day";
    }
    doWork=function(){
return "I am doing my work";
    }

}
let avichal = student("Avichal",20,"Java");

let emp1 = new Employee("Avichal",20,"Java");
let emp2 = new Employee("Avichal",20,"Java");
let emp3 = new EmployeeWithClass("Avichal",20,"Java");
console.log(avichal.name);
console.log(emp1.name);
console.log(emp2.doWork());
console.log(emp3.doWork());
console.log(mobile.company);
