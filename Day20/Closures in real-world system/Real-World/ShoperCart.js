function createShoppingCart() {
    let items = [];

    return {
        addItem(name, price) {
            items.push({ name, price });
        },
        removeItem(itemName) {
            items = items.filter(item => item.name !== itemName);
        },
        getItems() {
            return items;
        },
        getTotal() {
            return items.reduce((sum, item) => sum + item.price, 0);
        }
    };
}

const shoppingCart = createShoppingCart();

shoppingCart.addItem("Laptop", 1000);
shoppingCart.addItem("Mouse", 50);
shoppingCart.removeItem("Mouse");

console.log(shoppingCart.getItems());
console.log(shoppingCart.getTotal());
