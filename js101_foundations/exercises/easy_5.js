/* eslint-disable */
// Cute Angles
const convertTwoDigits = string => {
  return string.length > 1 ? string : '0' + string;
}

const dms = num => {
  let degrees;
  let minutes = '0';
  let seconds = '0';
  let decimal;
  let stringify = String(num);
  let index = stringify.indexOf('.');

  if (index > -1) {
    degrees = stringify.slice(0, index);
    decimal = +stringify.slice(index, stringify.length);
    decimal *= 3600;
    minutes = String(Math.floor(decimal / 60));
    seconds = String(Math.floor(decimal % 60));
  } else {
    degrees = stringify;
  }
  minutes = convertTwoDigits(minutes);
  seconds = convertTwoDigits(seconds);
  console.log(`${degrees}°${minutes}'${seconds}"`);
}

// Combining Arrays
const union = (arr1, arr2) => {
  let combinedArr = arr1.concat(arr2);
  let newArr = [];
  combinedArr.forEach(el => {
    if (!newArr.includes(el)) {
      newArr.push(el);
    }
  })
  return newArr;
}

// Halvsies
const halvsies = array => {
  let center;
  switch (array.length) {
    case 0:
      return [[], []];
    case 1:
      return [array, []];
    default:
      center = Math.ceil(array.length / 2);
      return [array.slice(0, center), array.slice(center, array.length)];
  }
}

// Find the Duplicate
const findDup = array => {
  for (let i = 0; i < array.length; i++) {
    if (array.slice(i + 1).includes(array[i])) {
      return array[i];
    }
  }
}

// Combine Two Lists
const interleave = (arr1, arr2) => {
  let array = [];
  for (let i = 0; i < arr1.length; i++) {
    array.push(arr1[i], arr2[i]);
  }
  return array;
}

// Multiplicative Average
const multiplicativeAverage = array => {
  return String((array.reduce((acc, curr) => acc * curr) / array.length).toFixed(3));
}

// Multiply Lists
const multiplyList = (arr1, arr2) => {
  let array = [];
  for (let i = 0; i < arr1.length; i++) {
    array.push(arr1[i] * arr2[i]);
  }
  return array;
}

// List of Digits
const digitList = num => {
  let array = [];
  while (num > 0) {
    let digit = num % 10;
    num = Math.floor(num / 10);
    array.unshift(digit);
  }
  return array;
}

// How Many?
const countOccurrences = arr => {
  const obj = {};
  arr.forEach(el => obj[el] ? obj[el] += 1 : obj[el] = 1);
  for (key in obj) {
    console.log(`${key} => ${obj[key]}`);
  }
}

// Array Average
const average = arr => { return Math.floor(arr.reduce((acc, curr) => acc + curr) / arr.length); }

// After Midnight (Part 1)
const convertIntegerToMinutes = integer => {
  if (integer >= 0) {
    return integer % 1440;
  } else {
    return integer % 1440 + 1440;
  }
}

const convertToTwoDigits = string => {
  return (string.length > 1) ? string : '0' + string
}

const timeOfDay = integer => {
  let totalMinutes = convertIntegerToMinutes(integer);
  let hours = String(Math.floor(totalMinutes / 60));
  let minutes = String(totalMinutes % 60);
  hours = convertToTwoDigits(hours);
  minutes = convertToTwoDigits(minutes);
  return `${hours}:${minutes}`;
}

// After Midnight (Part 2)
const afterMidnight = string => {
  let index = string.indexOf(":");
  let hours = Number(string.slice(0, index));
  let minutes = Number(string.slice(index + 1));
  return (hours * 60 + minutes) % 1440;
}

const beforeMidnight = string => {
  let totalMinutes = afterMidnight(string);
  return (totalMinutes === 0) ? 0 : 1440 - totalMinutes;
}