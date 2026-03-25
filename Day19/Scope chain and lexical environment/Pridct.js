let x = 1;

function a() {
  let x = 2;

  function b() {
    console.log(x);
  }

  b();
}

a();