/* eslint-disable */
// Welcome Stranger
function greetings(arr, obj) {
  return `Hello, ${arr.join(' ')}! Nice to have a ${obj.title} ${obj.occupation} around.`;
}

// Greeting a user
console.log("What is your name?");
let name = readline.prompt();

if (name[-1] === "!") {
  name = name.slice(0,-1);
  return `HELLO ${name.toUpperCase()}. WHY ARE WE SCREAMING?`;
} else {
  return `Hello ${name}.`;
}

// Multiplying Two Numbers
const multiply = (num1, num2) => num1 * num2;

// Squaring an Argument
const square = num => multiply(num, num);

// Arithmetic Integer
let num1 = +readline.question("Enter the first number:");
let num2 = +readline.question("Enter the second number:");

let sum = num1 + num2;
let diff = num1 + num2;
let mult = num1 * num2;
let div = Math.floor(num1 / num2);
let remainder = num1 % num2;
let exponent = num1 ** num2;

console.log(`${num1} + ${num2} = ${sum}`);
console.log(`${num1} - ${num2} = ${diff}`);
console.log(`${num1} * ${num2} = ${mult}`);
console.log(`${num1} / ${num2} = ${div}`);
console.log(`${num1} % ${num2} = ${remainder}`);
console.log(`${num1} ** ${num2} = ${exponent}`);

// The End is Near But Not Here
const penultimate = sent => {
  arr = sent.split(' ');
  return arr[arr.length - 2];
}

// Exclusive Or
const xor = (a, b) => { return !!a !== !!b }

// Odd Lists
const oddities = arr => {
  result = [];
  for(let i = 0; i < arr.length; i += 2) {
    result.push(arr[i]);
  }
  return result;
}

// Convert a String to a Number!
const DICT = { 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9 };
const stringToInteger = str => {
  let sum = 0;
  let arr = str.split('').map(char => DICT[char]).reverse();
  for(let i = 0; i < arr.length; i++) {
    sum += (arr[i] * 10**i);
  }
  return sum;
}

// Convert a String to a Signed Number!
const stringToSignedInteger = str => {
  if (str[0] === "-") {
    return -1 * stringToInteger(str.slice(1,str.length));
  } else if (str[0] === "+") {
    return stringToInteger(str.slice(1,str.length));
  } else {
    return stringToInteger(str);
  }
}

// Convert a Number to a String!
const integerToString = num => {
  let result = '';
  do {
    let digit = num % 10;
    num = Math.floor(num / 10);
    result = DIGITS[digit] + result;
  } while (num > 0);
  return result;
}

// Convert a Signed Number to a String!
const signedIntegerToString = num => {
  switch (Math.sign(num)) {
    case 1:
      return "+" + integerToString(num);
    case -1:
      return "-" + integerToString(num * -1);
    case 0:
      return integerToString(num);
  }
}