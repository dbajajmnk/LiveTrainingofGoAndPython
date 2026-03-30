const mobile = {
    company: "Lava",
    model: "Lava galaxy 2",
    price: 12000,
    color: "red",

    makeCall: function () {
        return "I am making a call";
    },

    ring: function () {
        return "I can receive the call";
    }
};

console.log(mobile.company);
console.log(mobile.makeCall());


// Factory Function
function student(name, age, course) {
    return {
        name: name,
        age: age,
        course: course,

        makeCall: function () {
            return "I am making a call";
        },

        ring: function () {
            return "I can receive the call";
        }
    };
}

// ✅ Create objects using function
const student1 = student("Avi", 22, "B.Tech");
const student2 = student("Rahul", 20, "BCA");

console.log(student1.name);
console.log(student1.makeCall());

console.log(student2.name);
console.log(student2.ring());