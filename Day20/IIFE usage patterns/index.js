(function () {
  console.log("Runs immediately");
})();

(function (...name) {
  console.log("Runs immediately",...name);
})("Deepak","Team","Avichal","Ansari");


(async function () {
  await Promise.resolve();
})();

//Arrow
((...name)=>console.log("Runs Arrow immediately",...name)
)("Deepak","Team","Avichal","Ansari");

(async()=> await Promise.resolve()
   
)();

(()=> console.log("Runs Arrow immediately"))();


const counter=(function(){
 let c=0; return ()=>++c;
})();
console.log(counter());
