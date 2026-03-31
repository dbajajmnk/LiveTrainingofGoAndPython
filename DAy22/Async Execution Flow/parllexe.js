async function task1() {
  return 1;
}

async function task2() {
  return 2;
}

const r1 = task1();
const r2 = task2();

async function handleError() {
  try {
    await r1; // UnhandledPromiseRejectionWarning: 1
  } catch (error) {
    console.error("Caught error:", error);
  }
}
