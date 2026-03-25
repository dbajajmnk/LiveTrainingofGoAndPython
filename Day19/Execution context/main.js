window.alert("Enter your list choice");
let userChoice=prompt();
console.log("user Choice",userChoice);

let elements = document.getElementsByTagName("body");
let bodyElement = elements[0];
let olelement=document.createElement(userChoice);
for (var i =0;i<10;i++){
    let listItem = document.createElement("li")
    listItem.innerHTML="item"+i;
    olelement.appendChild(listItem);
}
bodyElement.appendChild(olelement);