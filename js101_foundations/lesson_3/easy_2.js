// 1
advice.replace('important', 'urgent');

// 2
//reverse
numbers.slice().reverse();

//sort
[...numbers].sort((num1, num2) => num2 - num1);

//forEach
const copy = [];
numbers.forEach(num => copy.unshift(num));
return copy;

//reduce
numbers.reduce((acc,cur) => [cur].concat(acc));

// 3
numbers.includes(number1);
numbers.includes(number2);

// 4
"Four score and " + famousWords
"Four score and ".concat(famousWords);

// 5
arr = [1, 2, 3, 4, 5];
arr.splice(2,1);
return arr;

// 6
flintstones = [].concat(...flintstones);

// 7
Object.entries(flintstones).filter(sub => sub[0] === "Barney")[0]

// 8
Array.isArray(numbers);
Array.isArray(table);

// 9
(statement1.match(/t/g) || []).length;
(statement2.match(/t/g) || []).length;

// 10
let padding = Math.floor((40 - title.length) / 2);

title.padStart(padding + title.length);