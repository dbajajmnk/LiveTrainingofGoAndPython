
import { getPosts } from '../services/PostService.js'
async function  checkApiCall(){
  try {
      const result = await getPosts("https://jsonplaceholder.typicode.com/posts");
      
      return await result.json();
    }catch(e){
      let error ={
        "message":"Api filed with Error",
        "status":"failed",
        "code":e

      }
      return error;
    }
}
const response = await checkApiCall();
console.log("Response",response);