let x = { a: 1 };

function change(obj) {
  obj.a = 99;
}

change(x);

console.log(x.a);