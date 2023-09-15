let pin = "";
let userPin = prompt("Add your pin");
pin = userPin;
let count = 3;
let balance = 3000;
let salary = 1000;
let hasCredit = false;
let transactions = [];
let creditAmount = 0;

while (count > 0) {
    let logpin = prompt("Add login pin");
    if (logpin === pin) {
        console.log("Welcome!");
        withdraw();
        break;
    } else {
        count--;
        console.log(`Try Again, Try count= ${count}`);
        if (count === 0) {
            console.error("Your card was blocked");
            break;
        }
    }
}

function withdraw() {
    let choize = prompt("For Credit payment: press C | For Withdraw: press W | For Balance: press B | For Transactions: press T");
    switch (choize) {
        case "W":
            let amount = Number(prompt("Enter amount"));
            if (amount <= balance) {
                balance -= amount;
                let obj = {
                    amount: amount,
                    date: new Date(),
                    income: "WithDraw"
                };
                transactions.push(obj);
                console.log("Your balance =", balance);
            } else {
                console.info("There is not enough money in your balance");
            }
            break;
        case "B":
            console.log("Balance:", balance);
            break;
        case "T":
            ShowTransactions();
            break;
        case "C":
            CreditPayment();
            break;
        default:
            console.log("Invalid option");
    }

    let isCon = confirm("Do you want to perform another transaction?");
    if (isCon) {
        withdraw();
    } else {
        console.log("Thanks!");
        return;
    }
}

function CalculateCredit(salary) {
    let monthlyMoney = salary * 0.45;
    let maxCreditAmount = 12 * monthlyMoney;
    let result = maxCreditAmount - (maxCreditAmount * 0.1);
    return {
        monthlyMoney: monthlyMoney,
        creditAmount: result
    };
}

function ShowTransactions() {
    transactions.forEach((tr) => {
        let date = tr.date;
        let trDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log(`Amount: ${tr.amount}, Date: ${trDate}, ${tr.income}`);
    });
}

function CreditPayment() {
    if (creditAmount === 0) {
        console.log("There is no credit payment yet");
        let isAsk = confirm("Do you want to try again?");
        if (isAsk) {
            withdraw();
        } else {
            return;
        }
    } else {
        let Payment = Number(prompt("Enter amount for Credit payment..."));
        if (Payment > creditAmount) {
            let isCont = confirm("You can't pay more than your credit balance. Do you want to continue?");
            if (isCont) {
                CreditPayment();
            } else {
                console.log("Thanks!");
                return;
            }
        } else {
            creditAmount -= Payment;
            balance -= Payment;
            console.log(`The loan has been repaid. Current balance: ${balance}. Remaining credit: ${creditAmount}`);
            let obj = {
                amount: Payment,
                date: new Date(),
                income: "Credit Payment"
            };
            transactions.push(obj);

            let isCont = confirm("Do you want to continue?");
            if (isCont) {
                withdraw();
            } else {
                console.log("Thanks!");
                return;
            }
        }
    }
}
