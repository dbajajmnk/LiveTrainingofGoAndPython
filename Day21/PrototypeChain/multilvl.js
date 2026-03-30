let living = {
    isAlive: function() {
        console.log("I am breathing...");
    }
};

let animal = {
    eats: function() {
        console.log("eat");
    }
};

animal.__proto__ = living;

let dog = {
    barks: function() {
        console.log("bark");
    }
};

dog.__proto__ = animal;

dog.barks();
dog.eats();
dog.isAlive();
