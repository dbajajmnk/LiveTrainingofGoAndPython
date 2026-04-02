async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

let  clickHandler=async()=>{
        const response =await apiRequest("https://jsonplaceholder.typicode.com/posts",{method:"POST",
            body:{
"userId": 1,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}})
console.log("Response",response);
};

function addUIForAPICall(){
    const btn = document.createElement('button');
    btn.innerText="Click to make an API Call"
    btn.addEventListener("click",clickHandler);
    document.body.appendChild(btn);
}
addUIForAPICall();

