// 1
let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',

  getDescription() {
    `${this.title} was written by ${this.author}.`;
  }
}

let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    `${this.title} was written by ${this.author}.`;
  }
}

let book3 = {
  title: "Aunts aren't Gentlemen",
  author: 'PG Wodehouse',

  getDescription() {
    `${this.title} was written by ${this.author}.`;
  }
}

// 2
The method getDescription is duplicated for all three objects.

// 3
function createBook(title, author) {
  return {
    title: title,
    author: author,

    getDescription() {
      `${this.title} was written by ${this.author}.`;
    }
  }
}

// 4
function createBook(title, author) {
  return {
    title: title,
    author: author,
    read: false,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    }
  }
}

// 5
function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read: false,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    }
  }
}

// 6
readBook() {
  this.read = true;
}

// 7
getDescription() {
  return `${this.title} was written by ${this.author}. I ${this.read ? 'have' : "haven't"} read it`;
}

