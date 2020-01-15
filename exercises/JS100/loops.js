//Loop and Log
let i;

for (i = 0; i <= 10; i += 2) {
  console.log(i);
}
//0,2,4,6,8,10

//Countdown
let i;

for (i = 10; i >= 1; i -= 1) {
  console.log(i);
  if (i === 1) {
    console.log("Launch!")
  }
}

//Triple Greeting
let greeting = 'Aloha!';

for(let i = 0; i < 3; i += 1) {
  console.log(greeting);
}

//Take Two
for(let i = 1; i <= 100; i += 1) {
  console.log(i * 2);
}

//Looping Over Array Elements
let array = [1, 2, 3, 4];
let index = 0;

while (index < array.length) {
  console.log(array[index]);
  index += 1;
}

//Continue
let cities = ['Istanbul', 'Los Angeles', 'Tokyo', null, 'Vienna', null, 'London', 'Beijing', null];

for(let i = 0; i < cities.length; i += 1) {
  if (cities[i] === null) {
    continue
  } else {
    console.log(cities[i].length);
  }
}

//And on and on and on
This code loops forever because there is no conditional for when the loop should stop iterating.
let i;

for (i = 0; i < 1; i += 1) {
  console.log("and on");
}

//That's Odd
let num = 1;

while(num < 40) {
  console.log(num);
  num += 2;
}

//Finding Nemo
let fish = ['Dory', 'Marlin', 'Gill', 'Nemo', 'Bruce'];

for(let i = 0; i < fish.length; i += 1) {
  if (fish[i] === "Nemo") {
    break;
  }
  console.log(fish[i]);
}

//Do...While
The first code snippet will never run the while loop since counter variable's value is not greater than 0 and does not
meet the conditional, while the second snippet will run the block first before terminating the loop once the conditional
at the end of the block is not met. The first snippet will not output anything while the second snippet will output
"Wooot!" once.
