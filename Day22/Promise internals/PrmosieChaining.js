Promise.resolve(1)
  .then((res) => {
    console.log(res); // 1
    return res * 2;
  })
  .then((res) => {
    console.log(res); // 2
  });  
