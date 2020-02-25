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
sum or product 