/* eslint-disable */
// Rotation (Part 1)
const rotateArray = array => {
  let result = array;
  if (typeof result !== "object") {
    return undefined;
  } else if (result.length === 0) {
    return [];
  } else {
    return result.slice(1).concat(result[0]);
  }
}

// Rotation (Part 2)
const rotateString = str => {
  return str.slice(1) + str[0];
}

const rotateRightmostDigits = (num, count) => {
  let string = String(num);
  let left = string.slice(0, string.length - count);
  let right = string.slice(string.length - count);
  right = rotateString(right);
  return Number(left + right);
}

// Rotation (Part 3)
const maxRotation = num => {
  let number = String(num);
  
  for(let i = 0; i < number.length; i++) {
    num = rotateRightmostDigits(num, number.length - i);
  }
  return num;
}

// Stack Machine Interpretation
const minilang = str => {
  let stack = [];
  let register = 0;

  str.split(" ").forEach(el => {
    switch (el) {
      case "PUSH":
        stack.push(register);
        break;
      case "ADD":
        register += stack.pop();
        break;
      case "SUB":
        register -= stack.pop();
        break;
      case "MULT":
        register *= stack.pop();
        break;
      case "DIV":
        register = Math.floor(register / stack.pop());
        break;
      case "MOD":
        register = register % stack.pop();
        break;
      case "POP":
        register = stack.pop();
        break;
      case "PRINT":
        console.log(register);
        break;
      default: 
        register = Number(el);
    }
  })
}

// Word to Digit
const words = {
    zero:  0,
    one:   1,
    two:   2,
    three: 3,
    four:  4,
    five:  5,
    six:   6,
    seven: 7,
    eight: 8,
    nine:  9
  };

const wordToDigit = str => {
  Object.keys(words).forEach(word => {
    let regex = new RegExp(word, 'g');
    str = str.replace(regex, words[word]);
  })
  return str;
}

// Fibonacci Numbers (Recursion)
const fibonacci = num => {
  if (num < 3) {
    return 1;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
}

// Fibonacci Numbers (Procedural)
const fibonacci = num => {
  let previousTwo = [1, 1];

  for (let counter = 3; counter <= num; counter++) {
    previousTwo = [previousTwo[1], previousTwo[0] + previousTwo[1]];
  }
  return previousTwo[1];
}

// Fibonacci Numbers (Memoization)
let memo = {};
const fibonacci = num => {
  if (num < 3) {
    return 1;
  } else if (memo[num]) {
    return memo[num];
  } else {
    memo[num] = fibonacci(num - 1) + fibonacci(num - 2);
    return memo[num];
  }
}

