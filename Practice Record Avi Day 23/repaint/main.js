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