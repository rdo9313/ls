const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang = 'en') {
  return MESSAGES[lang][message];
}

function isInvalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function isInvalidOperation(operation) {
  return !['1','2','3','4'].includes(operation);
}

function isInvalidInput(input) {
  return !['y','yes','n','no'].includes(input);
}

function isValidInput(input) {
  return ['n', 'no'].includes(input);
}

function isZero(num) {
  return Number(num) === 0;
}

function calculation(operation, number1, number2) {
  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  return output;
}

while (true) {
  console.clear();
  prompt(messages('greeting'));

  prompt(messages('first_num'));
  let number1 = readline.question();

  while (isInvalidNumber(number1)) {
    prompt(messages('invalid_input'));
    number1 = readline.question();
  }

  prompt(messages('second_num'));
  let number2 = readline.question();

  while (isInvalidNumber(number2) || isZero(number2)) {
    prompt(messages('invalid_input'));
    number2 = readline.question();
  }

  prompt(messages('operation'));
  let operation = readline.question();

  while (isInvalidOperation(operation)) {
    prompt(messages('user_choice'));
    operation = readline.question();
  }

  let output = calculation(operation, number1, number2);

  prompt(`The result is: ${output}`);

  prompt(messages('again'));
  let again = readline.question().toLowerCase();

  while (isInvalidInput(again)) {
    prompt(messages('valid'));
    again = readline.question().toLowerCase();
  }

  if (isValidInput(again)) break;
}

prompt(messages("goodbye"));