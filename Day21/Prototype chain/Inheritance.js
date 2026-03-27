let animal = {
    eats:function (){
        console.log("eat")
    }
}
let dog = {
    barks:function (){
        console.log("bark")
    }
}
dog.__proto__ = animal

dog.eats();
dog.barks();