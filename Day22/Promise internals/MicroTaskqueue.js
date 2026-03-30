Promise.resolve(1).then((res) => {
  console.log(res); });
setTimeout(() => {
  console.log("Timeout callback"); }    , 0);
console.log("Synchronous log");