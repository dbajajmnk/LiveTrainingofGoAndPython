Promise.resolve(1).then((res) => {console.log("Resolved:", res);});
Promise.reject(1).then(
        (res) => {console.log("Resolved:", res);},
        (err) => {console.error("Error:", err);}
    );
Promise.resolve(1).then(
        (res) => {console.log("Resolved:", res);},
        (err) => {console.error("Error:", err);}
    );