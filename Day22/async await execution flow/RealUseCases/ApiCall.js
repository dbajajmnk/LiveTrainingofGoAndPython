async function apiCall() {
    // Simulate an API call
   let res = await fetch('https://jsonplaceholder.typicode.com/posts');
   let data = await res.json();
   console.log(data);
}
await apiCall();

