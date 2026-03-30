let p1 = () => Promise.resolve(1);
let p2= () => Promise.reject(new Error("Failed"));

function retry(fn, retries) {
    return fn().catch((err) => { 
        if (retries === 0) {
            throw err;
        }
        return retry(fn, retries - 1);
    });
}

let retries = 3;
retry(p1, retries).then((res) => {
    console.log("Resolved:", res);
}).catch((err) => {
    console.error("Error:", err);
});

retry(p2, 2).then((res) => {
    console.log("Resolved:", res);
}).catch((err) => {
    console.error("Error:", err);
});