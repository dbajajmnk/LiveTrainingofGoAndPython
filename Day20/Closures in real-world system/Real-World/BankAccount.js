function bankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit(amount) {
            balance += amount;
        },
        withrawl(amount) {
            if (amount > balance) {
                console.log("Insufficient Balance");
            } else {
                balance -= amount;
            }
        },
        getBalance() {
            return balance;
        }
    };
}

const myBankAcc = bankAccount(10000);
myBankAcc.deposit(1000);
myBankAcc.withrawl(2000);
console.log(myBankAcc.getBalance());
