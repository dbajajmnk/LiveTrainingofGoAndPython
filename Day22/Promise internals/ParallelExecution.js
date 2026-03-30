let p1= Promise.resolve(1);
let p2= Promise.resolve(2);
Promise.all([p1, p2]).then(([a, b]) => {
  console.log("Resolved:", a, b);
});
