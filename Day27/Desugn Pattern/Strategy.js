const paymentStrategies = {
  creditCard(amount) {
    return `Paid ${amount} using Credit Card`;
  },
  upi(amount) {
    return `Paid ${amount} using UPI`;
  },
  cash(amount) {
    return `Paid ${amount} using Cash`;
  },
};

function processPayment(strategy, amount) {
  return paymentStrategies[strategy](amount);
}

console.log(processPayment("upi", 500));
console.log(processPayment("cash", 300));