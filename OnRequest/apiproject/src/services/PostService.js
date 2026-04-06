export const getData = async (url)=>{
    try{
    const result = await fetch(url);
    console.log(result);
     if (!result.ok) {
        throw new Error("Unable to load users");
      }
    return await result.json();
   
    }catch(e){
        throw new Error(e);
    }

   

}

//URL :https://jsonplaceholder.typicode.com/posts