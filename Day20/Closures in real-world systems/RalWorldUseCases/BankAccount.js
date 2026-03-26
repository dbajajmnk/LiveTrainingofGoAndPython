function bankAccount(initialBalance){
     balance = initialBalance;

      return {
        deposit(amount){
            balance+=amount;
            return balance;
        },
        withdrawl(amount){
            if (amount>balance){
                console.log("Insufficient Balance");
                
            }
            balance-=amount;
            return balance;
        },
        getBalance(){
            return balance;
        }
      };

}
const myBankAccount = bankAccount(10000);
myBankAccount.deposit(1000)
myBankAccount.withdrawl(2000)
console.log(myBankAccount.getBalance())