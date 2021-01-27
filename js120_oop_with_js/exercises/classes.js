// Name the Constructor
console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

// Create the Class
class Cat {

}

// Create an Instance
let kitty = new Cat();

// What are you?
class Cat {
  constructor() {
    console.log("I'm a cat!");
  }
}

let kitty = new Cat();

// Hello, Sophie! (part 1)
class Cat {
  constructor(name) {
    this.name = name;
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');

// Hello, Sophie (part 2)
class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');

// Default Person
class Person {
  constructor(name = "John Doe") {
    this.name = name;
  }
}

// Hello, Chloe!
class Cat {
  constructor(name) {
    this.name = name;
  }

  rename(name) {
    this.name = name;
  }
}

// Generic Greeting (part 1)
class Cat {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

// Generic Greeting (part 2)
class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }

  personalGreeting() {
    console.log("Hello! My name is Sophie!");
  }
}