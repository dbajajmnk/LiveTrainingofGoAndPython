let cahche={};

function getData(key,data){
    if(cahche[key]){
        console.log("Data from cache");
        return cahche[key]=data;
    }else{
        console.log("Data from server");
        cahche[key]=data;
        return data;
    }}

function fetchDataFromServer(key){
    // Simulate fetching data from server
    return "Data for " + key;
}

// Example usage
document.body.appendChild(document.createTextNode(getData("user1",fetchDataFromServer("user1")))); // Data from server
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createTextNode(getData("user1",fetchDataFromServer("user1")))); // Data from cache
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createTextNode(getData("user2",fetchDataFromServer("user2"))));  
console.log(getData("user1",fetchDataFromServer("user1"))); // Data from server
console.log(getData("user1",fetchDataFromServer("user1"))); // Data from cache
console.log(getData("user2",fetchDataFromServer("user2"))); // Data from server
console.log(getData("user2",fetchDataFromServer("user2"))); // Data from cache