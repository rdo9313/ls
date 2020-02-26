// Isn't it Odd?
function isOdd(num) {
  return Math.abs(num) % 2 === 1;
}

// Odd Numbers
for (let i = 1; i < 100; i++) {
  if (i % 2 === 1) {
    console.log(i);
  }
}

// Even Numbers
for (let i = 2; i < 100; i += 2) {
  console.log(i);
}

// How big is the room?
console.log("Enter the length of the room in meters:");
let length = readline.prompt();

console.log("Enter the width of the room in meters:");
let width = readline.prompt();

let areaInMeters = +length * +width;
let areaInFeet = areaInMeters * 10.7639;

console.log(`The area of the room is ${areaInMeters.toFixed(2)} square meters (${areaInFeet.toFixed(2)} square feet).`);

// Tip Calculator
console.log("What is the bill?");
let bill = +readline.prompt();

console.log("What is the tip percentage?");
let tipPercent = +readline.prompt() * 0.01;

let tip = (bill * tipPercent).toFixed(2);
let total = (bill + +tip).toFixed(2);

console.log(`The tip is $${tip}`);
console.log(`The total is $${total}`);

// Sum or Product of Consecutive Integers
console.log("Please enter an integer greater than 0:");
let answer = +readline.prompt();

console.log("Enter \"s\" to compute the sum, or \"p\" to compute the product.");
let sumOrProduct = readline.prompt().toLowerCase();

let result = 1;
if (sumOrProduct === 's') {
  for(let i = 2; i <= answer; i++) {
    result += i;
  }
  result;
} else if (sumOrProduct === 'p') {
  for(let i = 1; i <= answer; i++) {
    result *= i;
  }
  result;
} else {
  prompt("Not a valid choice.");
}

// Short Long Short
function shortLongShort(str1, str2) {
  if (str1.length > str2.length) {
    return str2 + str1 + str2;
  } else {
    return str1 + str2 + str1;
  }
}

// Leap Years (Part 1)
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Leap Years (Part 2)
function isLeapYear(year) {
  if (year > 1752) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  } else {
    return year % 4 === 0;
  }
}

// Multiples of 3 and 5

function multisum(num) {
  let sum = 0;
  for(let i = 1; i <= num; i++) {
    if ((i % 3 === 0) || (i % 5 === 0)) {
      sum += i;
    }
  }
  return sum;
}

// ASCII String Value
function asciiValue(str) {
  let sum = 0;

  for(let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}