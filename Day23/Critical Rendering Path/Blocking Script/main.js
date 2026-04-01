async function test() {
  let h1 = document.querySelector('h1');
  console.log('Before script');
  console.log(h1);
  
  // This line pauses the function for 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('After script');
  h1.innerHTML = "Changed by script after 3 seconds";
  console.log(h1);
}

test();
