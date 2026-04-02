const box = document.getElementById("box");
const input = document.getElementById("input");

const applyEevent = (element,event,callback)=>{
    element.addEventListener(event,callback)

}
applyEevent(box,"click",()=>{
    box.style.width = box.offsetWidth + 20 + "px";
});
applyEevent(box,"mousemove",()=>{
    console.log("Mouse is moving")
});

applyEevent(box,"scroll",()=>{
    console.log("Scrolling")
});
applyEevent(input,"input",()=>{
    console.log("Input event")
});