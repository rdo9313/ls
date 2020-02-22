// 1
No error. numbers[4] will output undefined.

// 2
str1.endsWith("!"); //true
str2.endsWith("!"); //false

// 3
ages.hasOwnProperty("Spot");

// 4
let munstersDescription = "the Munsters are CREEPY and Spooky.";
munstersDescription[0].toUpperCase() + munstersDescription.slice(1).toLowerCase();

// 5
console.log(false == '0');    // true
console.log(false === '0');   // false

// 6
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };
Object.assign(ages, additionalAges);

// 7
str1.includes('Dino');   // false
str2.includes('Dino');   // true

// 8
flintstones.push("Dino");

// 9
fintstones.push("Dino", "Hoppy");

// 10
index = advice.indexOf("house");
advice.slice(0,index);