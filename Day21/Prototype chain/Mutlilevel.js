let living ={
    breath:function (count){
        console.log(count);
    }
}
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
animal.__proto__ = living 
dog.__proto__ = animal
console.log(dog);
dog.eats();
dog.barks();
dog.breath(10);