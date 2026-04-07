import { getPost } from './api'; // Assuming getPost is imported from a file named api.js

async function checkApiCall() {
  try {
    const result = await getPosts("https://jsonplaceholder.typicode.com/posts");
    return await result.json();
  } catch (e) {
    let error = {
      "message": "Api failed with Error",
      "status": "failed",
      "code": e
    };
    return error;
  }
}

const response = await checkApiCall();
console.log("Response", response);