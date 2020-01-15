#1
array1 => 4
array2 => 5
array3 => 0
array4 => 3
array5 => 101

#2
let myArray = [1, 3, 6, 11, 4, 2, 4, 9, 17, 16, 0];

myArray.forEach(function (n) {
  if (n % 2 === 0) {
    console.log(n)
  }
})

#3
let myArray = [
  [1, 3, 6, 11],
  [4, 2, 4],
  [9, 17, 16, 0],
];

for(let i = 0; i < myArray.length; i++) {
  myArray[i].forEach(function (n) {
    if (n % 2 === 0) {
      console.log(n);
    }
  })
}

#4
myArray.map(n => n % 2 === 0 ? 'even' : 'odd')

#5
function removeNonInteger(arr) {
  return arr.filter(el => Number.isInteger(el))
}

#6
let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];
function oddLengths(arr) {
  let filteredArray = arr.map(el => el.length).filter(num => num % 2 === 1);
  return filteredArray;
}

#7
numbers1.includes?(3);
numbers2.includes?(3);
numbers3.includes?(3);

#8
arr[1][2]