async function handler(){

}

async function apiCall2(){
    return fetch("api/url");
}

async function handler2(){

    apiCall2().then(() => {throw new Error("Error")}).catch(error=>{
        console.log(error);
    })

}

handler2();
handler();
