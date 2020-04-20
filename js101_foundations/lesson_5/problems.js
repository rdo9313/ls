/* eslint-disable */
// 1
arr.sort((a,b) => Number(b) - Number(a));

// 2
books.sort((a,b) => Number(a.published) - Number(b.published));

// 3
arr1[2][1][3];
arr2[1]["third"][0];
arr3[2]["third"][0][0];
obj1.b[1];
Object.keys(obj2.third)[0];

// 4
arr1[1][1] = 4;
arr2[2] = 4;
obj1.first[2][0] = 4;
obj2.a.a[2] = 4;

// 5
let memberInfo = Object.values(munsters);
let totalMaleAge = 0;

memberInfo.forEach(obj => {
  if (obj["gender"] === "male") {
    totalMaleAge += obj["age"];
  }
})

console.log(totalMaleAge);

// 6
Object.entries(munsters).forEach(person => {
  let name = person[0][0].toUpperCase() + person[0].slice(1).toLowerCase();
  let age = person[1]["age"];
  let gender = person[1]["gender"];

  console.log(`${name} is a ${age}-year-old ${gender}.`);
})

// 7
a = 2
b = [3,8]

// 8
let vowels = 'aeiou';

Object.values(obj).forEach(arr => {
  arr.forEach(word => {
    word.split('').forEach(char => {
      if (vowels.includes(char)) {
        console.log(char);
      }
    })
  })
})

// 9
arr.map(subarr => {
  if (typeof subarr[0] === 'number') {
    return subarr.slice().sort((a, b) => a - b);
  } else {
    return subarr.slice().sort();
  }
})

// 10
arr.map(subarr => {
  if (typeof subarr[0] === 'number') {
    return subarr.slice().sort((a, b) => b - a);
  } else {
    return subarr.slice().sort().reverse();
  }
})

// 11
arr.map(obj => {
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  let object = {};

  for (let i = 0; i < keys.length; i++) {
    object[keys[i]] = values[i] + 1;
  }

  return object;
})

// 12
arr.map(subarr => {
  return subarr.filter(el => el % 3 === 0);
})

// 13
const sum = arr => {
  let total = 0;

  arr.forEach(el => {
    if (el % 2 === 1) {
      total += el;
    }
  })

  return total;
}

arr.slice().sort((a, b) => sum(a) - sum(b));

// 14
Object.values(obj).map(food => {
  if (food["type"] === "fruit") {
    return food["colors"].map(color => {
      return color[0].toUpperCase() + color.slice(1);
    })
  } else {
    return food["size"].toUpperCase();
  }
})

// 15
arr.filter(subarr => {
  return Object.values(subarr).every(array => {
    return array.every(el => el % 2 === 0)
  })
})

// 16
arr.forEach(subarr => {
  obj[subarr[0]] = subarr[1];
})

// 17
const generateUUID = () => {
  let characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let sections = [8, 4, 4, 4, 12];

  let uuid = '';
  sections.forEach((section, sectionIndex) => {
    for (let index = 1; index <= section; index++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters[randomIndex];
    }

    if (sectionIndex < sections.length - 1) {
      uuid += '-';
    }
  });

  return uuid;
}