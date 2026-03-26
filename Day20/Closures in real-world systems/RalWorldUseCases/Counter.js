function counter(){
    let counter =0;
    return {
        increment(){
            counter++;
            return counter;
        },
        decrement(){
            counter--;
            return counter;
        },
        reset(){
            counter=0;
            return counter;
        }
    }


}
let examcounter = counter();
console.log(examcounter.increment());
console.log(examcounter.increment());
console.log(examcounter.increment());
console.log(examcounter.decrement());
console.log(examcounter.reset());