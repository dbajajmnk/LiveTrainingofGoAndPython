function shoppingCart(fn) {
    let items = [];

    return {
        addItem(item) {
            items.push(item);
        },
        removeItem(item) {
            items = items.filter((value) => fn(value, item));
        },
        getItems() {
            return [...items];
        },
        getTotal() {
            return items.reduce((sum, value) => sum + value.price, 0);
        }
    };
}

function myFilter(value, item) {
    return value.name !== item.name;
}

const myShoppingCart = shoppingCart(myFilter);

myShoppingCart.addItem({ name: "Laptop", price: 1000 });
myShoppingCart.addItem({ name: "Mouse", price: 50 });
myShoppingCart.removeItem({ name: "Mouse" });

console.log(myShoppingCart.getItems());
console.log(myShoppingCart.getTotal());
