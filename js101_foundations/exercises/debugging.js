// Word Ladder
Missing semicolon in line 1.

// Reserved Keywords
forEach always returns undefined.

const isReversed = name => {
  return RESERVED_KEYWORDS.some(reserved => name === reserved);
}

// Random Recipe Generator
Lines 41 and 42 concatenate strings with '+' opeator. JS will convert the arrays into strings
and concatenate the strings. The 'join' method can not be invoked on a string.

// Task List
todos.shift()
delete method removes property from object and leaves empty slot at index 0, resulting in undefined.

// Range
second function overrides first function and ends up with range(0, 5).

// Member Directory
return (/^[a-z]+ [a-z]+$/i).test(name);

// Glory
must put breaks after each case statement in the switch loop.

// Grade Analysis
line 8 nums.sort((a,b) => a - b);
sort method defaults to converting numbers to strings and comparing by Unicode values.

// Weekday Classes
function toString(date) {
  let pad = (string, n) => {
    while (string.length < n) {
      string = "0" + string;
    }
    return string;
  };

  let year = String(date.getFullYear());
  let month = pad(String(date.getMonth() + 1), 2);
  let day = pad(String(date.getDate()), 2);

  return `${year}-${month}-${day}`;
};

// Neutralizer
the string "dull" at index 1 is removed from the array and the new string at index 1 is "boring".
The forEach method moves onto the word at index 2, which is "cards" and skips "boring".