// element.innerHTML
// element.outerHTML
// document.write()
// eval()
// setTimeout("code")
// setInterval("code")

const myButton = document.getElementById("btn");

myButton.addEventListener('click',()=>{
    //writeSomething("Hello Friends ")
    //letPlayWithInnerHtml(document.body,"inner HTML effect")
    //letPlayWithAny(document.body,'innerHTML',"inner HTML effect")
    // letPlayWithAny(document.body,'outerHTML',"outer HTML effect")
    console.log(eval());
})



const writeSomething = (content)=>{
document.write(content);
}

const letPlayWithInnerHtml=(el,content)=>{
    el.innerHTML=content;
}
const letPlayWithAny=(el,property,content)=>{
    el[property]=content;
}
