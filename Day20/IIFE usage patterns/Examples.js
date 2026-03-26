(function(){ console.log("Init"); })();
const module = (function(){
  let value = 0;
  return { inc(){ return ++value; } };
})();
console.log(module)
const config = (function(){ return { api:"url" }; })();
console.log(config);
for(var i=0;i<3;i++){
    console.log(i);
  (function(x){ setTimeout(()=>console.log(x),3000); })(i);
}
const result = (function(){ return 10+20 })();
(function(){
  let clicks=0;
})();
(async function(){ console.log("async"); })();