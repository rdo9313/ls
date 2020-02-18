// Car Loan Payment Calculator
const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number))
  || Number(number) === 0 || Number(number) < 0;
}

function invalidAPR(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number))
  || Number(number) < 0;
}

prompt("Welcome to car payment calculator.");
prompt("Press enter to continue:");
readline.question();

while (true) {
  console.clear();
  prompt("Please enter a loan amount:");
  let amt = readline.question();

  while (invalidNumber(amt)) {
    prompt("Please enter a valid amount:");
    amt = readline.question();
  }

  prompt("Please enter the APR (enter 5 for 5%):");
  let apr = readline.question();

  while (invalidAPR(apr)) {
    prompt("Please enter a valid APR:");
    apr = readline.question();
  }

  prompt("Please enter the loan duration in months:");
  let months = readline.question();

  while (invalidNumber(months)) {
    prompt("Please enter a valid duration:");
    months = readline.question();
  }

  let monthlyInt = +apr / 1200.0;

  let monthlyPmt;

  if (+apr === 0) {
    monthlyPmt = (+amt / +months);
  } else {
    monthlyPmt = +amt * (+monthlyInt /
    (1 - Math.pow((1 + +monthlyInt),(-(+months)))));
  }

  console.log(`Your monthly payment is $${monthlyPmt.toFixed(2)}.`);

  prompt("Would you like to calculate another loan? (y/n)");
  let again = readline.question();

  while (!['y','yes','n','no'].includes(again.toLowerCase())) {
    prompt("Please input 'y' or 'n':");
    again = readline.question();
  }

  if (['n','no'].includes(again.toLowerCase())) break;
}

prompt("Thank you for using our service. See you again!");