// Ancestors
Object.prototype.ancestors = function ancestors() {
  let ancestor = Object.getPrototypeOf(this);
  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }
  return ['Object.prototype'];
};

// Classical Object Creation
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

Person.prototype.communicate = function() {
  console.log("Communicating");
}

Person.prototype.eat = function() {
  console.log("Eating");
}

Person.prototype.sleep = function() {
  console.log("Sleeping");
}

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = function() {
  console.log("Diagnosing");
}

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function() {
  console.log("Studying");
}

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function() {
  console.log("Researching");
}

// Circular Queue
class CircularQueue {
  constructor(size) {
    this.queue = [];
    this.size = size;
  }

  enqueue(obj) {
    if (this.queue.length === this.size) {
      this.queue.shift();
    }
    this.queue.push(obj);
  }

  dequeue() {
    if (this.queue.length === 0) {
      return null;
    } else {
      return this.queue.shift();
    }
  }
}