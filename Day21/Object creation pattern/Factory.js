let student = function(name, age) {
    return {
        name: name,
        age: age,
        study: function() {
            console.log(this.name);
        }
    };
};

let yunus = student("yunus", 20);
let aman = student("aman", 21);

aman.study();  
yunus.study(); 
