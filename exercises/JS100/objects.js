//Retrieve a Value (Part 1)
student.courses;

//Retrieve a Value (Part 2)
jane.location.country;

//Add a Property
fido.age = 23;
fido.favoriteFood = 'pizza';

//Greetings From Jane
let jane = {
  firstName: 'Jane',
  lastName: 'Harrelson',
  age: 32,
  location: {
    country: 'Denmark',
    city: 'Aarhus'
  },
  occupation: 'engineer',
  greet: function (name) {
    return `Hej, ${name}!`;
  }
};

//Dot Notation vs Bracket Notation
Snippet 1 will assign the value "Pacific" to 'prefix' property,
while Snippet 2 will assign the value 'Pacfiic' to 'Indian' property.

//Is it true?
"It's true!" is never output because object properties are implicitly converted to strings,
and strings are not === to the boolean value true.

//Car Keys
let keys = []

for (key in vehicle) {
  keys.push(key);
}

//Convert an object to a nested array
let keys = Object.keys(person);
let nestedPerson = []
keys.forEach(key => nestedPerson.push([key, person[key]]));
console.log(nestedPerson);

//...and vice versa
let person = {};
nestedArray.forEach(el => {
  person[el[0]] = el[1];
})
console.log(person);

//Cloning a Person
function clone(obj) {
  return Object.assign({}, obj);
}