const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang = 'en') {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

while (true) {
  console.clear()
  prompt(messages('greeting'));

  prompt(messages('first_num'));
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages('invalid_input'));
    number1 = readline.question();
  }

  prompt(messages('second_num'));
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages('invalid_input'));
    number2 = readline.question();
  }

  prompt(messages('operation'));
  let operation = readline.question();

  while (!['1','2','3','4'].includes(operation)) {
    prompt(messages('user_choice'));
    operation = readline.question();
  }

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

  prompt(`The result is: ${output}`);

  prompt(messages('again'));
  let again = readline.question();

  while (!['y','yes','n','no'].includes(again.toLowerCase())) {
    prompt(messages('valid'));
    again = readline.question();
  }

  if (['n', 'no'].includes(again.toLowerCase())) break;
}

prompt(messages("goodbye"));