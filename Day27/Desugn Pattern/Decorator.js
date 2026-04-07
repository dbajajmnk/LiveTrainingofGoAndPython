function basicCar() {
  return {
    cost: 500000,
    description: "Basic Car",
  };
}

function addSunroof(car) {
  car.cost += 50000;
  car.description += ", Sunroof";
  return car;
}

function addMusicSystem(car) {
  car.cost += 20000;
  car.description += ", Music System";
  return car;
}

let car = basicCar();
car = addSunroof(car);
car = addMusicSystem(car);

console.log(car);