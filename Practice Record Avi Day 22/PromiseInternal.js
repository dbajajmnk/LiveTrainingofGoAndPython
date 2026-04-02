// Promise.resolve(1).then(
//     (res)=>{console.log("Resolved: ",res);
// };
// (err)=>{console.error("Error",err);
// };)
// Promise.reject(1).then(
//     (res)=>{console.log("Resolved: ",res);
//         (err)=>{console.error("Error",err);
//         }
//     }
// )

// RESOLVE CASE
Promise.resolve(1).then(
    (res) => {
        console.log("Resolved:", res);
    },
    (err) => {
        console.error("Error:", err);
    }
);

// REJECT CASE
Promise.reject(1).then(
    (res) => {
        console.log("Resolved:", res);
    },
    (err) => {
        console.error("Error:", err);
    }
);