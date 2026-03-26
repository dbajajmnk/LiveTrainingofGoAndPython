let students = ["Deepak","Avichal","Piyush","Kusuma"]
let studentsObject = [{name:"Deepak",age:30},{name:"Avichal",age:20},{name:"Piyush",age:20},{name:"Kusuma",age:18}]

function arrayOperation(array,fn){

    return array.filter((value)=>fn(value))
}

function filterSting(value){
    return value!=="Deepak";
}
function filterObject(value){
    return value.name!=="Deepak";
}
console.log(arrayOperation(students,filterSting));
console.log(arrayOperation(studentsObject,filterObject));


