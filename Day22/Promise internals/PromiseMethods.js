let p1 = Promise.resolve(1);
let p2 = Promise.reject(1);
Promise.all([p1, p2]).then(
  (res) => { console.log("Resolved:", res); },
  (err) => { console.error("Error:", err); }
);
Promise.race([p1, p2]).then(
  (res) => { console.log("Resolved:", res); },
  (err) => { console.error("Error:", err); }
);
Promise.allSettled([p1, p2]).then(
  (res) => { console.log("Settled:", res); }
);
Promise.any([p1, p2]).then(
  (res) => { console.log("Any Resolved:", res); },
  (err) => { console.error("Any Error:", err); }
);