// Car Loan Payment Calculator
const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function greeting() {
  prompt("Welcome to car payment calculator.");
  prompt("Press enter to continue:");
  readline.question();
}

function isInvalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number))
  || Number(number) === 0 || Number(number) < 0;
}

function isInvalidAPR(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number))
  || Number(number) < 0;
}

function calculatePmt(amt, apr, months) {
  let monthlyInt = +apr / 1200.0;
  let payment;

  if (+apr === 0) {
    payment = (+amt / +months);
  } else {
    payment = +amt * (+monthlyInt /
    (1 - Math.pow((1 + +monthlyInt),(-(+months)))));
  }
  return payment;
}

function isInvalidInput(input) {
  return !['y','yes','n','no'].includes(input);
}

function isNo(input) {
  return ['n','no'].includes(input);
}

function goodbye() {
  prompt("Thank you for using our service. See you again!");
}

greeting();

while (true) {
  console.clear();
  prompt("Please enter a loan amount:");
  let amt = readline.question();

  while (isInvalidNumber(amt)) {
    prompt("Please enter a valid amount:");
    amt = readline.question();
  }

  prompt("Please enter the APR (enter 5 for 5%):");
  let apr = readline.question();

  while (isInvalidAPR(apr)) {
    prompt("Please enter a valid APR:");
    apr = readline.question();
  }

  prompt("Please enter the loan duration in months:");
  let months = readline.question();

  while (isInvalidNumber(months)) {
    prompt("Please enter a valid duration:");
    months = readline.question();
  }

  let monthlyPmt = calculatePmt(amt, apr, months);

  console.log(`Your monthly payment is $${monthlyPmt.toFixed(2)}.`);

  prompt("Would you like to calculate another loan? (y/n)");
  let again = readline.question().toLowerCase();

  while (isInvalidInput(again)) {
    prompt("Please input 'y' or 'n':");
    again = readline.question().toLowerCase();
  }

  if (isNo(again)) break;
}

goodbye();