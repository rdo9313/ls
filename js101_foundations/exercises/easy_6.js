/* eslint-disable */
// Double Char (Part 1)
const repeater = str => {
  return str.split('').map(char => char.repeat(2)).join('');
}

// Double Char (Part 2)
const doubleConsonants = str => {
  return str.split('').map(char => {
    if (char.match(/[a-zA-Z]/) && !char.match(/[aeiouAEIOU]/)) {
      return char.repeat(2);
    } else {
      return char;
    }
  }).join('');
}

// Reverse Number
const reverseNumber = int => {
  let array = [];

  while (int > 0) {
    array.push(int % 10);
    int = Math.floor(int / 10);
  }

  return Number(array.join(''));
}

// Get The Middle Character
const centerOf = str => {
  let array = str.split('');
  let middle = Math.floor(array.length / 2);
  return (array.length % 2 === 1) ? array[middle] : array[middle - 1] + (array[middle]);
}

// Always Return Negative
const negative = int => { return int >= 0 ? int * -1 : int }

// Counting Up
const sequence = int => {
  let array = [];

  for(let i = 1; i <= int; i++) {
    array.push(i);
  }

  return array;
}

// Name Swapping
const swapName = name => {
  let array = name.split(' ');
  return `${array[1]}, ${array[0]}`;
}

// Sequence Count
const sequence = (count, start) => {
  let array = [];
  let element = 0;

  for(let i = 0; i < count; i++) {
    element += start;
    array.push(element);
  }
  
  return array;
}

// Reverse It (Part 1)
const reverseSentence = str => { return str.split(' ').reverse().join(' '); }

// Reverse It (Part 2)
const reverseWords = str => {
  return str.split(' ').map(word => {
    if (word.length > 4) {
      return word.split('').reverse().join('');
    } else {
      return word;
    }
  }).join(' ');
}

// Reversed Arrays
const reverse = array => {
  for (let i = 0; i <= Math.floor((array.length - 1) / 2); i++) {
    let el = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = el;
  }
  return array;
}

// Matching Parentheses?
const isBalanced = str => {
  let sum = 0;
  
  str.split('').forEach(char => {
    if (char === "(") {
      sum += 1;
    } else if (char === ")") {
      sum -= 1;
      if (sum < 0) {
        sum = null;
      }
    }
  })

  return sum === 0;
}