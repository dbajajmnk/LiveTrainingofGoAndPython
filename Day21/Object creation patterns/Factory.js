 function student(stname,stage){
    
    return {
    name:stname,
    age:stage,
    study:()=>{console.log(this.name)}
    }
}

let avichal = student("Avichal",20);
let anuj = student("Anuj",20);
let kusuma = student("Kusuma",20);

avichal.study();
anuj.study();
kusuma.study();