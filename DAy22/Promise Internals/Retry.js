let p1 = () => Promise.resolve(1);

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
