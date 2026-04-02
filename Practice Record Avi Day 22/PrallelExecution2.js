
async function task1(){
    return 1;
}
async function task2(){
    return 2;
}
const r1=task1();
const r2=task2();
async function handlerError(){
    try{
    await r1;
    await r2;
    }
    catch(error){
        console.log(error);
        
    }
}
