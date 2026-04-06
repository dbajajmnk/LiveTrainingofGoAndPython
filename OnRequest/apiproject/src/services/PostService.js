export const getPosts = async (url)=>{
    try{
    const result = await fetch(url);
    console.log(result);
    return result;
   
    }catch(e){
        throw new Error(e);
    }

   

}
export const getComments = async (url)=>{
    try{
    const result = await fetch(url);
    console.log(result);
    return result;
   
    }catch(e){
        throw new Error(e);
    }

}

//URL :https://jsonplaceholder.typicode.com/posts