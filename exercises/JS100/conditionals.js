//Truthy vs Falsy
0, null, undefined, false, '', NaN

//Yes? No? Part 1
let randomNumber = Math.round(Math.random());

if (randomNumber) {
  console.log('Yes!');
} else {
  console.log('No.');
}

//Yes? No? Part 2
let randomNumber = Math.round(Math.random());

randomNumber ? console.log('Yes!') : console.log('No.');

//Check the Weather, Part 1
let weather = 'sunny';

if (weather === 'sunny') {
  console.log("It's a beautiful day!");
} else if (weather === 'rainy') {
  console.log("Grab your umbrella.");
} else {
  console.log("Let's stay inside.");
}

//Switch
It will log 'neigh','tweet tweet', '*cricket*' as there is no break statement.

//Check the Weather, Part 2
let weather = 'sun';

switch (weather) {
  case 'sunny':
    console.log("It is sunny!");
    break;
  case 'rainy':
    console.log("It is rainy!");
    break;
  case 'windy':
    console.log("It is windy!");
    break;
  case 'cloudy':
    console.log("It is cloudy");
    break;
  default:
    console.log("What is the weather like?");
}

//Logical Conditions 1
The code will output "Yes!" since the or conditional results to true.

//Logical Conditions 2
The code will output "No..." since the and conditional results to false.

//Logical Conditions 3
The code will output $3.99 since !sale results to false.

//Are we moving?
The code outputs true. The parenthesis is needed to compare the correct expressions.