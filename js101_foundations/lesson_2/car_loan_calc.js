// Car Loan Payment Calculator
const readline = require('readline-sync');
const MESSAGES = require('./car_loan_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function greeting() {
  prompt(MESSAGES["greeting"]);
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

function isInvalidMonth(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number))
  || !Number.isInteger(Number(number)) || Number(number) < 1;
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

function getAmount() {
  prompt(MESSAGES["amount"]);
  let answer = readline.question();
  return answer;
}

function getValidAmount(amt) {
  while (isInvalidNumber(amt)) {
    prompt(MESSAGES["validAmount"]);
    amt = readline.question();
  }
  return amt;
}

function getAPR() {
  prompt(MESSAGES["apr"]);
  let answer = readline.question();
  return answer;
}

function getValidAPR(apr) {
  while (isInvalidAPR(apr)) {
    prompt(MESSAGES["validAPR"]);
    apr = readline.question();
  }
  return apr;
}

function getMonths() {
  prompt(MESSAGES["months"]);
  let answer = readline.question();
  return answer;
}

function getValidMonths(months) {
  while (isInvalidMonth(months)) {
    prompt(MESSAGES["validMonths"]);
    months = readline.question();
  }
  return months;
}

function displayMonthlyPmt(monthlyPmt) {
  console.log(`Your monthly payment is $${monthlyPmt.toFixed(2)}.`);
}

function getAgain() {
  prompt(MESSAGES["again"]);
  let answer = readline.question().toLowerCase();
  return answer;
}

function getValidAgain(again) {
  while (isInvalidInput(again)) {
    prompt(MESSAGES["validAgain"]);
    again = readline.question().toLowerCase();
  }
  return again;
}

function goodbye() {
  prompt(MESSAGES["goodbye"]);
}

greeting();

while (true) {
  console.clear();
  let amt = getAmount();
  amt = getValidAmount(amt);

  let apr = getAPR();
  apr = getValidAPR(apr);

  let months = getMonths();
  months = getValidMonths(months);

  let monthlyPmt = calculatePmt(amt, apr, months);

  displayMonthlyPmt(monthlyPmt);

  let again = getAgain();
  again = getValidAgain(again);

  if (isNo(again)) break;
}

goodbye();