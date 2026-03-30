

function calculateSubtotal(cart) {
    return {
        getSubtotal: function() {
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price * cart[i].quantity;
            }
            return total;
        }
    };
}

function applyDiscount(cart) {
    return {
        getDiscountedPrice: function(subtotal) {
            if (subtotal > 100) {
                return subtotal - subtotal * 0.1; // 10% discount
            }
            return subtotal;
        }
    };
}

function applyTax() {
    return {
        getFinalPrice: function(amount) {
            let tax = 0.05; // 5% tax
            return amount + amount * tax;
        }
    };
}

// main cart using composition

function createCart() {
    let items = [];

    let subtotalFeature = calculateSubtotal(items);
    let discountFeature = applyDiscount(items);
    let taxFeature = applyTax();

    return {
        addItem: function(name, price, quantity) {
            items.push({ name: name, price: price, quantity: quantity });
        },

        showItems: function() {
            console.log(items);
        },

        checkout: function() {
            let subtotal = subtotalFeature.getSubtotal();
            let afterDiscount = discountFeature.getDiscountedPrice(subtotal);
            let finalPrice = taxFeature.getFinalPrice(afterDiscount);

            console.log("Subtotal:", subtotal);
            console.log("After Discount:", afterDiscount);
            console.log("Final Price:", finalPrice);
        }
    };
}


let cart = createCart();

cart.addItem("Shirt", 50, 2);
cart.addItem("Pants", 40, 1);

cart.showItems();

cart.checkout();