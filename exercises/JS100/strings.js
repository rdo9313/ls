//Length
"These aren't the droids you're looking for.".length

//ALL CAPS
let string = 'confetti floating everywhere';
string.toUpperCase();

//Repeat
function repeat(num, str) {
  let output = '';
  for(let i = 0; i < num; i += 1) {
    output += str;
  }
  console.log(output);
}

//Multiline String
let string = "A pirate I was meant to be!\nTrim the sails and roam the sea!"

//Case-insensitive Equality
string1.toLowerCase() === string2.toLowerCase(); 
string1.toLowerCase() === string3.toLowerCase(); 

//Contains Character
byteSequence.includes('x');

//Blank? Version 1
function isBlank(str) {
  return str.length === 0;
}

//Blank? Version 2
function isBlank(str) {
  return str.trim().length === 0;
}

//Capitalize Words
let string = 'launch school tech & talk'

function capitalize(str) {
  let newArray = [];
  str.split(" ").forEach(word => newArray.push(word[0].toUpperCase() + word.slice(1)));
  return newArray.join(" ");
}

