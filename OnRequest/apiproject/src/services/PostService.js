export const getPosts = async (url)=>{
    try{
    const result = await fetch(url);
    console.log(result);
    return result;
   
    }catch(e){
        throw new Error(e);
    }

    return data;

}

//URL :https://jsonplaceholder.typicode.com/posts