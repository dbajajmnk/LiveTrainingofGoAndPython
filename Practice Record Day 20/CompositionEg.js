function canFly(state) {
    return {
        fly() {
            console.log(state.name + " is flying");
        }
    };
}

function canSwim(state) {
    return {
        swim() {
            console.log(state.name + " is swimming");
        }
    };
}

function createDuck(name) {
    const state = { name };
    return Object.assign(
        {},
        canFly(state),
        canSwim(state)
    );
}

const duck = createDuck("Donald");

duck.fly();
duck.swim();