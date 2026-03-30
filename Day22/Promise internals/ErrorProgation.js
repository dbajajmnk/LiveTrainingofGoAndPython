Promise.resolve(1).then((res) => {
  throw new Error("Something went wrong"); })
  .catch((err) => {
  console.error(err); });