// What is This?
NaN

// The Franchise
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

// The Franchise - Solution 2
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

// myFilter()
function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function(value) {
    if (func.call(thisArg,value)) {
      result.push(value);
    }
  });

  return result;
}