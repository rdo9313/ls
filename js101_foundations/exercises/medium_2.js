/* eslint-disable */
// Lettercase Percentage Ratio
const letterPercentages = str => {
  let lowercase = str.match(/[a-z]/g) || [];
  let uppercase = str.match(/[A-Z]/g) || [];
  let neither = str.match(/[^a-zA-Z]/g) || [];

  lowercase = (lowercase.length / str.length * 100).toFixed(2);
  uppercase = (uppercase.length / str.length * 100).toFixed(2);
  neither = (neither.length / str.length * 100).toFixed(2);

  return { lowercase: String(lowercase), uppercase: String(uppercase), neither: String(neither) };
}

// Triangle Sides
const triangle = (a, b, c) => {
  let array = [a,b,c].sort((a,b) => a - b);

  if ((array[0] + array[1]) < array[2] || array[0] <= 0) {
    return "invalid";
  }

  if (a === b && b === c) {
    return "equilateral";
  } else if (a === b || b === c || a === c) {
    return "isosceles";
  } else {
    return "scalene";
  }
}

// Tri-Angles
const triangle = (a, b, c) => {
  let array = [a,b,c].sort((a,b) => a - b);

  if (a + b + c !== 180 || array[0] <= 0) {
    return "invalid";
  }

  if (array.includes(90)) {
    return "right";
  } else if (array[2] > 90) {
    return "obtuse";
  } else {
    return "acute";
  }
}

// Unlucky Days
const fridayThe13ths = year => {
  let days = [];
  for(let i = 0; i <= 11; i++) {
    days.push(new Date(year, i, 13).getDay());
  }
  return days.filter(num => num === 5).length;
}

// Next Featured Number Higher than a Given Value
const uniqueDigits = num => {
  let counts = {};
  let array = String(num).split("");

  for (let i = 0; i < array.length; i++) {
    if (counts[array[i]]) {
      return false;
    }

    counts[array[i]] = true;
  }
  return true;
}

const featuredNum = num => {
  return num % 7 === 0 && num % 2 === 1 && uniqueDigits(num);
}

const featured = num => {
  for (let i = num + 1; i <= 9876543201; i++) {
    if (featuredNum(i)) {
      return i;
    }
  }

  return "There is no possible number that fulfills those requirements.";
}

// Sum Square - Square Sum
const sumSquareDifference = count => {
  let sum = 0;
  let squaredSum = 0;
  for(let i = 1; i <= count; i++) {
    sum += i;
    squaredSum += i ** 2;
  }
  return sum ** 2 - squaredSum;
}

// Bubble Sort
const bubbleSort = array => {
  while (true) {
    let swapped = false;
    for (let idx = 1; idx < array.length; idx++) {
      if (array[idx - 1] <= array[idx]) continue;
      [array[idx - 1], array[idx]] = [array[idx], array[idx - 1]];
      swapped = true;
    }
    if (!swapped) break;
  }
}

// Longest Sentence
const longestSentence => text => {
  let sentences = text.match(/\w.*?[.!?]/g);

  let longest = sentences.reduce((longest,sentence) => {
    let length = sentence.split(/\s/).length;
    if (length > longest.length) {
      return { text: sentence, length: length };
    } else {
      return longest;
    }
  }, { text: "", length: 0 });

  console.log(longest.text + "\n");
  console.log("The longest sentence has " + longest.length + " words.\n");
}