// Buggy Code 1
the this keyword must be prepended to morning variable

// Buggy Code 2
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,

  discount: function(item, percent) {
    let discount = item.price * percent / 100;
    return item.price - discount;
  },
};

// Testing Object Equality
function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }
  
  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  return aKeys.every(key => a[key] === b[key]);
}

// Student
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      return `${this.name} is a ${this.year} year student.`;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      let course = this.courses.filter(course => {
        return course.code === courseCode;
      })[0];

      if (course) {
        course.note = note;
      }
    }
  }
}

// School
let foo = 
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

let bar =
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

let qux = 
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
  ],
}

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      return `${this.name} is a ${this.year} year student.`;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      let course = this.courses.filter(course => {
        return course.code === courseCode;
      })[0];

      if (course) {
        course.note = note;
      }
    }
  }
}

let school = {
  students: [foo, bar, qux],
  addStudent: function(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log("Invalid Year");
    } else {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    }
  },

  enrollStudent: function(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade: function(student, courseName, grade) {
    let course = student.courses.filter(course => {
      return course.name === courseName;
    })[0];

    if (course) {
      course.grade = grade;
    }
  },

  getReportCard: function(student) {
    student.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    })
  },

  courseReport: function(subject) {
    let grades = [];

    console.log(`=${subject} Grades=`);
    this.students.forEach(student => {
      let course = student.courses.filter(course => {
        return course.name === subject;
      })[0];

      if (course && course.grade) {
        console.log(`${student.name}: ${course.grade}`);
        grades.push(course.grade);
      } else {
        console.log("---");
      }
    })
    let average = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
    console.log(`Course Average: ${average}`);
  }
}