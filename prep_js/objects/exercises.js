#1
person.name or person["name"]

#2
all are valid keys

#3
let myArray = { 0: 'a', 1: 'b', 2: 'c'}

#4
let arr = Object.keys(obj).map(el => el.toUpperCase());
console.log(arr);

#5
let myObj = Object.create(myProtoObj);

#6
Snippet 1 only runs its own property "qux" and not its prototype's
while Snippet 2 runs all keys in the object including the prototype's.

#7
function copyObj(obj, keys) {
  let obj2 = {};

  if (keys) {
    keys.forEach(key => {
      obj2[key] = obj[key];
    })
    return obj2;
  } else {
    return Object.assign(obj2, obj);
  }
}

#8
"hi" and "hello"
