/* eslint-disable */
// How old is Teddy?
let randomAge = Math.floor(Math.random() * 101) + 20;
console.log(`Teddy is ${randomAge} years old!`);

// Searching 101
console.log("Enter the 1st number:");
let firstNum = +readline.prompt();
console.log("Enter the 2nd number:");
let secondNum = +readline.prompt();
console.log("Enter the 3rd number:");
let thirdNum = +readline.prompt();
console.log("Enter the 4th number:");
let fourthNum = +readline.prompt();
console.log("Enter the 5th number:");
let fifthNum = +readline.prompt();
console.log("Enter the last number:");
let lastNum = +readline.prompt();

let input = [firstNum, secondNum, thirdNum, fourthNum, fifthNum];

if (input.includes(lastNum)) {
  console.log(`The number ${lastNum} appears in ${input.join()}.`);
} else {
  console.log(`The number ${lastNum} does not appear in ${input.join()}.`);
}

// When Will I Retire?
console.log("What is your age?");
let age = +readline.prompt();

console.log("At what age would you like to retire?");
let retireAge = +readline.prompt();

let yearsUntilRetirement = retireAge - age;
let currentYear = new Date().getFullYear();
let retireYear = currentYear + yearsUntilRetirement;

console.log(`It's ${currentYear}. You will retire in ${retireYear}.
You only have ${yearsUntilRetirement} years of work to go!`);

// Palindromic Strings (Part 1)
const isPalindrome = str => { return str.split('').reverse().join('') === str };

// Palindromic Strings (Part 2)
const isRealPalindrome = str => {
  const letterNumber = /^[0-9a-zA-Z]+$/;
  let filteredArray = str.split('').filter(char => char.match(letterNumber));
  let filteredString = filteredArray.map(char => char.toLowerCase()).join('');
  return isPalindrome(filteredString);
}

// Palindromic Numbers
const isPalindromicNumber = num => { return (num).toString() === (num).toString().split('').reverse().join('') };

// Running Totals
const runningTotal = array => {
  let newArray = [];
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
    newArray[i] = sum;
  }
  return newArray;
}

// Letter Counter (Part 1)
const wordSizes = str => {
  let size = 0;
  let result = {};

  if (str) {
    str.split(' ').forEach(word => {
      size = word.length;
      result[size] ? result[size] += 1 : result[size] = 1;
    });
  }
  return result;
}

// Letter Counter (Part 2)
const wordSizes = str => {
  let size = 0;
  let result = {};

  if (str) {
    str.split(' ').forEach(word => {
      size = word.replace(/[^a-zA-Z]/, '').length;
      result[size] ? result[size] += 1 : result[size] = 1;
    });
  }
  return result;
}

// Letter Swap
