function outer(){
    let counter=0;

    function inner(){
        counter++;
        console.log(counter);
    }

    return inner;

}

counter = outer()
counter()
counter()
counter()