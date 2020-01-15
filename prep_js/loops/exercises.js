#2
function factorial(num) {
  let result = 1;
  for(let counter = num; counter > 1; counter -= 1) {
    result *= counter
  }
  return result
}

#3
the while loop runs since counter is returning a truthy value with value of 1.
The if statement never runs since counter is always equal to 2 with each iteration of the while loop.

#4
No error, the console will output 1,2,3,4,5.

#5
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let tries = 0;
let result;

do {
  result = randomNumberBetween(1,6);
  tries += 1
} while(result <= 2)

console.log('It took ' + String(tries) + ' tries to get a number greater than 2');

#6
function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}