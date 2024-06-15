#! /usr/bin/env node
// Importing required modules
import inquirer from "inquirer";
import chalk from "chalk";
// Displaying a welcome message in green color
console.log(chalk.green('Welcome to Currency Convertor\n'));
// Creating an object to store the currency values
let currency = {
    USD: 1,
    PKR: 279.72,
    Saudi_Riyal: 3.75,
    Indian_Rupee: 83.54,
    Euro: 0.93,
    BDT: 117
};
// A loop control variable to keep the program running until the decided to exit
let myLoop = true;
while (myLoop) {
    const userInput = await inquirer.prompt([
        {
            type: "list",
            name: "from",
            message: chalk.bgBlueBright("Select a currency you want to convert from\n"),
            choices: ["USD", "PKR", "Saudi_Riyal", "Indian_Rupee", "Euro", "BDT"]
        },
        {
            type: "list",
            name: "to",
            message: chalk.bgGreen("Select a currency you want to convert into\n"),
            choices: ["USD", "PKR", "Saudi_Riyal", "Indian_Rupee", "Euro", "BDT"]
        },
        {
            type: "number",
            name: "amount",
            message: chalk.yellow("Enter an amount you want to convert:")
        }
    ]);
    // Destructuring the users input for easier access
    let { from, to, amount } = userInput;
    // Getting the conversions rates for the selected currencies
    let fromAmount = currency[from];
    let toAmount = currency[to];
    // Converting the amount to the base currency
    let baseAmount = amount / fromAmount;
    // Converting the base amount to the selected currency
    let convertedAmount = baseAmount * toAmount;
    // Formatting the final converted amount to 2 decimal places
    let finalAmount = convertedAmount.toFixed(2);
    // Displaying the conversion result
    console.log(`\n${from} amount ${amount} converted to ${to} amount = ${finalAmount}\n`);
    // Asking the user if they want to convert another amount
    let converAgain = await inquirer.prompt({
        type: "confirm",
        name: "again",
        message: "Do you want to convert again?",
        default: false
    });
    // If the user chooses not to convert again,Exit the loop
    if (!converAgain.again) {
        myLoop = false;
        console.log('\nThanks for using my Currency Convertor!');
    }
}
