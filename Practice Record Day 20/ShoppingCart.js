function shoppingCart() {
    let items = [];

    return {
        addItem(item) {
            items.push(item);
        },
        removeItem(item) {
            items = items.filter(value => value.name !== item.name);
        },
        getItems() {
            return items;
        },
        getTotal() {
            return items.reduce((sum, item) => sum + item.price, 0);
        }
    };
}

const shoppingcart = shoppingCart();

shoppingcart.addItem({ name: "Shirt", price: 20 });
shoppingcart.addItem({ name: "Pants", price: 30 });

console.log(shoppingcart.getItems());
console.log(shoppingcart.getTotal());

shoppingcart.removeItem({ name: "Shirt" });

console.log(shoppingcart.getItems());
console.log(shoppingcart.getTotal());