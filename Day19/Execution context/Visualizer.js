function logExecution(name) {
  console.log("Entering:", name);

  return function () {
    console.log("Exiting:", name);
  };
}

function a() {
  const exitA = logExecution("A");

  function b() {
    const exitB = logExecution("B");
    exitB();
  }

  b();
  exitA();
}

a();