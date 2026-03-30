function createAccount(initialBalance) {
  let balance = initialBalance;
 
  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
 
    withdraw: (amount) => {
      if (amount > balance) {
        console.log("❌ Insufficient Balance");
        return;
      }
      balance -= amount;
      return balance;
    },
 
    getBalance: () => balance
  };
}
 
const account = createAccount(1000);
 
account.deposit(5000);  
account.withdraw(2000);   
account.withdraw(300);        
 
console.log(account.getBalance());