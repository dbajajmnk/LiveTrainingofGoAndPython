function star(rows) {
  for (let i = 1; i <= rows; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "*";
    }
    console.log(row);
  }
}

star(5);


function staRR(rows) {
  for (let i = rows; i >= 1; i--) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "*";
    }
    console.log(row);
  }
}

staRR(5);

