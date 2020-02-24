// 1
the first console.log will return the object while the second will return undefined.

// 2
{ first: [1,2] }

// 3
A) one is: one
two is: two
three is: three

B) one is: one
two is :two
three is: three

C) one is: two
two is: three
three is: one

// 4
function isAnIpNumber(str) {
  if (!/^\d+$/.test(str)) return false;

  let number = Number(str);
  return number >= 0 && number <= 255;
}

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");

  if (!(dotSeparatedWords.length === 4)) {
    return false;
  }

  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      return false;
    }
  }

  return true;
}