/* eslint-disable */
// Sum Of Digits
const sum = num => {
  return String(num).split('').reduce((acc, curr) => acc + Number(curr), 0);
}

// Alphabetical Numbers
const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

const alphabeticNumberSort = array => {
  return array.sort((a,b) => {
    let aVal = words[a];
    let bVal = words[b];

    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    } else {
      return 0;
    }
  })
}

// Multiply All Pairs
const multiplyAllPairs = (arr1, arr2) => {
  let products = [];
  arr1.forEach(num => {
    arr2.forEach(num2 => {
      products.push(num*num2);
    })
  })
  return products.sort((a,b) => a - b);
}

// Leading Substrings
const substringsAtStart = str => {
  let result = [];
  for(let i = 1; i <= str.length; i++) {
    result.push(str.slice(0, i));
  }
  return result;
}

// All Substrings
const substrings = str => {
  let result = [];
  for(let i = 0; i < str.length; i++) {
    result = result.concat(substringsAtStart(str.slice(i)))
  }
  return result;
}

// Palindromic Substrings
const palindromes = str => {
  let result = [];
  let list = substrings(str);
  list.forEach(el => {
    if (el.split("").reverse().join('') === el && el.length > 1) {
      result.push(el);
    }
  })
  return result;
}

// Sum of Sums
const sumOfSums = array => {
  let sum = 0;
  for(let i = 1; i <= array.length; i++) {
    sum += array.slice(0, i).reduce((acc,curr) => acc + curr);
  }
  return sum;
}

// Grocery List
const buyFruit = array => {
  let result = [];
  array.forEach(subarray => {
    for(let i = 0; i < subarray[1]; i++) {
      result.push(subarray[0]);
    }
  })
  return result;
}

// Inventory Item Transactions
const transactionsFor = (num, transactions) => {
  return transactions.filter(array => array.id === num);
}

// Inventory Item Availability
const isItemAvailable = (num, transactions) => {
  let total = 0;
  let list = transactionsFor(num, transactions);
  list.forEach(obj => {
    total += (obj.movement === "in") ? obj.quantity : -1 * obj.quantity;
  })
  return total > 0;
}



