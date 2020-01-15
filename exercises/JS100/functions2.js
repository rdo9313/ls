//Greet 1
function greet(greeting = "Hello") {
  console.log(greeting + ', world!');
}

//Greet 2
function greet(greeting = "Hello", recipient = "world") {
  console.log(greeting + ', ' + recipient + '!');
}

//Greet 3
function greet() {
  return greeting() + ', ' + recipient() + '!';
}

//Rest Parameters
function sum(...values) {
  return values.reduce(function(a, b) {
    return a + b;
  });
}

//Spread Operator
function formatName(firstName, middleName, lastName) {
  return `${lastName}, ${firstName} ${middleName[0]}.`;
}

fullName = ['James', 'Tiberius', 'Kirk'];

console.log(formatName(...fullName));

//Calculate BMI
function calculateBMI(height, weight) {
  bmi = weight / (height / 100)**2;
  return bmi.toFixed(2);
}

//Calculate Cat Age
function catAge(age) {
  switch (age) {
    case 1:
      return 15;
    case 2:
      return 24;
    default:
      return 24 + 4 * (age - 2);
  }
}

//Remove Last Char
function removeLastChar(str) {
  return str.slice(0,str.length-1);
}

//Arrow Functions (Part 1)
let sentence = (verb, noun) => {
  return template
    .replace('VERB', verb)
    .replace('NOUN', noun);
}

//Arrow Functions (Part 2)
let initGame = () => ({
  level: 1,
  score: 0
});