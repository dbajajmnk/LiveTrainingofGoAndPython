const orderSystem = {
  createOrder() {
    console.log("Order created");
  },
  processPayment() {
    console.log("Payment processed");
  },
  bookDelivery() {
    console.log("Delivery booked");
  },
};

function placeOrder() {
  orderSystem.createOrder();
  orderSystem.processPayment();
  orderSystem.bookDelivery();
  console.log("Complete order flow finished");
}

placeOrder();