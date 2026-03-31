const theme1=(elementname)=>{
    const children=[];
    for(let i=0;i<10;i++){
    const h1= document.createElement(elementname);
    h1.textContent="Content"+i;
    children.push(h1);
    }
    document.body.appendChild(...children);

}

function changeTheme(choice){
    //document.body.innerHtml="";
    switch(choice){
        case 1: theme1("h1"); break;
        case 2: theme1("p"); break;
        default: theme1("del"); break;
    }

}
changeTheme(3);

