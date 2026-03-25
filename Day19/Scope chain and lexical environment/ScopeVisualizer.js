function scopeTracker(name) {
  console.log("Entering:", name);

  return () => console.log("Exiting:", name);
}

function outer() {
  let a = 10;
  const exitOuter = scopeTracker("Outer");

  function inner() {
    let b = 20;
    const exitInner = scopeTracker("Inner");

    console.log("Access:", a, b);

    exitInner();
  }

  inner();
  exitOuter();
}

outer();