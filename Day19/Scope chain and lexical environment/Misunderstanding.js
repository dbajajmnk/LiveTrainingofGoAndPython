let a = 1;

function one() {
  function two() {
    console.log(a);
  }
  two();
}

one();