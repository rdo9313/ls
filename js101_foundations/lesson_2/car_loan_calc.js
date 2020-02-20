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

function getValidAmount() {
  prompt(MESSAGES["validAmount"]);
  let answer = readline.question();
  return answer;
}

function getAPR() {
  prompt(MESSAGES["apr"]);
  let answer = readline.question();
  return answer;
}

function getValidAPR() {
  prompt(MESSAGES["validAPR"]);
  let answer = readline.question();
  return answer;
}

function getMonths() {
  prompt(MESSAGES["months"]);
  let answer = readline.question();
  return answer;
}

function getValidMonths() {
  prompt(MESSAGES["validMonths"]);
  let answer = readline.question();
  return answer;
}

function displayMonthlyPmt(monthlyPmt) {
  console.log(`Your monthly payment is $${monthlyPmt.toFixed(2)}.`);
}

function getAgain() {
  prompt(MESSAGES["again"]);
  let answer = readline.question().toLowerCase();
  return answer;
}

function getValidAgain() {
  prompt(MESSAGES["validAgain"]);
  let answer = readline.question().toLowerCase();
  return answer;
}

function goodbye() {
  prompt(MESSAGES["goodbye"]);
}

greeting();

while (true) {
  console.clear();
  let amt = getAmount();

  while (isInvalidNumber(amt)) {
    amt = getValidAmount();
  }

  let apr = getAPR();

  while (isInvalidAPR(apr)) {
    apr = getValidAPR();
  }

  let months = getMonths();

  while (isInvalidMonth(months)) {
    months = getValidMonths();
  }

  let monthlyPmt = calculatePmt(amt, apr, months);

  displayMonthlyPmt(monthlyPmt);

  let again = getAgain();

  while (isInvalidInput(again)) {
    again = getValidAgain();
  }

  if (isNo(again)) break;
}

goodbye();