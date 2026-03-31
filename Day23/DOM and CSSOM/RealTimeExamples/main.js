// const  list= document.createElement('ul');
//         const  firstItem = document.createElement('li');
//         firstItem.textContent = 'First Item';
//         list.appendChild(firstItem);
//         document.body.appendChild(list);

let createList=(type,items,parent=document.body)=>{
    const  list= document.createElement(type);
    for(let item of items){
        const listItem=document.createElement('li');
        listItem.textContent=item;
        listItem.style.color='blue';
        listItem.style.fontSize='18px';
        list.appendChild(listItem);
    }
    parent.appendChild(list);
}
createList("ol",["Deepak","Avhichal","Navaya","Anuj"])
createList("ul",["Deepak","Avhichal","Navaya","Anuj"])
let applyStyling = (element,style={
backgroundColor:'yellow',color:'red',fontSize:'20px'})=>{
    
    for(let key in style){
        element.style[key]=style[key];
    }
    
}