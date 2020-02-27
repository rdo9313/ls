/* eslint-disable */
// ddaaiillyy ddoouubbllee
const crunch = str => {
  let result = '';
  let current = '';
  str.split('').forEach(char => {
    if (char !== current) {
      current = char;
      result += char;
    }
  })
  return result;
}

// Bannerizer
const logInBox = str => {
  console.log("+" + "-".repeat(str.length + 2) + "+");
  console.log("|" + " ".repeat(str.length + 2) + "|");
  console.log(`| ${str} |`);
  console.log("|" + " ".repeat(str.length + 2) + "|");
  console.log("+" + "-".repeat(str.length + 2) + "+");
}

// Stringy Strings
const stringy = num => {
  let result = '';
  for(let i = 1; i <= num; i++) {
    if (i % 2 === 0) {
      result += '0';
    } else {
      result += '1';
    }
  }
  return result;
}

// Fibonacci Number Location By Length
const findFibonacciIndexByLength = num => {
  let first = 1;
  let second = 1;
  let index = 2;
  let fib;

  do {
    fib = first + second;
    index += 1;
    first = second
    second = fib;
  } while (String(fib).length < num);
  return index;
}

// Right Triangles
const triangle = n => {
  for(let i = 1; i <= n; i++) {
    console.log(' '.repeat(n-i) + '*'.repeat(i));
  }
}

// Madlibs
let noun = readline.question("Enter a noun:");
let verb = readline.question("Enter a verb:");
let adjective = readline.question("Enter a adjective:");
let adverb = readline.question("Enter a adverb:");

console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious!`);

// Double Doubles
const twice = num => {
  let string = String(num);
  let mid = Math.floor(string.length / 2);
  if (string.slice(0,mid) !== string.slice(mid,string.length)) {
    return +string * 2;
  } else {
    return +string;
  }
}

// Grade Book
const getGrade = (a, b, c) => {
  let mean = (a + b + c) / 3;
  switch (true) {
    case (mean >= 90):
      return "A";
    case (mean >= 80):
      return "B";
    case (mean >= 70):
      return "C";
    case (mean >= 60):
      return "D";
    default:
      return "F";
  }
}

// Clean up the words
const cleanUp = str => {
  let result = '';
  str.split('').forEach(char => {
    if (char.match(/[A-Za-z]/)) {
      result += char;
    } else {
      if (result[result.length - 1] !== ' ') {
        result += ' ';
      }
    }
  })
  return result;
}


// What Century is That?
const getSuffix = prefix => {
  let arr = [11,12,13]
  let lastDigit = prefix % 10;
  if (!(arr.includes(prefix % 100))) {
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3: 
        return 'rd';
      default:
        return 'th';
    }
  } else {
    return 'th';
  }
}

const century = year => {
  let prefix = Math.floor(year / 100) + 1;
  year % 10 === 0 ? prefix -= 1 : prefix;
  let suffix = getSuffix(prefix);
  return String(prefix) + suffix;
}


