"use strict"
function helloThis(){
    return function (){
    console.log("Inside Mehtod",this);
    return this;
    }
}
console.log("Global",this==helloThis()());