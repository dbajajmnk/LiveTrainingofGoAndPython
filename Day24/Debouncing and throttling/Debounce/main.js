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
applyEevent(input,"input",debounce((event)=>{
    console.log("Input event: ",event.target.value);
},1000));
// applyEevent(input,"input",debounce(()=>{
//     console.log("Debounced input event")
// },1000));

applyEevent(box,"mousemove",debounce(()=>{
    console.log("Debounced mousemove event")
},1000));



function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
