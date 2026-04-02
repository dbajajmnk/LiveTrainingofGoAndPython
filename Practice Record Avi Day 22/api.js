fetch("https://jsonplaceholder.typicode.com/posts").then(response=>response.json())
.then(data=>{
    console.log("Data recieved:",data);   
})
.catch(error=>{
    console.log("eRROR FETCHNBING dTAT",error);
    
}).finally(()=>{
    console.log("Fetch operation completed");
    
})
console.log("This will log before the datat is recieved");
