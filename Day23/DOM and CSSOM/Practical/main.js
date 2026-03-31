// Select one heading and change its text
// Create a new paragraph dynamically
// Add a class to a button on click
// Change background color of a box
// Read computed width or color of an element
const assingment4 = ()=>{
    const box = document.createElement("div");
    box.style.width = "100px";  
    box.style.height = "100px";
    box.style.border = "1px solid black";
    return box;
}

const assignment1 = ()=>{
    const h1 = document.createElement("h1");
    h1.style.color='red';
    h1.textContent = "This is a new heading.";
    return h1;
}
const assignmet2=()=>{
    const p1 = document.createElement("p");
    p1.textContent = "This is a new paragraph.";
    return p1;
}
const assignment3= ()=>{
    const myButton = document.createElement("button");
    const box = document.querySelector("div");
    myButton.textContent="Click Me";
    myButton.addEventListener("click", () => {

        myButton.classList.add("clicked");
        box.classList.add("clicked");
    });
    return myButton;
}
document.body.appendChild(assignment1());
document.body.appendChild(assignmet2());
document.body.appendChild(assingment4());
document.body.appendChild(assignment3());




