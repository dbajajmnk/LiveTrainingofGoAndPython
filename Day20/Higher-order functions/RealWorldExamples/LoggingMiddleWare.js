function add(a,b){
    return a+b
}
function helloWorld(){
    console.log("Hello World")
}

let one =()=>{
    console.log("Hello World")
}

function logging(fn,...arg){
    let startTime = Date.now();
    fn(arg);
    let endtime = Date.now()-startTime;
    console.log(`Funciton ${fn.name}took ${endtime-startTime}`);


}
logging(one);
logging(helloWorld)
logging(add,10,20)