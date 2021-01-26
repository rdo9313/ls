// Rectangles
class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

// Rectangles and Squares
class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

// Fake Cat
let fakeCat = Object.create(Cat.prototype)

// Complete the Program - Cats!
class Cat extends Pet {
  constructor(name, age, description) {
    super(name, age);
    this.description = description;
  }

  info() {
    console.log(`My cat ${this.name} is ${this.age} years old and has ${this.description} fur.`);
  }
}

// Animals
class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, "cat", status);
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}. Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

// Refactoring Vehicles
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle{
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}

// What Will This Do?
"ByeBye"
"HelloHello"

// Shouter
class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting((text.toUpperCase()));
  }
}

// Moving
const Walkable = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
}

// Pet Shelter
class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.owners = [];
  }

  adopt(owner, pet) {
    if (!this.owners.includes(owner)) {
      this.owners.push(owner);
    }
    owner.pets.push(pet);
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.pets.forEach(pet => {
        console.log(`a ${pet.animal} named ${pet.name}`);
      })
    })
  }
}

// Banner Class
class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(),
    this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return "+--------------------------------------------+";
  }
  emptyLine() {
    return "| |";
  }
  messageLine() {
    return `| ${this.message} |`;
  }
}