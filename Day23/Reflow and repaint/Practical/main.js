// const box = document.getElementById("box");

// for(let i=100;i<1200;i+=100){
//     box.style.width=i;
//     box.style.height=i;
// }

// 1. Create one example that triggers repaint only
// 2. Create one example that triggers reflow
// 3. Add an element dynamically to a list
// 4. Change an element’s width and observe effect
// 5. Compare animation using `left` and `transform`

const repaintOnly=()=>{

    document.body.style.backgroundColor = "lightblue";
}
const reflowTrigger=()=>{
    const box = document.getElementById("box");
    box.style.width = "200px";
}

const addElements=(type,elements)=>{
    const list=document.createElement(type);
    for(let i=0;i<elements.length;i++){
        const listItem=document.createElement("li");
        listItem.textContent = elements[i];
        list.appendChild(listItem);
    }
    document.body.appendChild(list);
    


}


repaintOnly();
reflowTrigger();
addElements("ul",["Abhi","Raj","Kusuma","Lidiya","Piyush","Navya","Rohit"])
document.body.appendChild((()=>{
    let btn=document.createElement("button");
    let box=document.getElementById("box");
    btn.textContent="Click Me";
    btn.addEventListener("click",(event)=>{
        event.preventDefault();
        const existingWidth = getComputedStyle(box).width;
        box.style.width=parseInt(existingWidth.substring(0, existingWidth.length - 2))+200+"px";

    })
    return btn;
})())

