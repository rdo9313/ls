#1
false || (true && false); //false
true || (1 + 2);          //true
(1 + 2) || true;          //3
true && (1 + 2);          //3
false && (1 + 2);         //false
(1 + 2) && true;          //true
(32 * 4) >= 129;          //false
false !== !true;          //false
true === 4;               //false
false === (847 === '847'); //true
false === (847 == '847');  //false
(!true || (!(100 / 5) === 20) || ((328 / 4) === 82)) || false;  //true  

#2
function evenOrOdd(num) {
  if (num % 2 === 0) {
    console.log("even");
  } else {
    console.log("odd");
  }
}

#3
function evenOrOdd(num) {
  if (!Number.isInteger(num)) {
    console.log("Not an integer.");
    return;
  }

  if (num % 2 === 0) {
    console.log("even");
  } else {
    console.log("odd");
  }
}

#4
Logs "Product2 Product3 Product not found!" since there is no break in between case statements.

#5
if foo() {
  return "bar";
} else {
  return qux();
}

#6
"Not Empty"

#7
function longCapped(str) {
  return str.length > 10 ? str.toUpperCase() : str
}

#8
function numberRange(number) {
  if (number < 0) {
    console.log(`${number} is less than 0`);
  } else if (number <= 50) {
    console.log(`${number} is between 0 and 50`);
  } else if (number <= 100) {
    console.log(`${number} is between 50 and 100`);
  } else {
    console.log(`${number} is greater than 100`);
  }
}