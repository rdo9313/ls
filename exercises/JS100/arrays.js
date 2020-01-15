//First Element
function first(arr) {
  return arr[0];
}
If input array was empty, function would return undefined.

//Last Element
function last(arr) {
  return arr[arr.length-1];
}

//Add + Delete
let energy = ['fossil', 'solar', 'wind', 'tidal', 'fusion'];
energy.shift();
energy.push('geothermal');

//Alphabet
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
alphabet.split('');

//Filter
let scores = [96, 47, 113, 89, 100, 102];
scores.filter(score => score > 100).length;

//Vocabulary
let vocabulary = [
  ['happy', 'cheerful', 'merry', 'glad'],
  ['tired', 'sleepy', 'fatigued', 'drained'],
  ['excited', 'eager', 'enthused', 'animated']
];

for(let i = 0; i < vocabulary.length; i += 1) {
  for(let j = 0; j < vocabulary[i].length; j += 1) {
    console.log(vocabulary[i][j]);
  }
}

//Equality
The code logs false since two different variables are assigned the same array value in different parts of memory.

//Type
Array.isarray()

//Travel
let destinations = ['Prague', 'London', 'Sydney', 'Belfast', 'Rome',
  'Aruba', 'Paris', 'Bora Bora', 'Barcelona', 'Rio de Janeiro',
  'Marrakesh', 'New York City'];

function contains(str, arr) {
  for(let i = 0; i < arr.length; i += 1) {
    if (arr[i] === str) {
      return true;
    }
  }
  return false;
}

//Passcode
let passcode = ['11', 'jZ5', 'hQ3f*', '8!7g3', 'p3Fs'];
passcode.join("-");

//Checking items off the grocery list
let groceryList = ['paprika', 'tofu', 'garlic', 'quinoa', 'carrots', 'broccoli', 'hummus'];

while (groceryList.length > 0) {
  console.log(groceryList.shift());
}
