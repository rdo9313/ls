/* eslint-disable */
// Uppercase Check
const isUppercase = str => {
  return !str.match(/[a-z]/);
}

// Delete Vowels
const removeVowels = array => {
  return array.map(el => el.replace(/[aeiou]/gi, ""));
}

// Lettercase Counter
const letterCaseCount = str => {
  let lowercaseCount = str.match(/[a-z]/g) || [];
  let uppercaseCount = str.match(/[A-Z]/g) || [];
  let neither = str.match(/[^A-Za-z]/g) || [];

  return { lowercase: lowercaseCount.length, uppercase: uppercaseCount.length, neither: neither.length};
}

// Capitalize Words
const wordCap = str => {
  return str.split(" ").map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
}

// Swap Case
const swapCase = str => {
  return str.split('').map(char => {
    return char.toUpperCase() === char ? char.toLowerCase() : char.toUpperCase();
  }).join('');
}

// Staggered Caps (Part 1)
const staggeredCase = str => {
  return str.split('').map((char, idx) => {
    return idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}

// Staggered Caps (Part 2)
const staggeredCase = str => {
  let upper = true;
  let result = [];

  str.split('').forEach(char => {
    if (char.match(/[a-zA-Z]/)) {
      upper = !upper;
    }

    return upper ? result.push(char.toLowerCase()) : result.push(char.toUpperCase());
  })
  return result.join('');
}

// How long are you?
const wordLengths = str => {
  if (str) {
    return str.split(" ").map(word => {
      return `${word} ${String(word.length)}`;
    })
  } else {
    return [];
  }
}

// Search Word (Part 1)
const searchWord = (str, text) => {
  let count = 0;
  text.split(" ").forEach(word => {
    if (word.toLowerCase().match(str.toLowerCase())) {
      count += 1;
    }
  })
  return count;
}

// Search Word (Part 2)
const searchWord = (str, text) => {
  return text.split(" ").map(word => {
    if (word.toLowerCase().match(str.toLowerCase())) {
      return `**${word.toUpperCase()}**`;
    } else {
      return word;
    }
  }).join(" ");
}