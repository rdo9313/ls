// Inherited Year
class Truck extends Vehicle {
}

class Car extends Vehicle { 
}

// Start the Engine (part 1)
class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year);
    this.startEngine();
  }

  startEngine() {
    console.log('Ready to go!')
  }
}

// Only Pass the Year
class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, type) {
    super(year);
    this.bedType = type;
  }
}

class Car extends Vehicle {}

// Star the Engine (part 2)
class Vehicle {
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  startEngine(speed) {
    if (speed === "fast") {
      return super.startEngine() + " Drive fast, please!";
    } else if (speed === "slow") {
      return super.startEngine() + " Drive slow, please!";
    }
  }
}

// Walk the Cat
class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

const walkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
}

Object.assign(Cat.prototype, walkMixin);

// Swimming
const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
}

class Fish {
  constructor(name) {
    this.name = name;
    Object.assign(this, swimMixin);
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {
  constructor(name) {
    super(name);
    Object.assign(this, swimMixin);
  }
}

// Towable (part 1)
const towMixin = {
  tow() {
    return "I can tow a trailer!";
  }
}

class Truck {}
class Car {}

Object.assign(Truck.prototype, towMixin);

let truck = new Truck();
truck.tow();

// Towable (part 2)
const towMixin = {
  tow() {
    return "'I can tow a trailer!'";
  }
}

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year);
    Object.assign(this, towMixin);
  }
}

class Car extends Vehicle {}